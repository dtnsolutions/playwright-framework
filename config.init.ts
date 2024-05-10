import path from 'path';

export const initConfig = (appName: string) => {
  const configFile = path.join(
    __dirname.toString(),
    'src',
    'apps',
    appName,
    'config.json',
  );
  let jsonData = require(configFile);

  (() => {
    switch (process.env.NODE_ENV) {
      case 'test':
        process.env.URL = jsonData.env.test.url;
        break;

      case 'dev':
        process.env.URL = jsonData.env.dev.url;
        break;

      case 'staging':
        process.env.URL = jsonData.env.staging.url;
        break;

      default:
        break;
    }
  })();
};
