// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database();
const _ =db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const openid = cloud.getWXContext().OPENID
  var {content,id,userInfo}=event;
  var posttime=Date.now();

  return await db.collection("demoping").add({
    data:{
      content,
      nsid:id,
      posttime,
      openid,
      userInfo
    }
  })
  
}