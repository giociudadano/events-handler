'use strict';

const config = require('./config');
const chalk = require('chalk');

const logServerBootup = () => {
  console.info(
    chalk.green.bold(
      '--------------------------[ Starting server ]--------------------------'
    )
  );
  console.info(chalk.bold('Application root path: ') + __dirname);
};

const setupDataStorage = async () => {
  if (!config.dbUri || !config.dbCredentials) {
    console.error(chalk.red.bold('No db connections and credentials found!'));
    process.exit(0);
  } else {
    const dbConnection = await require('./core/mongoose')();
    return { dbConnection };
  }
};

const setupApp = dbConnection => {
  const app = require('./core/express')(dbConnection);

  app.listen(config.port, () => {
    console.info('Application started!');
    console.info('----------------------------------------------');
    console.info(
      'Environment:\t' +
        chalk.underline.bold(process.env.NODE_ENV || 'development')
    );
    console.info('Port:\t' + config.port);
    console.info('----------------------------------------------');
    console.log('');
  });
};

logServerBootup();

setupDataStorage()
  .then(({ dbConnection }) => {
    setupApp(dbConnection);
  })
  .catch(error => {
    console.error(chalk.red.bold(error));
    process.exit(0);
  });
