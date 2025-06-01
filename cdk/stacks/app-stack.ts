import { join } from 'path';
import { Construct } from 'constructs';
import { BundlingOutput, Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { TableV2 } from 'aws-cdk-lib/aws-dynamodb';
import { homedir } from 'os';

interface InfraStackProps extends StackProps {
  readonly dynamoDbTable: TableV2;
}

export class AppStack extends Stack {
  public readonly lambda: Function;

  constructor(scope: Construct, id: string, props: InfraStackProps) {
    super(scope, id, props);

    this.lambda = new Function(this, 'DemoLambda', {
      runtime: Runtime.JAVA_21,
      // handler: 'com.cgtfarmer.app.Handler',
      handler: 'io.micronaut.function.aws.proxy.payload2.APIGatewayV2HTTPEventFunction',
      code: Code.fromAsset(join(__dirname, '../../api/'), {
        bundling: {
          image: Runtime.JAVA_21.bundlingImage,
          user: 'root',
          command: [
            '/bin/sh',
            '-c',
            './gradlew build -PoutDir=/tmp --no-daemon && '
            + 'cp -v /tmp/libs/*-all-optimized.jar /asset-output/ &&'
            // Clean out the build artifacts to avoid
            // permission/ownership conflicts in local development
            + './gradlew clean'
          ],
          // Mounting host machine filesystem location for caching
          volumes: [
            {
              hostPath: join(homedir(), '.gradle-cdk'),
              containerPath: '/root/.gradle'
            }
          ],
          outputType: BundlingOutput.ARCHIVED
        }
      }),
      environment: {
        MICRONAUT_ENVIRONMENTS: 'cloud',
        LOGGER_LEVELS_ROOT: 'DEBUG', // DEBUG
        LOGGER_LEVELS_COM_CGTFARMER: 'TRACE', // TRACE
        DDB_TABLE_NAME: props.dynamoDbTable.tableName
      },
      memorySize: 1024,
      timeout: Duration.seconds(30)
    });

    props.dynamoDbTable.grantReadWriteData(this.lambda);
  }
}
