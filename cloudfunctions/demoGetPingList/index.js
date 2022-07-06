// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const openid = cloud.getWXContext().OPENID;
  

  var resData= await db.collection("demoping").orderBy("posttime","desc").limit(10).where({
    openid
  }).get();

  var dataArr=resData.data;
  for(var item=0; item<dataArr.length; item++){    
    var id=dataArr[item].nsid;
    var arr=await db.collection("blog").doc(id).get();
    dataArr[item].title=arr.data.title    
  }

  return resData

  
  
}