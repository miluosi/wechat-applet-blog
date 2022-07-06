const common={
  getMyId(){
    return Number(Math.random().toString().substr(3,12) + Date.now()).toString(36);
  },

  getMyFile(file){
    var index=file.lastIndexOf(".")
    return file.substr(index)

  }
}

module.exports=common

