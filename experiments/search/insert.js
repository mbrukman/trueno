"use strict";
const Search = require('../../lib/search/search-client');
const Logger = require("../../lib/core/logging/logger");
var vertices = require("./vertices.json");
var edges = require("./edges.json");

/* Init logger */
global.logger = new Logger({'debug': false});

var s = new Search();

/* init the search */
s.init().then((host)=> {

  return s.indexExists('graphi');

}, (error)=> {

  console.log(error);

}).then((exist)=> {

  console.log('exists response is:', exist);

  if (exist) {
    return Promise.all([s.deleteIndex('graphi'), s.initIndex('graphi')]);
  } else {
    return s.initIndex('graphi');
  }

}).then((results)=> {

  var promises = [];

  /* Inserting all vertices */
  vertices.forEach((v)=> {
    promises.push(s.index({id: v.id,prop:v,meta:{},computed: {}}, 'graphi', 'v'));
  });
  /* Inserting all edges */
  edges.forEach((e)=> {
    promises.push(s.index({ prop:e, meta:{},computed: {}}, 'graphi', 'e'));
  });

  return Promise.all(promises);

}).then((results)=> {
  //console.log(results);
  console.log("done with creation");
});