import {
  CredentialFieldType,
  CustomAuthCredentials,
  DataObject,
  HypersyncApp,
  IDataSetResultComplete,
  IDataSource,
  IValidatedUser,
  Logger
} from '@hyperproof/hypersync-sdk';
import createHttpError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import { DataSource } from './DataSource';
import Messages from './decl/messages.json';

interface IServiceUser {
  username: string;
  firstName: string;
  lastName: string;
}

export class CustomApp extends HypersyncApp {
  constructor() {
    super({
      appRootDir: __dirname,
      connectorName: Messages.CONNECTOR_NAME,
      messages: Messages,
      credentialsMetadata: {
        instructionHeader: Messages.CREDENTIAL_INSTRUCTION_HEADER,
        fields: [
          {
            name: 'username',
            type: CredentialFieldType.TEXT,
            label: Messages.LABEL_USERNAME
          },
          {
            name: 'password',
            type: CredentialFieldType.PASSWORD,
            label: Messages.LABEL_PASSWORD
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
      const dataSource = new DataSource(credentials);
      // TODO: Clean this up when HYP-29105 is fixed.
      const getDataresult = await dataSource.getData('currentUser');
      const serviceUser = (getDataresult as IDataSetResultComplete<DataObject>)
        .data;
      return {
        userId: serviceUser.username as string,
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
    return `${userProfile.username} (${userProfile.firstName} ${userProfile.lastName})`;
  }

  /**
   * Creates a data source that uses custom authentication.
   *
   * @param credentials The set of credentials associated with the connection.
   */
  public async createDataSource(
    credentials: CustomAuthCredentials
  ): Promise<IDataSource> {
    await Logger.debug('Creating data source.');
    return new DataSource(credentials);
  }
}
