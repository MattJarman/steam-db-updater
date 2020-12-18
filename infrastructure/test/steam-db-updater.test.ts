import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import SteamDBUpdaterStack from '../lib/steam-db-updater-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new SteamDBUpdaterStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
