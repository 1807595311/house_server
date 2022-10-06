export default function (data) {
  // 判断是否为对象
  let isObj = Object.prototype.toString.call(data) === '[object Object]';
  if (isObj) {
    this.$message({
      showClose: true,
      message: data.msg,
      type: data.status === 0 ? 'success' : 'error'
    });
  }else{
    this.$message({
      showClose: true,
      message: data,
      type: 'success'
    });
  }
}