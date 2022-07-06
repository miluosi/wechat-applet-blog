// pages/show/show.js
const app=getApp();
var id =""
Page({

    /**
     * 页面的初始数据
     */
    data: {
        btnShow:true,
        iptVal:""
    },


    /**
     * 监听输入框内容函数
     */

    iptChange(res){    
        var value=res.detail.value;    
        if(value){
          this.setData({
            btnShow:false
          })
        }else{
          this.setData({
            btnShow:true
          })
        }
      },


      getPing(id){
        wx.cloud.callFunction({
          name:"demo_get_ping",
          data:{
            id
          }
        }).then(res=>{  
            console.log(res.result.data)          
          this.setData({
            pingData:res.result.data
          })
        })
    
      },
    



       // 提交评论函数
  onSubmit(res){  
    wx.showLoading({
      title: '数据加载中...',
    })  
    var content=res.detail.value.content;
    var userInfo=app.globalData.userInfo
    
    if(userInfo){
      wx.cloud.callFunction({
        name:"demo_add_ping",
        data:{
          id,
          content,
          userInfo
        }
      }).then(res=>{        
        wx.hideLoading()
        this.setData({
          iptVal:"",
          btnShow:true
        })
        this.getPing(id);
        
      })


    }else{
      wx.navigateTo({
        url: '/pages/login/login'
      })
    } 
    


  },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if(app.globalData){
            console.log("用户名:",app.globalData.userInfo)
        }
        wx.showLoading({
            title: '数据加载中...'
          })
          if(app){
              console.log("app:",app)
          }
          id =options.id;   
          console.log("id:",id)
          wx.cloud.callFunction({
            name:"getoneblog",
            data:{
              id:id
            }
          }).then(res=>{
            console.log("云函数返回:",res)
            var newData=res.result.data
            console.log(newData)
            this.setData({
              dataOne:newData
            })
            wx.hideLoading()
          })
          this.getPing(id);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },


      //对当前文章点赞
  clickZan(){
    wx.showLoading({
      title: '数据加载中...',
      mask:true
    })
    if(app.globalData.userInfo){
      console.log("授权")
      console.log(id)
      this.pushZan();
    }else{
      console.log("未授权")
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },
  pushZan(){
    wx.cloud.callFunction({
      name:"addzan",
      data:{
        id        
      }
    }).then(res=>{
      console.log(res)
      wx.hideLoading()
    })
  },  

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})