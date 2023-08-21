import {
  DataValueMap,
  IRestDataSourceConfig,
  RestDataSourceBase,
  RestDataSetResult,
  StringMap,
  SyncMetadata
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
  public accountId: string;
  private iamId: string;
  private accessToken: string;

  constructor(accountId: string, iamId: string, accessToken: string) {
    super(config as IRestDataSourceConfig, Messages, {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    });
    this.accountId = accountId;
    this.iamId = iamId;
    this.accessToken = accessToken;
  }

  public async getData<TData>(
    dataSetName: string,
    params?: DataValueMap,
    page?: string,
    metadata?: SyncMetadata
  ): Promise<RestDataSetResult<TData>> {
    params = params || {};
    params.accountId = this.accountId;
    params.iamId = this.iamId;

    if (dataSetName === 'buckets') {
      const headers = {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json'
      } as StringMap;
      headers['ibm-service-instance-id'] = params.serviceInstance as string;
      this.setHeaders(headers);
    }

    return super.getData<TData>(dataSetName, params, page, metadata);
  }
}
