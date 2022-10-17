module.exports = (req,res)=>{
    let d = req.body;
    db.query(`UPDATE dynamic SET content='${d.data}' WHERE id=1`,(err,result)=>{
        console.log(err);
        console.log(123,result);
    })
}