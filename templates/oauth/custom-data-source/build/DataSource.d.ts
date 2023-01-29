import { CustomAuthCredentials, DataSetResult, DataObject, IDataSource } from '@hyperproof/hypersync-sdk';
/**
 * Custom data source for the THE_SERVICE Hypersync app.
 */
export declare class DataSource implements IDataSource {
    private credentials;
    constructor(credentials: CustomAuthCredentials);
    getData(dataSetName: string): Promise<DataSetResult<DataObject | DataObject[]>>;
}
//# sourceMappingURL=DataSource.d.ts.map