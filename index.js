'use strict';
const startCluster = require('egg').startCluster;
const app = require('./app/router')
startCluster({}, () => {
  app;
  console.log('started server');
});

