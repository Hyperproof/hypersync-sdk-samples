import { DataObject, DataValueMap } from '@hyperproof/hypersync-models';
import {
  CustomAuthCredentials,
  DataSetResult,
  DataSourceBase
} from '@hyperproof/hypersync-sdk';

/**
 * Custom data source for the THE_SERVICE Hypersync app.
 */
export class DataSource extends DataSourceBase {
  private credentials: CustomAuthCredentials;
  constructor(credentials: CustomAuthCredentials) {
    super();
    this.credentials = credentials;
  }

  // TODO: Update the `getData` call below to retrieve data from your service.
  async getData<TData = DataObject>(
    dataSetName: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params?: DataValueMap
  ): Promise<DataSetResult<TData | TData[]>> {
    switch (dataSetName) {
      case 'currentUser':
        throw new Error('TODO: Return information for the current user.');

      case 'groups':
        throw new Error('TODO: Return a list of groups.');

      case 'users':
        throw new Error('TODO: Return a list of users');

      default:
        throw new Error(`Unrecognized dataset: ${dataSetName}`);
    }
  }
}
