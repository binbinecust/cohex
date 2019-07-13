const Service = require('egg').Service;

class NewsService extends Service {
  async list(page = 1) {
    // read config
    const { serverUrl, pageSize } = this.config.news;

    // use build-in http client to GET hacker-news api
    const { data: idList } = await this.ctx.curl(`${serverUrl}/topstories.json`, {
      data: {
        orderBy: '"$key"',
        startAt: `"${pageSize * (page - 1)}"`,
        endAt: `"${pageSize * page - 1}"`,
      },
      dataType: 'json',
    });

    // parallel GET detail
    const newsList = await Promise.all(
      Object.keys(idList).map(key => {
        const url = `${serverUrl}/item/${idList[key]}.json`;
        return this.ctx.curl(url, { dataType: 'json' });
      })
    );
    return newsList.map(res => res.data);
  }

  async register() {
      let db = this.app.mongodb;

      let User = db.collection('user');

      let rs;
      try {
          let info = await User.insertOne({
              name: 'zhang san',
              phone: '177xxxxxxxx'
          });

          this.app.logger.log(info);

          rs = {
              code: '0',
              content: 'user register ok'
          }
      } catch (e) {
          this.app.logger.error(e && e.stack);

          rs = {
              code: '-1',
              content: e.message || 'unknown error'
          }
      }

      return rs;
  }
}

module.exports = NewsService;
