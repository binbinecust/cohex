'use strict';
module.exports = {
  Query: {
    user(root, { id }, ctx) {
      console.log(root);
      return ctx.connector.user.fetchById(id);
    },
  },
};