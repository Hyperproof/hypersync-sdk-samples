import {
  CredentialFieldType,
  CustomAuthCredentials,
  HypersyncApp,
  ICriteriaProvider,
  IHypersync,
  IHyperproofUser,
  IGetProofDataResponse,
  IProofFile,
  IValidatedUser,
  Logger,
  RestDataSourceBase
} from '@hyperproof/hypersync-sdk';
import createHttpError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import { DataSource } from './DataSource';
import Messages from './json/messages.json';
import fetch from 'node-fetch';

interface IServiceUser {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  state: string;
}

export class App extends HypersyncApp {
  constructor() {
    super({
      appRootDir: __dirname,
      connectorName: Messages.CONNECTOR_NAME,
      messages: Messages,
      credentialsMetadata: {
        instructionHeader: Messages.CREDENTIAL_INSTRUCTION_HEADER,
        fields: [
          {
            name: 'accountId',
            type: CredentialFieldType.TEXT,
            label: Messages.LABEL_ACCOUNT_ID
          },
          {
            name: 'iamId',
            type: CredentialFieldType.TEXT,
            label: Messages.LABEL_IAM_ID
          },
          {
            name: 'apiKey',
            type: CredentialFieldType.TEXT,
            label: Messages.LABEL_API_KEY
          }
        ]
      }
    });
  }

  /**
   * Validates the credentials provided by the user.
   *
   * @param credentials Login credentials provided by the user.
   */
  public async validateCredentials(
    credentials: CustomAuthCredentials
  ): Promise<IValidatedUser> {
    await Logger.debug('Validating credentials.');
    try {
      const dataSource = await this.createDataSource(credentials);
      const getDataresult = await dataSource.getDataObject<IServiceUser>(
        'currentUser'
      );
      const serviceUser = getDataresult.data;
      return {
        userId: credentials.iamId as string,
        profile: serviceUser
      };
    } catch (err) {
      await Logger.debug('Credential validation failed.');
      await Logger.debug(err);
      throw createHttpError(
        StatusCodes.UNAUTHORIZED,
        Messages.ERROR_INVALID_CREDENTIALS
      );
    }
  }

  /**
   * Returns a human readable string which uniquely identifies the user's account
   * in the external system or service.
   *
   * This string is displayed in Hypersync's Connected Accounts page to help the
   * user distinguish between multiple connections that use different accounts.
   *
   * @param userProfile The profile returned by validateCredentials.
   */
  public getUserAccountName(userProfile: IServiceUser) {
    return `${userProfile.firstName} ${userProfile.lastName}`;
  }

  /**
   * Creates a data source that uses custom authentication.
   *
   * @param credentials The set of credentials associated with the connection.
   */
  public async createDataSource(
    credentials: CustomAuthCredentials
  ): Promise<RestDataSourceBase> {
    await Logger.debug('Creating data source.');

    // Use credentials to get access token
    const body = {
      grant_type: 'urn:ibm:params:oauth:grant-type:apikey',
      apikey: credentials.apiKey as string
    };
    const response = await fetch('https://iam.cloud.ibm.com/identity/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      body: new URLSearchParams(body)
    });

    if (!response.ok) {
      const err = new Error('Failed to obtain access token.');
      await Logger.error(err.message);
      await Logger.error(response.status);
      throw err;
    }

    const tokens = await response.json();

    // Feed account info and access token to a new DataSource.
    return new DataSource(
      credentials.accountId as string,
      credentials.iamId as string,
      tokens.access_token
    );
  }

  public async getProofData(
    dataSource: DataSource,
    criteriaProvider: ICriteriaProvider,
    hypersync: IHypersync,
    hyperproofUser: IHyperproofUser,
    userProfile: IServiceUser,
    syncStartDate: string
  ) {
    const proof = await super.getProofData(
      dataSource,
      criteriaProvider,
      hypersync,
      hyperproofUser,
      userProfile,
      syncStartDate
    );

    const file = (
      Array.isArray(proof)
        ? (proof as IProofFile[])
        : (proof as IGetProofDataResponse).data
    )[0];

    // Add Account ID to the Resource Information section.
    file.contents.criteria.unshift({
      name: 'account',
      label: Messages.LABEL_ACCOUNT_ID,
      value: dataSource.accountId
    });

    return proof;
  }
}
