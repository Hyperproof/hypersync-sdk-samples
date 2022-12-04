import {
  CustomAuthCredentials,
  IDataSourceConfig,
  RestDataSource
} from '@hyperproof/hypersync-sdk';
import Messages from './decl/messages.json';
import config from './decl/dataSource.json';

// TODO: Configure the data sets that your app needs by editing
// ./decl/dataSource.json.  Data sets configured in that file will
// be automatically exposed by this custom RestDataSource class.

// If the REST service uses data paging, override the getDataFromUrl
// method on RestDataSource to properly handle that paging.

/**
 * Custom data source for the Zoho Hypersync app.
 */
export class DataSource extends RestDataSource {
  constructor(credentials: CustomAuthCredentials) {
    const { username, password } = credentials;
    const buffer = Buffer.from(`${username}:${password}`);

    // TODO: Update the code below to send authorization
    // information as the service expects.
    super(config as IDataSourceConfig, Messages, {
      'Content-Type': 'application/json',
      Authorization: `Basic ${buffer.toString('base64')}`
    });
  }
}
