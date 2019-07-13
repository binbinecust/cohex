const Controller = require('egg').Controller;
//var { graphql, buildSchema } = require('graphql');
const {
  graphql,
  buildSchema,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString
}= require('graphql');
class NewsController extends Controller {
  async list() {
    const dataList = {
      list: [
        { id: 1, title: 'this is news 1111' + this.ctx.isIOS + '-' + this.ctx.reg.isNumber('23232'), url: '/news/1', time: new Date() },
        { id: 2, title: 'this is news 2' + this.ctx.isIOS + '-' + this.ctx.reg.isNumber('wetet'), url: '/news/2', time: new Date() },
      ],
    };
    await this.ctx.render('news/list.htm', dataList);
    //this.ctx.body=await this.ctx.service.mongo.findData("daily",{},{});

  }

   async gq() {
     //11111111111111111
    var schema = buildSchema(`
      type User {
        id: ID,
        name: String
      }
      type Query {
        hello: String,
        user:User
      }
    `);

    var root = { 
      title:"232323",
      cont:"sdgfdsfdsfdsfsd",
      user:{
        id:111,
        name:"chxccc"
      },
      posts:[
        {cont:"qqqqqqq"},{cont:"qqqqqqq"}
      ],
      hello: 'Hello world!' 
    };

    // graphql(schema, '{user{name}}', root).then((response) => {
    //   console.log(response);
    //   this.ctx.body = response;
    // });
    //22222222222222
    var User=new GraphQLObjectType({
       name:"User",
       fields:{
         id:{type:GraphQLInt},
         name:{type:GraphQLString}
       }
    });
    var _schema = new GraphQLSchema({
      query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
          hello: {
            type: GraphQLString,
            resolve() {
              return 'world11111111';
            }
          },
          user:{
            type:User,
            resolve() {//这里不写resolve函数，数据将从root数据源里取
              return {
                id:1,name:"dddddddddddd"
              };
            }
          }
        }
      })
    });
    var query = '{ user{name},hello }';
   var root={
    hello:"55555555555555",
    user:{
      id:222222,name:"ggggggggggggg"
    }
   };
    graphql(_schema, query,root).then(result => {
      this.ctx.body = result;
     
    });
  }
}

module.exports = NewsController;
