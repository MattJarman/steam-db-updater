# Steam DB Updater

A lambda function to regularly insert new games from [Steam](https://store.steampowered.com/) into a 
[MongoDB](https://www.mongodb.com/) database.

## Overview

The project is split into two different parts: [app](https://github.com/MattJarman/steam-db-updater/tree/master/app) 
and [infrastructure](https://github.com/MattJarman/steam-db-updater/tree/master/infrastructure).

The app part of the project contains the lambda function code, written in Typescript.

The infrastructure part of the project defines the resources needed for the lambda function to run, and was written 
using the [AWS CDK](https://docs.aws.amazon.com/cdk/latest/guide/home.html) Framework
and Typescript.

## Development
To run this project, you'll need the following:

* [Git](https://git-scm.com/downloads)
* [Docker Compose](https://docs.docker.com/compose/)

To set up the project, you can run `install.sh` located in the `scripts` directory. 

```
$ ./scripts/install.sh
```

### Running NPM commands

Here are all the NPM commands you can run:

|  Directory         | Command         | Description                                                           |                                                                             
|:-------------------|:----------------|:----------------------------------------------------------------------|
| **app**            | `build`         | Compiles the Typescript using `tsconfig.build.json`                   | 
|                    | `test`          | Runs suite of unit tests.                                             | 
|                    | `test:coverage` | Runs suite of units tests with coverage report. (*Fails if not 100%*) | 
|                    | `lint`          | Runs the linter.                                                      |
|                    | `lint:fix`      | Runs the linter and fixes any issues it can.                          |
| **infrastructure** | `build`         | Compiles the Typescript.                                              |
|                    | `test`          | Runs suite of unit tests.                                             |
|                    | `lint`          | Runs the linter.                                                      |
|                    | `lint:fix`      | Runs the linter and fixes any issues it can.                          |
|                    | `cdk`           | CDK CLI - allows you to run cdk commands.                             |
|                    | `bootstrap`     | Provisions resources for deployment.                                  |
|                    | `deploy`        | Deploy the stack using CDK.                                           |

You can run these commands through docker-compose by running the `run.sh` script found in the `scripts` directory. By default, 
this script will only run commands in the app directory. If you wish to run commands in the infrastructure directory,
then you can pass the `-w`, `-working-dir` flag with the value `infrastructure`. 

#### Example

```
$ ./scripts/run.sh -w infrastructure boostrap
```

### Deployment

To deploy the lambda function, you can use the `deploy.sh` script located in the `scripts` directory. If you're planning
on using this script on your local machine (*recommended if you have AWS profiles set up*), then you'll need
[Node.js](https://nodejs.org/en/) installed.

The deploy script accepts the following flags:

| Flag                       | Description                                                                                       | Required         | Default    |
|:---------------------------|:--------------------------------------------------------------------------------------------------|:-----------------|:-----------|
| `-e`, `--environment`      | Environment for the function. Must be one of: *dev*, *prod*.                                      |:heavy_check_mark:| *None*     |
| `-an`, `--account-number`  | Account number of account that the lambda will be deployed to.                                    |:heavy_check_mark:| *None*     |
| `-p`, `--profile`          | AWS profile which contains your credentials.                                                      |:x:               | *default*  |
| `-r`, `--region`           | Region the lambda will be deployed to.                                                            |:x:               | *eu-west-1*|

*Before first deployment, you may need to provision the resources. You can do this by running the
following*:

```
$ ./scripts/run.sh -w infrastructure boostrap
```

#### Deploy from local machine

##### 1. Export your AWS credentials (optional)

***If you already have an AWS profile set up in `~/.aws/credentials`, then you can skip this step.***

```
$ export AWS_ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY_ID
$ export AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_ACCESS_KEY
```

##### 2. Run the deployment script
```
$ ./scripts/deploy.sh -e prod -an AWS_ACCOUNT_NUMBER -r AWS_REGION
```

If you didn't export your credentials and instead chose to use your AWS profile, then you should run this command 
instead:

```
$ ./scripts/deploy.sh -e prod -an AWS_ACCOUNT_NUMBER -r AWS_REGION -p AWS_PROFILE
```

#### Deploy from Docker Compose

If you would rather not install Node.js, then you can use this method instead.

##### 1. Run the node container

```
$ docker-compose run --rm --user "$(id -u)":"$(id -g)" sdbu_node sh
```

##### 2. Export your AWS credentials
```
/var/www $ export AWS_ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY_ID
/var/www $ export AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_ACCESS_KEY
```

##### 3. Run the deployment script
```
/var/www $ sh ./scripts/deploy.sh -e prod -an AWS_ACCOUNT_NUMBER -r AWS_REGION
```
