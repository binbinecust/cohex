const Service = require('egg').Service;

class MongoService extends Service {
    /*
  collectioname:集合名，即表名:string
  query:{}
  options:{limit,skip,sort}
  callback：查询完成后的回调函数:function
  */
  async findData(collectioname, query, options) {
      let db = this.app.mongodb;
      //获得指定的集合 
      const collection = db.collection(collectioname);
      console.log("mongodb driver find(",query,",",options,")");
      console.log(db.url);
      let total=await collection.countDocuments(query, {});
      console.log(total);
      let result=await collection.find(query, options).toArray();
      console.log(result);
      return { code: 200, data: result,total:total};
  }

  /*
  collectioname:集合名
  data：插入集合的简单键值对对象
  callback：插入成功后的回调函数
  */
  async insertData(collectioname, data){
    //获得指定的集合 
    let db = this.app.mongodb;
    var collection = db.collection(collectioname);
    //配置了自定义递增方案
    if (data._autoid) {
        var inc = {};
        var inckey = data._autoid.inckey || "newid";
        var autoidcoll = data._autoid.autoidcoll || collectioname;
        var id = data._autoid.id || "_id";
        var incIdCollectioname=data._autoid.incIdCollectioname || "sysids";
        inc[inckey] = 1;
        //从保存ID递增值的表（sysids）里查找目前最大newid的一个值，作为新纪录的ID
        //sysids这个集合的格式为：{_id:"其他集合名",newid:"其他集合主键的最大值"}
        let idResult=await db.collection(incIdCollectioname).findOneAndUpdate(
          { _id: autoidcoll}, { $inc: inc }, { returnOriginal: false });

        if(idResult){
          data[id] = idResult.value[inckey];
          delete data._autoid;
          let result=await collection.insert(data);
          if(result){
            return { code: 200, data: result };
          }else{
            return { code: 500, data: null };
          }
        }else{
          return { code: 500, data: null };
        }
    } else {
        let result=await collection.insert(data);
        if(result){
          return { code: 200, data: result };
        }else{
          return { code: 500, data: null };
        }
    }
  }

  async insertDataMany(collectioname, manyData){
     //获得指定的集合 
     let db = this.app.mongodb;
     var collection = db.collection(collectioname);
     let result=await collection.insertMany(manyData,{});
     if(result){
       return { code: 200, data: result };
     }else{
       return { code: 500, data: null };
     }
  }

  async updateData(collectioname, where, updatedata){
    let db = this.app.mongodb;
    var collection = db.collection(collectioname);

    //更新数据
    //var where = { "id": 111 };
    //data={name:"aaaaaaaa",id:111,age:12}
    for (var k in updatedata) {
        if (where[k.toString()]) {
            delete updatedata[k.toString()];//删除包含在条件对象里的字段
        }
    }

    let result=await collection.update(where, {$set: updatedata});
    if(result){
      return { code: 200, data: result };
    }else{
      return { code: 500, data: null };
    }
  }

  async deleteOne(collectioname, where, options){
    let db = this.app.mongodb;
    var collection = db.collection(collectioname);
    console.log('deleteOne:' + JSON.stringify(where));

    let result=await collection.deleteOne(where, options);
    if(result){
      return { code: 200, data: result };
    }else{
      return { code: 500, data: null };
    }

  }

  async deleteMany(collectioname, where, options){
    let db = this.app.mongodb;
    var collection = db.collection(collectioname);
    console.log('deleteOne:' + JSON.stringify(where));

    let result=await collection.deleteMany(where, options);
    if(result){
      return { code: 200, data: result };
    }else{
      return { code: 500, data: null };
    }
  }

}

module.exports = MongoService;
