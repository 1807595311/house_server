export default function (data) {
  if (data == null) {
    return this.$Message.loading({
        content: "正在加载中...",
        duration: 0
    });
  }
  let isObj = Object.prototype.toString.call(data) === "[object Object]";
  if (isObj) {
    if (data.status === -1) {
      return this.$Message.error({
        content: data.msg,
      });
    }
    this.$Message.success({
      content: data.msg,
    });
  } else {
    this.$Message.warning({
      content: data,
    });
  }
}
