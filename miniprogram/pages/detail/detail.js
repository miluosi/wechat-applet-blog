// pages/detail/detail.js
var type=""
Page({

    /**
     * 页面的初始数据
     */
    data: {
        listData:[]
    },

    getList(){
        if(type=="zan"){
          wx.cloud.callFunction({
            name:"demoGetZanList"
          }).then(res=>{ 
            wx.stopPullDownRefresh();     
            console.log(res.result.data)
            this.setData({
              listData:res.result.data
            })
          })
        }else if(type="ping"){
          wx.cloud.callFunction({
            name:"demoGetPingList"
          }).then(res=>{
            console.log(res)
            wx.stopPullDownRefresh();
            this.setData({
              listData:res.result.data
            })
          })
        }
      },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        type=options.type;
        console.log(type);
        this.getList();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {
        this.getList();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})