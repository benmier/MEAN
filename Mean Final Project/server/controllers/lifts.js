var mongoose = require('mongoose');
var Lifts = mongoose.model('Lifts');

module.exports = {

	show: function(req,res){
        Lifts.find({},function(err,data){
            if(err)
                console.log(err);
            else
                res.json(data);
        });
    },

    showOne: function(req,res){
        Lifts.findOne({name:req.params.name},function(err,data){
            if(err)
                console.log(err);
            else{
                if(data.main_muscle=="Abdominals")
                    data.muscle_img = "http://assets.bodybuilding.com/images/trackers/exercise/heatmap/13.gif"
                else if(data.main_muscle=="Biceps")
                    data.muscle_img = "http://assets.bodybuilding.com/images/trackers/exercise/heatmap/15.gif"
                else if(data.main_muscle=="Triceps")
                    data.muscle_img = "http://assets.bodybuilding.com/images/trackers/exercise/heatmap/10.gif"
                else if(data.main_muscle=="Chest")
                    data.muscle_img = "http://assets.bodybuilding.com/images/trackers/exercise/heatmap/1.gif"
                else if(data.main_muscle=="Quadriceps")
                    data.muscle_img = "http://assets.bodybuilding.com/images/trackers/exercise/heatmap/7.gif"
                else if(data.main_muscle=="Hamstrings")
                    data.muscle_img = "http://assets.bodybuilding.com/images/trackers/exercise/heatmap/8.gif"
                else if(data.main_muscle=="Calves")
                    data.muscle_img = "http://assets.bodybuilding.com/images/trackers/exercise/heatmap/9.gif"
                else if(data.main_muscle=="Middle Back")
                    data.muscle_img = "http://assets.bodybuilding.com/images/trackers/exercise/heatmap/4.gif"
                else if(data.main_muscle=="Shoulders")
                    data.muscle_img = "http://assets.bodybuilding.com/images/trackers/exercise/heatmap/12.gif"
                else if(data.main_muscle=="Traps")
                    data.muscle_img = "http://assets.bodybuilding.com/images/trackers/exercise/heatmap/11.gif"
                else if(data.main_muscle=="Adductors")
                    data.muscle_img = "http://assets.bodybuilding.com/images/trackers/exercise/heatmap/17.gif"
                else if(data.main_muscle=="Lower Back")
                    data.muscle_img = "http://assets.bodybuilding.com/images/trackers/exercise/heatmap/5.gif"
                else if(data.main_muscle=="Glutes")
                    data.muscle_img = "http://assets.bodybuilding.com/images/trackers/exercise/heatmap/14.gif"
                else if(data.main_muscle=="Lats")
                    data.muscle_img = "http://assets.bodybuilding.com/images/trackers/exercise/heatmap/3.gif"
                else if(data.main_muscle=="Forearms")
                    data.muscle_img = "http://assets.bodybuilding.com/images/trackers/exercise/heatmap/2.gif"
                else if(data.main_muscle=="Neck")
                    data.muscle_img = "http://assets.bodybuilding.com/images/trackers/exercise/heatmap/6.gif"
                else if(data.main_muscle=="Abductors")
                    data.muscle_img = "http://assets.bodybuilding.com/images/trackers/exercise/heatmap/18.gif"
                if(data.muscle_img){
                    console.log(data)
                    res.json(data);
                }
            }
        });
    },

    showData: function(req,res){
        Lifts.find({},function(err,data){
            if(err)
                console.log(err);
            else{
                var newData = {};
                for(var i=0; i<data.length; i++){
                    for(lift in data[i]){
                        if(data[i][lift]==req.params.name)
                            newData[i]=data[i];
                        else{
                            for(j in data[i]["other_muscles"]){
                                if(data[i]["other_muscles"][j].name==req.params.name)
                                    newData[i]=data[i];
                            }
                        }
                    };
                };
                res.json(newData);
            };
        });
    },

    create: function(req,res){
        Lifts.findOne({name:req.body.name},function(err,data){
            if(err)
                console.log(err);
            else{
                if(data){
                    res.json(data);
                }
                else{
                    var lift = new Lifts(req.body) 
                    lift.save(function(err){
                        if(err)
                            console.log(err);
                        else{
                            Lifts.findOne({},function(err,data){
                                if(err)
                                    console.log(err);
                                else{
                                    res.json(data);
                                }
                            }).sort({_id:-1});
                        };
                    });
                }
            }
        });
    },



}