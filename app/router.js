'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const _jwt = middleware.jwtErr(app.config.jwt.secret);
  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/login', controller.user.login);
  router.get('/api/user/getuser', _jwt, controller.user.getUserInfor);
  router.post('/api/user/editpassword', _jwt, controller.user.editPassword);
  router.post('/api/user/editabout', _jwt, controller.user.editUserAbout);
  router.post('/api/user/editavatar', _jwt, controller.user.editAvatar);
  router.post('/api/upload',controller.upload.upload);
  router.get('/api/bill/list', controller.bill.getBillList);
  router.post('/api/bill/add', _jwt, controller.bill.addBill);
};
