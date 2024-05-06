import {
  CustomAuthCredentials,
  IRestDataSourceConfig,
  RestDataSourceBase
} from '@hyperproof/hypersync-sdk';
import Messages from './json/messages.json';
import config from './json/dataSource.json';

// TODO: Configure the data sets that your app needs by editing
// ./json/dataSource.json.  Data sets configured in that file will
// be automatically exposed by this custom RestDataSource class.

// If the REST service uses data paging, override the getDataFromUrl
// method on RestDataSource to properly handle that paging.

/**
 * Custom data source for the THE_SERVICE Hypersync app.
 */
export class DataSource extends RestDataSourceBase {
  constructor(credentials: CustomAuthCredentials) {
    const { username, password } = credentials;
    const buffer = Buffer.from(`${username}:${password}`);

    // TODO: Update the code below to send authorization
    // information as the service expects.
    super(config as IRestDataSourceConfig, Messages, {
      'Content-Type': 'application/json',
      Authorization: `Basic ${buffer.toString('base64')}`
    });
  }
}
