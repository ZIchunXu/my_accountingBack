'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const _jwt = middleware.jwtErr(app.config.jwt.secret);
  router.get('/', function (res) {res.send("Welcome!");
  });
  //register
  router.post('/api/user/register', controller.user.register);
  //
  router.post('/api/user/login', controller.user.login);
  // 
  router.get('/api/user/getalluser', controller.user.getUserList);
  router.get('/api/user/getuser', _jwt, controller.user.getUserInfor);
  //
  router.post('/api/user/editpassword', _jwt, controller.user.editPassword);
  // 
  router.post('/api/user/updateinfo', _jwt, controller.user.editUserInfor);
  // 
  router.post('/api/upload', controller.upload.upload);
  // 
  router.get('/api/bill/list', _jwt, controller.bill.getBillList);
  // 
  router.post('/api/bill/add', _jwt, controller.bill.addBill);
  // 
  router.get('/api/bill/detail', _jwt, controller.bill.getDetail);
  // 
  router.post('/api/bill/update', _jwt, controller.bill.editBill);
  // 
  router.post('/api/bill/delete', _jwt, controller.bill.deleteBill);
  // 
  router.get('/api/bill/data', _jwt, controller.bill.data);
  // 
  router.get('/api/type/list', _jwt, controller.type.getTypeList);
  // 
  router.post('/api/type/add', _jwt, controller.type.addType);
};
