import { expect as expectCDK, haveResource } from '@aws-cdk/assert'
import * as cdk from '@aws-cdk/core'
import SteamDBUpdaterStack from '../lib/steam-db-updater-stack'

test('Empty Stack', () => {
  const app = new cdk.App()

  const stack = new SteamDBUpdaterStack(app, 'MyTestStack', {
    appEnv: 'test-env',
    functionName: 'test-function-name',
    logLevel: 'ERROR',
    database: {
      username: 'root',
      password: 'admin'
    },
    env: {
      account: 'account',
      region: 'region'
    }
  })

  // TODO: Add better tests
  expect(stack).not.toBeNull()
  expectCDK(stack).to(
    haveResource('AWS::Lambda::Function', {
      FunctionName: 'test-function-name'
    })
  )
})
