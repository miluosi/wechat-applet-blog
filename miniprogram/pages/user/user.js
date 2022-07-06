// pages/user/user.js
import common from "../../js/common.js";
const app=getApp();
var pathArr=[];
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tempPath:[],
        btnShow:true,
        admin:true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },



    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
    getUser(){
        setTimeout(()=>{
          var userInfo=app.globalData.userInfo
          console.log(userInfo)
          console.log(111)
          if(userInfo){
            this.setData({
              userInfo:userInfo
            })
          }
        },600)
      },    
    uploadinfo(){
        console.log(this.data.content)
        console.log(this.data.title)
        console.log(this.data.author)
    },
    changeye(){
        this.setData({
            admin:false
          })
    },

    changeyee(){
        this.setData({
            admin:true
          })
    },

    iptChange(res){
        if(res.detail.value.length){
          this.setData({
            btnShow:false
          })
        }else{
          this.setData({
            btnShow:true
          })
        }
      },
    onSubmit(res){   
        wx.showLoading({
          title: '发布中....',
          mask:true
        }) 
        var formData=res.detail.value
        console.log(formData)
        var {title,author}=res.detail.value;
        if(title.length==0 && author.length==0){
          wx.showToast({
            title: '标题及作者必填',        
            image:"/images/error.png",
            mask:true
          })
          return;
        }
        if(this.data.tempPath.length){
            this.data.tempPath.forEach((item,idx)=>{
              var d=new Date();
              var year=d.getFullYear()+"";
              var month=d.getMonth()+1;  
              month=month<10 ? "0"+month : month+""
              var day = d.getDate();
              day= day<10 ? "0"+day : day+"";
              var file=common.getMyId()          
              var filename="demoimg/"+year+month+day+"/"+file+common.getMyFile(item)
              wx.cloud.uploadFile({
                cloudPath:filename,
                filePath:item
              }).then(res=>{
                pathArr.push(res.fileID)     
                if(pathArr.length==this.data.tempPath.length){
                  formData.picurl=pathArr        
                  this.uploadfile(formData)
                }
              })
            })
          }else{
            this.uploadfile(formData)
          }
    },
    uploadfile(formData){
        wx.cloud.callFunction({
            name:"addblog",
            data:formData
          }).then(res=>{      
            wx.showToast({
              title: '发布成功'
            })  
            wx.hideLoading();
      })
      setTimeout(()=>{
        wx.reLaunch({
          url: '/pages/index/index'
        })
      },1500)   
    },


      //点击添加图像
      addImg(){
        wx.chooseImage({
          count:9,      
          success:res=>{
            var oldPath=this.data.tempPath
            var nsPath=oldPath.concat(res.tempFilePaths).slice(0,9)
            this.setData({
              tempPath:nsPath
            })
          }
        })
      },

  //点击删除选中图像
  clickDel(res){    

    var idx=res.currentTarget.dataset.idx;
    var tempPath=this.data.tempPath;
    tempPath.splice(idx,1);
    this.setData({
      tempPath
    })

  },

  //点击图像显示大图
  showBigImg(res){   

    var url=res.currentTarget.dataset.url
    wx.previewImage({
      urls:this.data.tempPath,
      current:url
    })

  },

      //上传图像到云存储
  uploadFile(filename,path){
    wx.cloud.uploadFile({
      cloudPath:filename,
      filePath:path
    }).then(res=>{
      pathArr.push(res.fileID)     
      if(pathArr.length==this.data.tempPath.length){
        formData.picUrl=pathArr        
        this.uploadfile(formData)
      }
    })
  },

    

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getUser();
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },
    gettitle(e){
        this.setData({
            title:e.detail.value
        })
    },
    getauthor(e){
        this.setData({
            author:e.detail.value
        })
    },
    getcontent(e){
        this.setData({
            content:e.detail.value
        })
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