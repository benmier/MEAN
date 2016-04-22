var mongoose = require('mongoose');
var Quizzes = mongoose.model('Quizzes');

module.exports = {

	show: function(req,res){
        Quizzes.find({},function(err,data){
            if(err)
                console.log(err);
            else
                res.json(data);
        });
    }
	



}
