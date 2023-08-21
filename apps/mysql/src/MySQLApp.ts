import { CredentialFieldType } from '@hyperproof/hypersync-models';
import {
  CustomAuthCredentials,
  HypersyncApp,
  IDataSource,
  IValidatedUser,
  Logger
} from '@hyperproof/hypersync-sdk';
import createHttpError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import mysql from 'mysql';
import Messages from './json/messages.json';
import { MySQLDataSource } from './MySQLDataSource';

interface IMySQLUser {
  username: string;
  host: string;
}

export class MySQLApp extends HypersyncApp {
  constructor() {
    super({
      appRootDir: __dirname,
      connectorName: Messages.CONNECTOR_NAME,
      messages: Messages,
      credentialsMetadata: {
        instructionHeader: Messages.CREDENTIAL_INSTRUCTION_HEADER,
        fields: [
          {
            name: 'host',
            type: CredentialFieldType.Text,
            label: Messages.LABEL_HOST
          },
          {
            name: 'username',
            type: CredentialFieldType.Text,
            label: Messages.LABEL_USERNAME
          },
          {
            name: 'password',
            type: CredentialFieldType.Password,
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
   * @param credentials Login credentials provided by the user.
   */
  public async validateCredentials(
    credentials: CustomAuthCredentials
  ): Promise<IValidatedUser<IMySQLUser>> {
    await Logger.debug('Validating credentials.');
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

      await Logger.debug('MySQL connection successful!');
      return {
        userId: username as string,
        profile: {
          username,
          host
        }
      };
    } catch (err) {
      await Logger.debug('MySQL credentials validation failed.');
      await Logger.debug(err);
      throw createHttpError(
        StatusCodes.UNAUTHORIZED,
        Messages.ERROR_INVALID_CREDENTIALS
      );
    }
  }

  /**
   * Returns a human readable string which identifies the user's account.
   * This string is displayed in Hypersync's Connected Accounts page to help the
   * user distinguish between multiple connections that use different accounts.
   *
   * @param userProfile The profile returned by validateCredentials.
   */
  public getUserAccountName(userProfile: IMySQLUser) {
    return `${userProfile.host} ${userProfile.username}`;
  }

  /**
   * Creates a data source that uses MySQL credentials for authorization.
   *
   * @param credentials The set of credentials associated with the connection.
   */
  public async createDataSource(
    credentials: CustomAuthCredentials
  ): Promise<IDataSource> {
    await Logger.debug('Creating data source.');
    return new MySQLDataSource(credentials);
  }
}
