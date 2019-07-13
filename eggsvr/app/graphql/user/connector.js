'use strict';
class ArticleConnector {
    constructor(ctx) {
        this.ctx = ctx;
    }
    async fetchById(id) {
        return await this.ctx.service.article.fetchById(id);
    }
  }
module.exports = ArticleConnector;