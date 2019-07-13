async function findData(collectioname, query, options) {
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

module.exports = app => {
  app.beforeStart(async () => {
    const ctx = app.createAnonymousContext();
    // preload before app start
    //await ctx.service.posts.load();
    ctx.addSingleton('mongo', findData);
  });

  
}

