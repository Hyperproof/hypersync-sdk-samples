import {
  IRestDataSourceConfig,
  RestDataSourceBase
} from '@hyperproof/hypersync-sdk';
import Messages from './json/messages.json';
import config from './json/dataSource.json';

/**
 * Custom data source for the Zoho Hypersync app.
 */
export class ZohoDataSource extends RestDataSourceBase {
  constructor(accessToken: string) {
    super(config as IRestDataSourceConfig, Messages, {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    });
  }
}
