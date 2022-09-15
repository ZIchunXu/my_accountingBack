'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  router.get('/', controller.home.index);
  router.get('/user', controller.home.user);
  router.post('/add_user', controller.home.addUser);
  router.post('/edit_user', controller.home.editUser);
  router.get('/find_user', controller.home.findUser);
  router.post('/delete_user', controller.home.deleteUser);
  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/login', controller.user.login);
};
