import {
  IDataSourceConfig,
  RestDataSource
} from '@hyperproof/hypersync-sdk';
import Messages from './decl/messages.json';
import config from './decl/dataSource.json';

/**
 * Custom data source for the Zoho Hypersync app.
 */
export class ZohoDataSource extends RestDataSource {
  constructor(accessToken: string) {
    super(
      config as IDataSourceConfig,
      Messages,
      {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    );
  }
}
