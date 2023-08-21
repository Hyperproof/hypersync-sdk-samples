import {
  HypersyncCriteria,
  IDataSource,
  IProofCriterionRef,
  IProofCriterionValue,
  JsonCriteriaProvider,
  TokenContext
} from '@hyperproof/hypersync-sdk';
import { DataSource } from './DataSource';
import Messages from './json/messages.json';

export class CriteriaProvider extends JsonCriteriaProvider {
  private orgId: string;

  constructor(appRootDir: string, dataSource: IDataSource) {
    super(appRootDir, dataSource);
    this.orgId = (dataSource as DataSource).getOrgId();
  }

  public async generateProofCriteria(
    proofCriteria: IProofCriterionRef[],
    criteriaValues: HypersyncCriteria,
    tokenContext: TokenContext
  ) {
    const criteria = await super.generateProofCriteria(
      proofCriteria,
      criteriaValues,
      tokenContext
    );

    // TODO: It would be nice to also add the organization name to the proof.
    // Unfortunately current organization info is not currently exposed in Hyperproof's API.
    const orgId: IProofCriterionValue = {
      name: 'orgId',
      label: Messages.LABEL_ORGANIZATION_ID,
      value: this.orgId
    };
    criteria.unshift(orgId);

    return criteria;
  }
}
