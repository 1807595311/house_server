module.exports = (req,res)=>{
    console.log('_test==>',req.query);
    res.send({msg:'注册接口',status: 0});
}