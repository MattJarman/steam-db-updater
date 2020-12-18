#!/usr/bin/env node
import 'source-map-support/register';
import { App } from '@aws-cdk/core';
import SteamDBUpdaterStack from '../lib/steam-db-updater-stack';

const app = new App();
new SteamDBUpdaterStack(app, 'SteamDBUpdaterStack');
