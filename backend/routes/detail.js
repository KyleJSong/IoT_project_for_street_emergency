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

router.get("/search/:id", function(req, res, next) {
  var id = req.params.id;
  console.log(id);
  connection.query(`SELECT isCurrent FROM emergency_situations.sensor_val where id=${id} limit 1`, function(err, data){
    console.log(data);
    if(err) console.log("search err!");
    else {
      res.send(data);
    }
  })
});

router.get("/:id", function(req, res, next) {
  var id = req.params.id;
  connection.query(`SELECT * FROM emergency_situations.sensor_val WHERE id='${id}' ORDER BY idx DESC limit 20`, function(err, datas){
    if(err) console.log("detail err!");
    else{
      res.send(datas);
    }
  })
});

router.get("/",async function(req,res,err){
  // for(let i=1;i<=711;i++)
  //{

  const requestUrl1="https://52mpnxgee9.execute-api.us-east-2.amazonaws.com/default/iot_project";

  var dataarr=[];
  request.get(requestUrl1,(err,response,body)=>{//문화정보 api위치 이동하기
    if(err)
    {
      console.log("err in api");
    }
    else{

      var result=body;
      var jsonResult=convert.xml2json(result,{compact: true, spaces: 30});
      //

      var parsing=JSON.parse(jsonResult);

      rawData=parsing.SearchCulturalFacilitiesDetailService.row
      console.log("length is: "+rawData.length);
      for(let i=0;i<rawData.length;i++)
      {

        var data=rawData[i];
        dataarr.push({name: data.FAC_NAME._cdata, type: data.CODENAME._text, imgurl: data.MAIN_IMG._text, addr: data.ADDR._cdata})

      }

    }
    // console.log("dataarr:"+dataarr)
    res.send(dataarr);
  })
  // }
  if(err)
  {
    console.log("err");
  }
  else{
    res.end();
  }
});

module.exports = router;
