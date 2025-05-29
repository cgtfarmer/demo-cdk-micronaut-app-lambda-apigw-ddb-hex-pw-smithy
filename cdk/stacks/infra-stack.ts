import { Construct } from 'constructs';
import { RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { AttributeType, Billing, Capacity, TableClass, TableV2 } from 'aws-cdk-lib/aws-dynamodb';

export class InfraStack extends Stack {
  public readonly dynamoDbTable: TableV2;

  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    this.dynamoDbTable = new TableV2(this, 'DemoUserTable', {
      partitionKey: { name: 'id', type: AttributeType.STRING },
      tableClass: TableClass.STANDARD_INFREQUENT_ACCESS,
      billing: Billing.provisioned({
        readCapacity: Capacity.fixed(1),
        writeCapacity: Capacity.autoscaled({ maxCapacity: 1 })
      }),
      removalPolicy: RemovalPolicy.DESTROY
    });
  }
}
