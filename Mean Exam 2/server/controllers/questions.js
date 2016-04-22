var mongoose = require('mongoose');
var random = require('mongoose-simple-random');
var Questions = mongoose.model('Questions');

module.exports = {

	show3: function(req,res){
        Users.findRandom({},{},{limit: 3}, function(err,data){
            if(err)
                console.log(err);
            else
                res.json(data);
        });
    },

}
