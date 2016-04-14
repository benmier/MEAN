var mongoose = require('mongoose');
var Friend = mongoose.model('Friend');

module.exports = (function() {
    return {
        index: function(req, res) {
            Friend.find({}, function(err, results) {
                if (err)
                    console.log(err);
                else
                	res.json(results);
        		      
            })
        }

        create: function(req, res) {
        	var new_friend = new Friend(req.body);
            new_friend.save(function(err, results) {
                if (err)
                    res.json(err);        		      
            })
        }
    }
})();