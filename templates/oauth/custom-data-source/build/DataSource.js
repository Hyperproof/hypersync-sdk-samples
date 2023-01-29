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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSource = void 0;
/**
 * Custom data source for the THE_SERVICE Hypersync app.
 */
class DataSource {
    constructor(credentials) {
        this.credentials = credentials;
    }
    // TODO: Update the `getData` call below to retrieve data from your service.
    getData(dataSetName) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
}
exports.DataSource = DataSource;
