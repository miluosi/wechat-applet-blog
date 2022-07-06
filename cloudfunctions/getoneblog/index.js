// 云函数入口文件
const cloud = require('wx-server-sdk')


cloud.init()
const db=cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
    const openid=cloud.getWXContext().OPENID  
    var id=event.id;
  
    var res=await db.collection("blog").where({
      _id:id,
      zanGroup:_.all([openid])
    }).count();
    var size=res.total
    
    if(size){
      var res= await db.collection("blog").doc(id).get();
      res.data.zanShow=true;
      return {data:res.data};
      
    }else{
      var res= await db.collection("blog").doc(id).get();
      res.data.zanShow=false;
      return {data:res.data};
    }
  
}