import { handler } from '@event/readEvent/readEvent'
import { AppSyncResolverEvent, Context } from 'aws-lambda'

const callback = () => {}

const event: AppSyncResolverEvent<any> = {
  arguments: {
    input: {
      id: '123',
    },
  },
  identity: {
    sub: 'sub',
    issuer: 'issuer',
    username: 'username',
    claims: {
      sub: 'sub',
      issuer: 'issuer',
      username: 'username',
    },
    sourceIp: ['source-ip'],
    defaultAuthStrategy: 'default-auth-strategy',
  },
  source: {},
  request: {
    headers: {
      'header-name': 'header-value',
    },
    domainName: 'domain-name',
  },
  info: {
    selectionSetList: ['selection-set'],
    selectionSetGraphQL: 'selection-set-graphql',
    parentTypeName: 'parent-type-name',
    fieldName: 'field-name',
    variables: {
      variable: 'value',
    },
  },
  prev: {
    result: {
      key: 'value',
    },
  },
  stash: {
    key: 'value',
  },
}

const context: Context = {
  awsRequestId: 'aws-request-id',
  callbackWaitsForEmptyEventLoop: true,
  functionName: 'function-name',
  functionVersion: 'function-version',
  invokedFunctionArn: 'invoked-function-arn',
  logGroupName: 'log-group-name',
  logStreamName: 'log-stream-name',
  memoryLimitInMB: '128',
  done: () => {},
  fail: () => {},
  getRemainingTimeInMillis: () => 1000,
  succeed: () => {},
}

;(async () => {
  try {
    const result = await handler(event, context, callback)
    console.log(result)
  } catch (error) {
    console.error(error)
  }
})()
