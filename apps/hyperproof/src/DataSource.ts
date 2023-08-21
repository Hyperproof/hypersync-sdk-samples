import {
  DataSetResultStatus,
  DataValueMap,
  IRestDataSourceConfig,
  RestDataSetResult,
  RestDataSourceBase,
  SyncMetadata
} from '@hyperproof/hypersync-sdk';
import Jwt from 'jsonwebtoken';
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
  private orgId: string;

  constructor(accessToken: string) {
    super(config as IRestDataSourceConfig, Messages, {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    });

    const payload = Jwt.decode(accessToken, {
      json: true
    });
    if (!payload?.aud) {
      throw new Error('Invalid Hyperproof access token.');
    }

    this.orgId = payload.aud as string;
  }

  public getOrgId() {
    return this.orgId;
  }

  /**
   * Retrieves data from the service.  IDataSource method.
   *
   * @param {string} dataSetName Name of the data set to retrieve.
   * @param {object} params Parameter values to be used when retrieving data. Optional.
   * @param {string} page The page value to continue fetching data from a previous sync. Optional.
   * @param {object} metadata Metadata from previous sync run if requeued. Optional.
   */
  public async getData<TData>(
    dataSetName: string,
    params?: DataValueMap,
    page?: string,
    metadata?: SyncMetadata
  ): Promise<RestDataSetResult<TData>> {
    const result = await super.getData<TData>(
      dataSetName,
      params,
      page,
      metadata
    );

    if (result.status === DataSetResultStatus.Complete) {
      result.context = {
        orgId: this.orgId
      };
    }

    return result;
  }
}
