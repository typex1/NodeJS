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
    status: "Foo",
    ndc : "23",
    sn: "12345"
}

exports.search_a_task = function(req, res) {
  var ndcLength = 5;
  var ndcCandidate = req.params.ndcId.substring(0,5);
  var ndcCandidate1 = req.params.ndcId.substring(0,4);
  var ndcCandidate2 = req.params.ndcId.substring(0,3);
  var ndcCandidate3 = req.params.ndcId.substring(0,2);
  var phoneNumber = req.params.ndcId;
  var count = 0;
  var count1 = 0;
  var count2 = 0;
  var count3 = 0;
  var found = false;

  console.log( "before do loop: ndcCandidate:", ndcCandidate );
      Task.count({name: new RegExp('^'+ndcCandidate)}, function( err, count1){
      console.log( "1st: ndcCandidate:", ndcCandidate );
        if(err)
          res.send(err);
        if(count1 > 0) {
          returnObject.status="entryFound";
          returnObject.ndc=ndcCandidate;
          returnObject.sn=phoneNumber.substring(ndcCandidate.length,phoneNumber.length);
          found = true;
          console.log( "count1 > 0 !!")
          res.json(returnObject);
        }
        console.log( "ndcCandidate:", ndcCandidate );
        //returnObject.sn=phoneNumber.substring(ndcCandidate.length,100);
        console.log( "Number of hits:", count1 );
      }); // Task.count()

      Task.count({name: new RegExp('^'+ndcCandidate1)}, function( err, count2){
      console.log( "2nd: ndcCandidate:", ndcCandidate1 );
        if(err)
          res.send(err);
        if(count2 > 0) {
          returnObject.status="entryFound";
          returnObject.ndc=ndcCandidate;
          returnObject.sn=phoneNumber.substring(ndcCandidate1.length,phoneNumber.length);
          found = true;
          console.log( "count2 > 0 !!")
          res.json(returnObject);
        }
        console.log( "ndcCandidate1:", ndcCandidate1 );
        //returnObject.sn=phoneNumber.substring(ndcCandidate1.length,100);
        console.log( "Number of hits:", count2 );
      }); // Task.count()

      Task.count({name: new RegExp('^'+ndcCandidate2)}, function( err, count3){
      console.log( "3rd: ndcCandidate2:", ndcCandidate2 );
        if(err)
          res.send(err);
        if(count3 > 0) {
          returnObject.status="entryFound";
          returnObject.ndc=ndcCandidate2;
          returnObject.sn=phoneNumber.substring(ndcCandidate2.length,phoneNumber.length);
          found = true;
          console.log( "count3 > 0 !!")
          res.json(returnObject);
        }
        console.log( "ndcCandidate2:", ndcCandidate2 );
        //returnObject.sn=phoneNumber.substring(ndcCandidate2.length,100);
        console.log( "Number of hits:", count3 );
      }); // Task.count()
/*
    if ( count1 < 1 && count2 < 1 && count3 < 1) {
      console.log('nothing found!');
      returnObject.status="notFound";
      returnObject.ndc="";
      returnObject.sn="";
      res.json(returnObject);
    }
*/
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
