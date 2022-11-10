import {
  AuthorizationType,
  CredentialFieldType,
  CustomAuthCredentials,
  HypersyncApp,
  Logger,
  IValidatedUser
} from '@hyperproof/hypersync-sdk';
import createHttpError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import mysql from 'mysql';
import path from 'path';
import Messages from './decl/messages.json';
import { MySQLDataSource } from './MySQLDataSource';

interface IMySQLUser {
  username: string;
  host: string;
}

export class MySQLApp extends HypersyncApp {
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
            name: 'host',
            type: CredentialFieldType.TEXT,
            label: Messages.LABEL_HOST
          },
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
   * Validates the Datadog credentials provided by the user.
   *
   * Returns a user profile object for the user in the external system.
   *
   * @param {CustomAuthCredentails} credentials Login credentials provided by the user.
   */
  public async validateCredentials(
    credentials: CustomAuthCredentials
  ): Promise<IValidatedUser> {
    try {
      // Connect to the server using the credentials.
      const { host, username, password } = credentials as {
        [key: string]: string;
      };

      const connection = mysql.createConnection({
        host,
        user: username,
        password,
        database: 'mysql'
      });

      connection.connect();
      connection.end();

      Logger.debug('MySQL connection successful!');
      return {
        userId: username as string,
        profile: {
          username,
          host
        }
      };
    } catch (err) {
      Logger.debug('MySQL credentials validation failed.');
      Logger.debug(err);
      throw createHttpError(
        StatusCodes.UNAUTHORIZED,
        Messages.ERROR_INVALID_CREDENTIALS
      );
    }
  }

  /**
   * Returns a human readable string which identifies the vendor user's account.
   * This string is displayed in Hypersync's Connected Accounts page to help the
   * user distinguish between multiple connections that use different accounts.
   *
   * @param {*} userProfile The profile returned by validateCredentials.
   */
  public getUserAccountName(userProfile: IMySQLUser) {
    return `${userProfile.host} ${userProfile.username}`;
  }

  /**
   * Creates a data source that uses Datadog service keys for authorization.
   *
   * @param credentials The set of credentials associated with the connection.
   */
  public async createDataSource(credentials: CustomAuthCredentials) {
    return new MySQLDataSource(credentials);
  }
}
