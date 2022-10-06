export default function (data) {
  return new Promise((resolve, reject) => {
    this.$confirm(`您确定要${data}?`, `${data}`, {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then((res) => {
      resolve(res);
    }).catch((err)=>{
      reject(err)
    })
  })
}