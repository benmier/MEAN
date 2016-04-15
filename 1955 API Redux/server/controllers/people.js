var mongoose = require('mongoose');
var People = mongoose.model('People');

module.exports = {

    show: function(req,res){
        People.find({},function(err,people){
            if(err)
                console.log(err);
            else
                res.json(people);
        });
    },

    show_one: function(req,res){
        People.findOne({name:req.params.name},function(err,person){
            if(err)
                console.log(err);
            else
                res.json(person);
        });
    },

    create: function(req,res){
        var new_person = new People({name:req.body.name}) 
        new_person.save(function(err){
            if(err)
                console.log(err);
            else
                res.redirect('/people')
        });
    },

    update: function(req,res){
        People.update({name:req.params.name},req.body,function(err){
            if(err)
                console.log(err);
            else
                res.json({result:true});
        });
    },

    remove: function(req,res){
        People.remove({_id:req.params.id},function(err){
            if(err)
                console.log(err);
            else
                res.redirect('/people')
        })
    },
}