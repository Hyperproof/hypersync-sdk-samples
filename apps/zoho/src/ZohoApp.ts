import {
  HypersyncApp,
  IDataSource,
  Logger,
  OAuthTokenResponse
} from '@hyperproof/hypersync-sdk';
import Messages from './decl/messages.json';
import { ZohoDataSource } from './ZohoDataSource';

interface IZohoUserProfile {
  loginId: string;
}

export class ZohoApp extends HypersyncApp {
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
    await Logger.debug('Getting Zoho user profile.');
    const dataSource = new ZohoDataSource(tokenContext.access_token);
    const userInfo = await dataSource.getDataObject('currentUser');
    const userProfile: IZohoUserProfile = {
      loginId: userInfo.data.loginId as string
    };
    return userProfile;
  }

  /**
   * Returns a string uniquely identifying the user in Zoho.
   *
   * @param userProfile The profile of the user returned by getUserProfile.
   */
  public async getUserId(userProfile: IZohoUserProfile) {
    await Logger.debug('Getting Zoho user ID.');
    return userProfile.loginId;
  }

  /**
   * Returns a human readable string which identifies the user's Zoho account.
   * This string is displayed in Hyperproof's Connected Accounts page to help the
   * user distinguish between multiple connections that use different accounts.
   *
   * @param userProfile The profile of the user returned by getUserProfile.
   */
  public getUserAccountName(userProfile: IZohoUserProfile) {
    return Messages.USER_ACCOUNT_TEMPLATE.replace(
      '{{loginId}}',
      userProfile.loginId
    );
  }

  /**
   * Creates a data source that uses OAuth authorization.
   *
   * @param accessToken The OAuth access token for the service.
   */
  public async createDataSource(accessToken: string): Promise<IDataSource> {
    await Logger.debug('Creating data source.');
    return new ZohoDataSource(accessToken);
  }
}
