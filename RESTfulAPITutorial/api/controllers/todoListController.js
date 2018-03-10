'use strict';

var mongoose = require('mongoose'),
  Task = mongoose.model('Tasks');

exports.list_all_tasks = function(req, res) {
  Task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.create_a_task = function(req, res) {
  var new_task = new Task(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.read_a_task = function(req, res) {
  Task.findById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

//fsp 20180217

var returnObject = {
    ndc : "0",
    sn: "0",
    status: "error"
}

exports.search_a_task = function(req, res) {
      var ndcCandidate;
      var phoneNumber = req.params.ndcId;
      var found = false;

      if (phoneNumber.substring(0,1) == "0")
        phoneNumber=phoneNumber.substring(1);

      //console.log( "phone number is :", phoneNumber );
      Task.find({}, function(err, task) {
        if (err)
          res.send(err);
        task.forEach(function(record){
          for (var ndcLength = 2; ndcLength <=5; ndcLength++){
            //console.log("checking ndcLength=",ndcLength); 
            //ndcCandidate = req.params.ndcId.substring(0,ndcLength);
            ndcCandidate = phoneNumber.substring(0,ndcLength);
            //console.log("searching ndcCandidate=",ndcCandidate); 
            if (ndcCandidate == record.name && found == false){
              //console.log("match : ", record.name);
              returnObject.ndc=ndcCandidate;
              returnObject.sn=phoneNumber.substring(ndcLength);
              returnObject.status="OK";
              res.json(returnObject);
              found = true;
            }
          }
        });
        if (found == false){
          returnObject.status="notFound"; 
          res.json(returnObject);
        }
      });
};

exports.update_a_task = function(req, res) {
  Task.findOneAndUpdate({_id:req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};
// Task.remove({}).exec(function(){});
exports.delete_a_task = function(req, res) {

  Task.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};
