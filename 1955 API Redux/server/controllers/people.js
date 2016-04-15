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
        var new_person = new People({name:req.params.name},{name:req.body.name}, function(err){
            if(err)
                console.log(err);
            else
                res.redirect('/people')
        });
    },

    update: function(req,res){
        People.update({name:req.param.name},{name:req.body},function(err){
            if(err)
                console.log(err);
            else
                window.location.href='#/'
        });
    },

    remove: function(req,res){
        People.remove({name:req.params.name},function(err,person){
            if(err)
                console.log(err);
            else
                res.redirect('/people')
        })
    },
}