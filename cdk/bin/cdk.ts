#!/usr/bin/env node

import { App, Environment } from 'aws-cdk-lib';

import { NetworkStack } from '../stacks/network-stack';
import { AppStack } from '../stacks/app-stack';
import { InfraStack } from '../stacks/infra-stack';

const cdkEnvironment: Environment = {
  account: '<AWS_ACCOUNT_ID>',
  region: 'us-east-1'
};

const app = new App();

const infraStack = new InfraStack(app, 'DemoInfraStack', {
  env: cdkEnvironment
});

const appStack = new AppStack(app, 'DemoAppStack', {
  env: cdkEnvironment,
  dynamoDbTable: infraStack.dynamoDbTable
});

new NetworkStack(app, 'DemoNetworkStack', {
  env: cdkEnvironment,
  lambda: appStack.lambda
});
