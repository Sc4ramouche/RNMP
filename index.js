import { AppRegistry } from 'react-native';
import { Sentry } from 'react-native-sentry';

import App from './src/App';
import { name as appName } from './app.json';

Sentry.config('https://e57de3baeb7449ecac373c140f8508a0@sentry.io/1399708').install();
AppRegistry.registerComponent(appName, () => App);
