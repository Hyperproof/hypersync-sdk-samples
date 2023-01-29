import { CustomAuthCredentials, HypersyncApp, IDataSource, IValidatedUser } from '@hyperproof/hypersync-sdk';
interface IServiceUser {
    username: string;
    firstName: string;
    lastName: string;
}
export declare class CustomApp extends HypersyncApp {
    constructor();
    /**
     * Validates the credentials provided by the user.
     *
     * @param credentials Login credentials provided by the user.
     */
    validateCredentials(credentials: CustomAuthCredentials): Promise<IValidatedUser>;
    /**
     * Returns a human readable string which uniquely identifies the user's account
     * in the external system or service.
     *
     * This string is displayed in Hypersync's Connected Accounts page to help the
     * user distinguish between multiple connections that use different accounts.
     *
     * @param userProfile The profile returned by validateCredentials.
     */
    getUserAccountName(userProfile: IServiceUser): string;
    /**
     * Creates a data source that uses custom authentication.
     *
     * @param credentials The set of credentials associated with the connection.
     */
    createDataSource(credentials: CustomAuthCredentials): Promise<IDataSource>;
}
export {};
//# sourceMappingURL=CustomApp.d.ts.map