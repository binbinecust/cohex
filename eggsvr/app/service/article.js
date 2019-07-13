const Service = require('egg').Service;

class NewsService extends Service {
  async fetchById(id = 1) {
    
    
    return {
      user:{
        id:1,
        name:"aaaaaaaaaaaaaaa",
        items:[
          {title:"111",cont:"1111111111111111"},{title:"222",cont:"2222222222222222"}
        ]
      }
    }
  }
}

module.exports = NewsService;