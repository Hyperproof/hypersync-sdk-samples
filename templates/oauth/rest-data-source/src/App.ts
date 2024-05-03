import { HypersyncApp, IDataSource, Logger } from '@hyperproof/hypersync-sdk';
import { OAuthTokenResponse } from '@hyperproof/integration-sdk';
import { DataSource } from './DataSource';
import Messages from './json/messages.json';

interface IServiceUser {
  userId: string;
  firstName: string;
  lastName: string;
}

export class App extends HypersyncApp {
  constructor() {
    super({
      appRootDir: __dirname,
      connectorName: Messages.CONNECTOR_NAME,
      messages: Messages
    });
  }

  /**
   * Obtains the user profile object after completion of the authorization flow.
   *
   * @param tokenContext An object representing the result of the getAccessToken call.
   */
  async getUserProfile(tokenContext: OAuthTokenResponse) {
    await Logger.debug('Getting user profile.');
    const dataSource = new DataSource(tokenContext.access_token);
    const userInfo = await dataSource.getDataObject<IServiceUser>(
      'currentUser'
    );
    return userInfo.data;
  }

  /**
   * Returns a string uniquely identifying the user in Zoho.
   *
   * @param userProfile The profile of the user returned by getUserProfile.
   */
  public async getUserId(userProfile: IServiceUser) {
    await Logger.debug('Getting user ID.');
    return userProfile.userId;
  }

  /**
   * Returns a human readable string which uniquely identifies the user's account
   * in the external system or service.
   *
   * This string is displayed in Hypersync's Connected Accounts page to help the
   * user distinguish between multiple connections that use different accounts.
   *
   * @param userProfile The profile returned by getUserProfile.
   */
  public getUserAccountName(userProfile: IServiceUser) {
    return `${userProfile.firstName} ${userProfile.lastName}`;
  }

  /**
   * Creates a data source that uses OAuth for authorization.
   *
   * @param accessToken The OAuth access token.
   */
  public async createDataSource(accessToken: string): Promise<IDataSource> {
    await Logger.debug('Creating data source.');
    return new DataSource(accessToken);
  }
}
