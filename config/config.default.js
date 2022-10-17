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
    uploadDir: 'app/public/upload',
  };

  config.security = {
    csrf: {
      enable: false,
      ignorJASON: true
    },
    domainWhiteList: ['*'],
  }

  config.jwt = {
    secret: 'encrypted string',
  }

  config.multipart = {
    mode: 'file'
  };

  config.cors = {
    origin: '*',
    Credentials: true,
    allowMethods: 'GET,HEAD, PUT, POST, DELETE, PATCH',
  };

  exports.mongoose = {
    client: {
      url: 'mongodb+srv://root:root@cluster0.96kdpr9.mongodb.net/my_accounting?retryWrites=true&w=majority',
      options: {},
      useNewUrlParser: true,
      useUnifiedTopology: true,

      connect(err) {
        if (err) {
          return;
        }
        console.log("conc success")
      }
    },
    app: true,
    agent: false,
  }

  exports.baseUrl = 'http://127.0.0.1:7001';
  return {
    ...config,
    ...userConfig,
  };
};
