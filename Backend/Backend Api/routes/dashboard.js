// dash baord api working fine 
const express = require('express');
const connection = require('../connection');
const router = express.Router();

var auth = require('./services/authentication');

router.get('/details',(req,res,next)=>{ 
    var categorycount; 
    var productcount; 
    var billcount;
    var query= "select count(id) as categorycount from category";
    connection.query(query,(err,results)=>{
        if(!err)
        {
categorycount= results[0].categorycount;
        }
        else 
        {
            return res.status(500).json(err);
        }
    })

    var query="select count(id) as productcount from product";
    connection.query(query,(err,results)=>{
        if(!err)
        {
productcount= results[0].productcount;
        }
        else
        {
            return res.status(500).json(err);
        }
    })
    var query="select count(id) as billcount from bill";
    connection.query(query,(err,results)=>{
        if(!err)
        {
billcount= results[0].billcount;
        
var data = {
    category:categorycount,
    product:productcount,
   bill:billcount
};
        
return res.status(200).json(data);
        }
        else
        {
            return res.status(500).json(err);
        }
})
})
module.exports=router;