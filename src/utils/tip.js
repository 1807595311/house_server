export default function (data) {
  let isObj = Object.prototype.toString.call(data) === "[object Object]";
  if (isObj) {
    switch (data.status) {
      case -1:
        this.$Message.error({
          content: data.msg,
        });
        break;
      case 0:
        this.$Message.success({
          content: data.msg,
        });
        break;
      case -2:
        this.$Message.error({
          content: data.msg,
        });
        this.$router.push('/login')
        break;
      default:
        break;
    }
  }
}
