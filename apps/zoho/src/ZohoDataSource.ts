import {
  DataValueMap,
  IDataSet,
  IDataSourceConfig,
  IGetRestDataResult,
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
      'https://projectsapi.zoho.com',
      config as IDataSourceConfig,
      Messages,
      {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    );
  }

  protected async getDataFromUrl(
    dataSetName: string,
    dataSet: IDataSet,
    relativeUrl: string,
    params?: DataValueMap | undefined
  ): Promise<IGetRestDataResult<any>> {
    const  result = await super.getDataFromUrl(dataSetName, dataSet, relativeUrl, params);

    if (dataSetName === 'portals') {
      result.data = (result.data as any).portals;
    }

    if (dataSetName === 'projects') {
      result.data = (result.data as any).projects;
    }

    return result;
  }
}
