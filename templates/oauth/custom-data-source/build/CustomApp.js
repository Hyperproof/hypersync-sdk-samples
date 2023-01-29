"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomApp = void 0;
const hypersync_sdk_1 = require("@hyperproof/hypersync-sdk");
const http_errors_1 = __importDefault(require("http-errors"));
const http_status_codes_1 = require("http-status-codes");
const DataSource_1 = require("./DataSource");
const messages_json_1 = __importDefault(require("./json/messages.json"));
class CustomApp extends hypersync_sdk_1.HypersyncApp {
    constructor() {
        super({
            appRootDir: __dirname,
            connectorName: messages_json_1.default.CONNECTOR_NAME,
            messages: messages_json_1.default,
            credentialsMetadata: {
                instructionHeader: messages_json_1.default.CREDENTIAL_INSTRUCTION_HEADER,
                fields: [
                    {
                        name: 'username',
                        type: hypersync_sdk_1.CredentialFieldType.TEXT,
                        label: messages_json_1.default.LABEL_USERNAME
                    },
                    {
                        name: 'password',
                        type: hypersync_sdk_1.CredentialFieldType.PASSWORD,
                        label: messages_json_1.default.LABEL_PASSWORD
                    }
                ]
            }
        });
    }
    /**
     * Validates the credentials provided by the user.
     *
     * @param credentials Login credentials provided by the user.
     */
    validateCredentials(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            yield hypersync_sdk_1.Logger.debug('Validating credentials.');
            try {
                const dataSource = new DataSource_1.DataSource(credentials);
                // TODO: Clean this up when HYP-29105 is fixed.
                const getDataresult = yield dataSource.getData('currentUser');
                const serviceUser = getDataresult
                    .data;
                return {
                    userId: serviceUser.username,
                    profile: serviceUser
                };
            }
            catch (err) {
                yield hypersync_sdk_1.Logger.debug('Credential validation failed.');
                yield hypersync_sdk_1.Logger.debug(err);
                throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.UNAUTHORIZED, messages_json_1.default.ERROR_INVALID_CREDENTIALS);
            }
        });
    }
    /**
     * Returns a human readable string which uniquely identifies the user's account
     * in the external system or service.
     *
     * This string is displayed in Hypersync's Connected Accounts page to help the
     * user distinguish between multiple connections that use different accounts.
     *
     * @param userProfile The profile returned by validateCredentials.
     */
    getUserAccountName(userProfile) {
        return `${userProfile.username} (${userProfile.firstName} ${userProfile.lastName})`;
    }
    /**
     * Creates a data source that uses custom authentication.
     *
     * @param credentials The set of credentials associated with the connection.
     */
    createDataSource(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            yield hypersync_sdk_1.Logger.debug('Creating data source.');
            return new DataSource_1.DataSource(credentials);
        });
    }
}
exports.CustomApp = CustomApp;
