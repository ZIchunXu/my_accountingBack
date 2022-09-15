'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const { id } = ctx.query;
    ctx.body = id;
  }

  // Get all users information
  async user() {
    const { ctx } = this;
    const result = await ctx.service.home.user();
    ctx.body = result;
  }
  
  async addUser() {
    const { ctx } = this;
    const { username } = ctx.request.body;
    try {
      const result = await ctx.service.home.addUser(username);
      ctx.body = {
          code: 200,
          msg: 'succesful',
          data: null,
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: 'fail',
        data: null,
      };
    }
  }
  // update user
  async editUser() {
    const { ctx } = this;
    const { id, username } = ctx.request.body;
    try {
      const result = await ctx.service.home.editUser(id, username);
      ctx.body = {
        code: 200,
        msg: 'succesful',
        data: null,
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: 'fail',
        data: null,
      };
    }
  }

  async findUser() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    try {
      const result = await ctx.service.home.findUser(id);
      ctx.body = {
        result,
      }
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: 'fail',
        data: null,
      };
    }
  }

  async deleteUser() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    try {
      const result = await ctx.service.home.deleteUser(id);
      ctx.body = {
        code: 200,
        msg: 'succesful',
        data: null,
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: 'fail',
        data: null,
      };
    }
  }
}

module.exports = HomeController;
