var express = require('express');
var router = express.Router();
const request=require('request');
const convert=require('xml-js');

var myDatabase=require('../db/db_conn.js');
var connection= myDatabase.init();

connection.connect(function (err) {
  if (err) {
    console.error('mysql connection error');
    console.error(err);
    throw err;
  }
});


router.get("/p_emer", function(req, res, next) {
  connection.query('SELECT * FROM emergency_situations.previous_emergency ORDER BY idx DESC limit 10', function(err, datas){
    if(err) console.log("previous_emergency err!");
    else{
      res.send(datas);
    }
  })
});

module.exports = router;
