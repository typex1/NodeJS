'use strict';

var mongoose = require('mongoose'),
  NDC = mongoose.model('NDCs');

exports.list_all_ndcs = function(req, res) {
  NDC.find({}, function(err, ndc) {
    if (err)
      res.send(err);
    res.json(ndc);
  });
};

exports.create_an_ndc = function(req, res) {
  var new_ndc = new NDC(req.body);
  new_ndc.save(function(err, ndc) {
    if (err)
      res.send(err);
    res.json(ndc);
  });
};

exports.read_an_ndc = function(req, res) {
  NDC.findById(req.params.ndcId, function(err, ndc) {
    if (err)
      res.send(err);
    res.json(ndc);
  });
};

var returnObject = {
    ndc : "0",
    sn: "0",
    type: "0",
    detail: "-",
    status: "ndc does not exist"
}

exports.check_a_phoneNumber = function(req, res) {
      var ndcCandidate;
      var phoneNumber = req.params.phoneNumber;
      var found = false;
      var i = 0;

      if (phoneNumber.substring(0,3) == "+49")
        phoneNumber=phoneNumber.substring(3);
      if (phoneNumber.substring(0,4) == "0049")
        phoneNumber=phoneNumber.substring(4);
      if (phoneNumber.substring(0,1) == "0")
        phoneNumber=phoneNumber.substring(1);
      var startsWith = phoneNumber.substring(0,2);
      //console.log("startsWith: ", startsWith);

      //NDC.find({}, function(err, ndcArr) {
      // match first digit of phone number to reduce search result by 90%
      NDC.find({ndc: new RegExp('^'+startsWith)}, function(err, ndcArr) {
        if (err)
          res.send(err);
        //console.log("ndcArr is ",Object.prototype.toString.call(ndcArr));
        ndcArr.forEach(function(record){
          for (var ndcLength = 2; ndcLength <=5; ndcLength++){
            ndcCandidate = phoneNumber.substring(0,ndcLength);
            //console.log("ndcCandidate = ", ndcCandidate);
            if (ndcCandidate == record.ndc && found == false){
              //console.log("match : ", record.ndc);
              returnObject.ndc=ndcCandidate;
              returnObject.sn=phoneNumber.substring(ndcLength);
              returnObject.type=record.type;
              returnObject.detail=record.detail;
              returnObject.status="OK";
              res.json(returnObject);
              found = true;
            }
          }
          i++;
        });
        console.log("array of mongo query find results has length: ",i);
        i=0;
        if (found == false){
          returnObject.ndc="0"; 
          returnObject.sn="0"; 
          returnObject.type="0"; 
          returnObject.detail= "-";
          returnObject.status="ndc does not exist"
          res.json(returnObject);
        }
      });
};

exports.update_an_ndc = function(req, res) {
  NDC.findOneAndUpdate({_id:req.params.ndcId}, req.body, {new: true}, function(err, ndc) {
    if (err)
      res.send(err);
    res.json(ndc);
  });
};

exports.delete_an_ndc = function(req, res) {

  NDC.remove({
    _id: req.params.ndcId
  }, function(err, ndc) {
    if (err)
      res.send(err);
    res.json({ message: 'NDC successfully deleted' });
  });
};
