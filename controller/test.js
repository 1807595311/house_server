module.exports = (req,res)=>{
    console.log('_test==>',req.query);
    res.send({msg:'测试接口',status: 0});
}