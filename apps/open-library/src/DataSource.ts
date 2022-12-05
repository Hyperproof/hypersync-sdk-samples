import {
  CustomAuthCredentials,
  IDataSourceConfig,
  RestDataSource
} from '@hyperproof/hypersync-sdk';
import Messages from './decl/messages.json';
import config from './decl/dataSource.json';

/**
 * Custom data source for the Open Library Hypersync app.
 */
export class DataSource extends RestDataSource {
  constructor(credentials: CustomAuthCredentials) {
    super(config as IDataSourceConfig, Messages, {
      'Content-Type': 'application/json'
    });
  }
}
