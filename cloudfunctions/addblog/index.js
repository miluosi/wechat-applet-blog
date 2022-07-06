// 云函数入口文件
const cloud = require('wx-server-sdk')


cloud.init()
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
    const openid = cloud.getWXContext().OPENID
    var {title,author,content,picurl}=event
    return await db.collection("blog").add({
      data:{
        title,
        author,
        content,
        openid,
        like:0,
        reviewnum:0,
        posttime:Date.now(),
        picurl
      }
    })
  
}