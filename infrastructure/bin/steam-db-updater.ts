#!/usr/bin/env node
import 'source-map-support/register'
import { App } from '@aws-cdk/core'
import SteamDBUpdaterStack from '../lib/steam-db-updater-stack'

const appEnv: string = process.env.NODE_ENV ?? 'dev'
const functionName = `l-${appEnv.charAt(0)}-ew1-steam-db-updater`
const stackName = `cf-${appEnv.charAt(0)}-ew1-steam-db-updater`

const app = new App()

// eslint-disable-next-line no-new
new SteamDBUpdaterStack(app, stackName, {
  appEnv: appEnv,
  functionName: functionName,
  logLevel: process.env.LOG_LEVEL ?? 'ERROR',
  database: {
    username: process.env.MONGODB_USERNAME ?? 'root',
    password: process.env.MONGODB_PASSWORD ?? 'admin'
  },
  env: {
    account: process.env.CDK_DEPLOY_ACCOUNT,
    region: process.env.CDK_DEPLOY_REGION
  }
})
