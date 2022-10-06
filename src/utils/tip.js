export default function (data) {
  let isObj = Object.prototype.toString.call(data) === "[object Object]";
  if (isObj) {
    if (data.status === -1) {
      return this.$Message.error({
        content: data.msg,
      });
    }else if(data.status === 0) {
      this.$Message.success({
        content: data.msg,
      });
    }
  }
}
