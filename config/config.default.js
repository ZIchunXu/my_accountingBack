/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */

module.exports = appInfo => {
  
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1663109404531_3714';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.security = {
    csrf: {
      enable: false,
      ignorJASON: true
    },
    domainWhiteList: [ '*' ],
  }

  config.jwt = {
    secret: 'encrypted string',
  }

  exports.mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user:'root',
      password: 'root',
      database: 'my_accounting_database',
    },
    app: true,
    agent: false,
  };
  return {
    ...config,
    ...userConfig,
  };
};
