import {
  CustomAuthCredentials,
  DataObject,
  DataSetResult,
  DataSetResultStatus,
  IDataSource,
  Logger
} from '@hyperproof/hypersync-sdk';
import mysql from 'mysql';

/**
 * Custom ServiceClient for the MySQL Hypersync.
 */
export class MySQLDataSource implements IDataSource {
  private credentials: CustomAuthCredentials;
  constructor(credentials: CustomAuthCredentials) {
    Logger.debug(`Constructing MySQLDatasource`);
    this.credentials = credentials;
  }

  async getData<TData = DataObject>(
    dataSetName: string
  ): Promise<DataSetResult<TData>> {
    Logger.debug(`Getting data: ${dataSetName}`);

    const { host, username, password } = this.credentials as {
      [key: string]: string;
    };
    const connection = mysql.createConnection({
      host,
      user: username,
      password,
      database: 'mysql'
    });

    connection.connect();

    try {
      switch (dataSetName) {
        case 'hosts': {
          Logger.info('Retrieving list of hosts.');
          const data = await new Promise<DataObject[]>((resolve, reject) => {
            connection.query(
              'SELECT DISTINCT host FROM user',
              (error, results) => {
                if (error) {
                  reject(error);
                }
                Logger.info(JSON.stringify(results));
                resolve(results);
              }
            );
          });

          return {
            data: data as unknown as TData,
            apiUrl: '',
            status: DataSetResultStatus.Complete
          };
        }

        case 'users': {
          Logger.info('Retrieving list of users.');
          const data = await new Promise<TData[]>((resolve, reject) => {
            connection.query(
              'SELECT DISTINCT * FROM user',
              (error, results) => {
                if (error) {
                  reject(error);
                }
                Logger.info(JSON.stringify(results));
                resolve(results);
              }
            );
          });

          return {
            data: data as unknown as TData,
            apiUrl: '',
            status: DataSetResultStatus.Complete
          };
        }

        default:
          throw new Error(`Unrecognized data source: ${dataSetName}`);
      }
    } finally {
      connection.end();
    }
  }
}
