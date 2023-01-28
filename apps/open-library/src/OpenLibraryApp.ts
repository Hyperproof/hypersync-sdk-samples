import {
  CustomAuthCredentials,
  HypersyncApp,
  IDataSource,
  IValidatedUser,
  Logger
} from '@hyperproof/hypersync-sdk';
import { DataSource } from './DataSource';
import Messages from './json/messages.json';

interface IServiceUser {
  username: string;
}

export class OpenLibraryApp extends HypersyncApp {
  constructor() {
    super({
      appRootDir: __dirname,
      connectorName: Messages.CONNECTOR_NAME,
      messages: Messages,
      credentialsMetadata: {
        instructionHeader: Messages.CREDENTIAL_INSTRUCTION_HEADER,
        instructionBody: Messages.CREDENTIAL_INSTRUCTION_BODY,
        fields: []
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    credentials: CustomAuthCredentials
  ): Promise<IValidatedUser<IServiceUser>> {
    await Logger.debug('Validating credentials.');
    // The Open Library API is public and does not require authentication.
    return {
      userId: 'anonymous_user',
      profile: {
        username: 'anonymous_user'
      }
    };
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getUserAccountName(userProfile: IServiceUser) {
    return `Anyonymous User`;
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
