import { Rule, Schedule } from '@aws-cdk/aws-events'
import { LambdaFunction } from '@aws-cdk/aws-events-targets'
import { Stack, StackProps, Construct, Duration } from '@aws-cdk/core'
import {
  AssetCode,
  Function as AWSLambdaFunction,
  Runtime
} from '@aws-cdk/aws-lambda'

import Config from 'config'

interface DatabaseConfig {
  username: string
  password: string
}

interface SteamDBUpdaterStackProps extends StackProps {
  appEnv: string
  logLevel: string
  database: DatabaseConfig
  functionName: string
}

export default class SteamDBUpdaterStack extends Stack {
  private readonly lambdaFunction: AWSLambdaFunction
  private readonly scheduleHours: number
  private readonly lambdaTimeoutSeconds: number
  private readonly memorySize: number

  constructor(scope: Construct, id: string, props: SteamDBUpdaterStackProps) {
    super(scope, id, props)

    this.scheduleHours = Config.get('lambda.scheduleHours')
    this.lambdaTimeoutSeconds = Config.get('lambda.timeoutSeconds')
    this.memorySize = Config.get('lambda.memorySize')

    this.lambdaFunction = new AWSLambdaFunction(this, 'SteamDBUpdater', {
      code: new AssetCode('../app', {
        exclude: [
          '*.ts',
          'src/*',
          'test/*',
          'jest.config.js',
          '.eslintrc.js',
          '.eslintignore',
          'tsconfig*.json'
        ]
      }),
      handler: 'dist/modules/common/Handler.handler',
      runtime: Runtime.NODEJS_12_X,
      environment: {
        MONGODB_USERNAME: props.database.username,
        MONGODB_PASSWORD: props.database.password,
        NODE_ENV: props.appEnv,
        LOG_LEVEL: props.logLevel
      },
      functionName: props.functionName,
      timeout: Duration.seconds(this.lambdaTimeoutSeconds),
      memorySize: this.memorySize
    })

    const rule: Rule = new Rule(this, 'Rule', {
      schedule: Schedule.rate(Duration.hours(this.scheduleHours))
    })

    rule.addTarget(new LambdaFunction(this.lambdaFunction))
  }
}
