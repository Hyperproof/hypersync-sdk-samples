import {
  CustomAuthCredentials,
  DataSetResult,
  DataObject,
  IDataSource
} from '@hyperproof/hypersync-sdk';

/**
 * Custom data source for the THE_SERVICE Hypersync app.
 */
export class DataSource implements IDataSource {
  private credentials: CustomAuthCredentials;
  constructor(credentials: CustomAuthCredentials) {
    this.credentials = credentials;
  }

  // TODO: Update the `getData` call below to retrieve data from your service.
  async getData(
    dataSetName: string
  ): Promise<DataSetResult<DataObject | DataObject[]>> {
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
