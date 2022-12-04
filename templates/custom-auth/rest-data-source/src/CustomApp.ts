import {
  AuthorizationType,
  CredentialFieldType,
  CustomAuthCredentials,
  HypersyncApp,
  IDataSource,
  IValidatedUser,
  Logger
} from '@hyperproof/hypersync-sdk';
import createHttpError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import path from 'path';
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
      appRootDir: path.resolve(__dirname, '../'),
      connectorName: Messages.CONNECTOR_NAME,
      messages: Messages,
      authorizationType: AuthorizationType.CUSTOM,
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
   * Returns a user profile object for the user in the external system.
   *
   * @param {CustomAuthCredentails} credentials Login credentials provided by the user.
   */
  public async validateCredentials(
    credentials: CustomAuthCredentials
  ): Promise<IValidatedUser> {
    try {
      const dataSource = new DataSource(credentials);
      const getDataresult = await dataSource.getDataObject<IServiceUser>(
        'currentUser'
      );
      const serviceUser = getDataresult.data;
      return {
        userId: serviceUser.username as string,
        profile: serviceUser
      };
    } catch (err) {
      Logger.debug('Credential validation failed.');
      Logger.debug(err);
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
   * @param {*} userProfile The profile returned by validateCredentials.
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
    return new DataSource(credentials);
  }
}
