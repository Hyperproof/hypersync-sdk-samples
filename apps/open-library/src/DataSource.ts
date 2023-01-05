import {
  CustomAuthCredentials,
  IRestDataSourceConfig,
  RestDataSource
} from '@hyperproof/hypersync-sdk';
import Messages from './decl/messages.json';
import config from './decl/dataSource.json';

/**
 * Custom data source for the Open Library Hypersync app.
 */
export class DataSource extends RestDataSource {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(credentials: CustomAuthCredentials) {
    super(config as IRestDataSourceConfig, Messages, {
      'Content-Type': 'application/json'
    });
  }
}
