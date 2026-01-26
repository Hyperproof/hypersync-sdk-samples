import { IRestDataSourceConfig } from '@hyperproof/hypersync-models';
import { RestDataSourceBase } from '@hyperproof/hypersync-sdk';
import { CustomAuthCredentials } from '@hyperproof/integration-sdk';
import Messages from './json/messages.json';
import config from './json/dataSource.json';

/**
 * Custom data source for the Open Library Hypersync app.
 */
export class DataSource extends RestDataSourceBase {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(credentials: CustomAuthCredentials) {
    super(config as IRestDataSourceConfig, Messages, {
      'Content-Type': 'application/json'
    });
  }
}
