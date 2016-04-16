var mongoose = require('mongoose');
var Products = mongoose.model('Products');

module.exports = {

    show: function(req,res){
        Products.find({},function(err,data){
            if(err)
                console.log(err);
            else
                res.json(data);
        });
    },

    create: function(req,res){
        var product = new Products(req.body) 
        product.save(function(err){
            if(err)
                console.log(err);
            else
                res.redirect('/products')
        });
    },

    update: function(req,res){
        var newQuantity;
        console.log("req.body.qty:"+ req.body.qty)
        Products.findOne({name:req.body.product},function(err,data){
            if(err)
                console.log(err);
            else{
                console.log("data:"+ data.initialQty)
                newQuantity = data.initialQty - req.body.qty;
            }
        });
        if(newQuantity<0)
            res.json({status:false});
        else{
            Products.update({name:req.body.product},{initialQty:newQuantity},function(err){
                if(err)
                    console.log(err);
                else
                    res.json({result:true});
            });
        };
    },

    // delete: function(req,res){
    //     Products.remove({_id:req.body._id},function(err){
    //         if(err)
    //             console.log(err);
    //         else
    //             res.json({status:true});
    //     })
    // },
}