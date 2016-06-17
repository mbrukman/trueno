"use strict";

/*
  ________                                                 _______   _______
 /        |                                               /       \ /       \
 $$$$$$$$/______   __    __   ______   _______    ______  $$$$$$$  |$$$$$$$  |
    $$ | /      \ /  |  /  | /      \ /       \  /      \ $$ |  $$ |$$ |__$$ |
    $$ |/$$$$$$  |$$ |  $$ |/$$$$$$  |$$$$$$$  |/$$$$$$  |$$ |  $$ |$$    $$<
    $$ |$$ |  $$/ $$ |  $$ |$$    $$ |$$ |  $$ |$$ |  $$ |$$ |  $$ |$$$$$$$  |
    $$ |$$ |      $$ \__$$ |$$$$$$$$/ $$ |  $$ |$$ \__$$ |$$ |__$$ |$$ |__$$ |
    $$ |$$ |      $$    $$/ $$       |$$ |  $$ |$$    $$/ $$    $$/ $$    $$/
    $$/ $$/        $$$$$$/   $$$$$$$/ $$/   $$/  $$$$$$/  $$$$$$$/  $$$$$$$/
 */

/** In God we trust
 * @author Servio Palacios
 * @date_creation 2016.06.13.
 * @module lib/compute/scheduler/compute_scheduler.js
 * @description Spark Job Scheduler
 *
 */

//External Libraries

//Local Libraries
var Enums = require("../enum/enums");
var config = require("../config/config.json");
var PageRank = require("../algorithms/pagerank");
var ConnectedComponents = require("../algorithms/connected_components");
var StronglyConnectedComponents = require("../algorithms/strongly_connected_components");
var TriangleCounting = require("../algorithms/triangle_counting");
var ShortestPaths = require("../algorithms/shortest_paths");

/**
 * @constructor
 *
 */
function ComputeScheduler(options) {

  let self = this;

  if (options === null) {

    throw new Error(Enums.errorMessages.optionsNotDefined);

  }

  /* Spark Job Server Address */
  self._sparkJobServer =  options.defaultSparkJobServer ||
                          config.sparkJobServer.defaultSparkJobServer;

  /* Spark Job Server Port */
  self._sparkJobServerPort =  options.defaultPort ||
                              config.sparkJobServer.defaultPort;
  /* Set of Requested jobs */
  self._requestedJobs = [];

  /* Reference to PageRank Algorithm */
  self._objPageRank = null;

  /* Reference to ConnectedComponents Algorithm */
  self._objConnectedComponents = null;

  /* Reference to TriangleCounting Algorithm */
  self._objTriangleCounting = null;

  /* Current jobId */
  self._jobId = null;

  /* Job Requests */
  self._jobRequests = {};

}//ComputeScheduler Constructor

/**
 * Instantiating Compute Classes (for Spark Job Server)
 *
 * @param job this contains the type of algorithm and parameters associated to the algorithm
 * (job type)
 * @return the status of the job from the Spark Job Server.
 */
ComputeScheduler.prototype._compute = function(job) {

  let self = this;
  let jobId;

  switch(job.algorithmType) {

    case Enums.algorithmType.PAGE_RANK:

      /* Get new PageRank instance */
      console.log(Enums.algorithmType.PAGE_RANK);

      let pagerankParameters = {
                                graph:  job.algorithm.property.graph,
                                TOL:    job.algorithm.property.TOL,
                                alpha:  job.algorithm.property.resetProb
                               };

      self._objPageRank = new PageRank(pagerankParameters);
      jobId = self._objPageRank.run();
      break;

    /* Get new ConnectedComponents instance */
    case Enums.algorithmType.CONNECTED_COMPONENTS:

      let connectedComponentsParameters = {
        graph:  job.algorithm.property.graph,
        TOL:    job.algorithm.property.maxIterations
      };

      let objConnectedComponents = new
          ConnectedComponents(connectedComponentsParameters);

      objConnectedComponents.run();

      break;

    /* Get new Strongly ConnectedComponents instance */
    case Enums.algorithmType.STRONGLY_CONNECTED_COMPONENTS:

      let stronglyConnectedComponentsParameters = {
        graph:  job.algorithm.property.graph,
        TOL:    job.algorithm.property.maxIterations
      };

      let objStronglyConnectedComponents = new
          StronglyConnectedComponents(stronglyConnectedComponentsParameters);

      objStronglyConnectedComponents.run();

      break;

    /* Get new Triangle Counting instance */
    case Enums.algorithmType.TRIANGLE_COUNTING:

      let triangleCountingParameters = {
        graph:   job.algorithm.property.graph
      };

      let objTriangleCounting = new
          TriangleCounting(triangleCountingParameters);

      objTriangleCounting.run();

      break;

    /* Get new Shortest Paths instance */
    case Enums.algorithmType.SHORTEST_PATHS:

      let shortestPathsParameters = {
        graph:   job.algorithm.property.graph
      };

      let objShortestPaths = new
          ShortestPaths(shortestPathsParameters);

      objShortestPaths.run();

      break;

    /* Algorithm not recognized */
    default:
      throw new Error(Enums.errorMessages.computeSchedulerAlgorithmNotRecognized);

  }//switch

};

/**
 * Instantiating Compute Classes (for Spark Job Server) // Using Promises
 *
 * @param job this contains the type of algorithm and parameters associated to the algorithm
 * (job type)
 * @return the status of the job from the Spark Job Server.
 */
ComputeScheduler.prototype._compute_promise = function(job) {

  let self = this;

  switch(job.algorithmType) {

    /* Get new PageRank instance */
    case Enums.algorithmType.PAGE_RANK:

      /* PageRank personalized parameters */
      let pagerankParameters = {
        graph:  job.algorithm.property.graph,
        TOL:    job.algorithm.property.TOL,
        alpha:  job.algorithm.property.resetProb
      };

      /* New Instance of PageRank Algorithm */
      self._objPageRank = new PageRank(pagerankParameters);

      /* Promise based Dynamic Version of PageRank */
      self._objPageRank.run_promise().then(function(jobId){

        /* Obtaining the PageRank JobId from the promise */
        self._jobId = jobId;

        /* Keeping track of all requested jobs */
        self._trackJobId(
                          self._jobId,
                          Enums.algorithmType.PAGE_RANK,
                          self._objPageRank._status
                        );

      }, (err) => {

        /* Error in Promise */
        console.log("Error: " + err);

      });

      break;

    /* Get new ConnectedComponents instance */
    case Enums.algorithmType.CONNECTED_COMPONENTS:

      /* ConnectedComponents personalized parameters */
      let connectedComponentsParameters = {
        graph:  job.algorithm.property.graph,
        TOL:    job.algorithm.property.maxIterations
      };

      self._objConnectedComponents = new
                                ConnectedComponents(connectedComponentsParameters);


      /* Promise based Dynamic Version of ConnectedComponents */
      self._objConnectedComponents.run_promise().then(function(jobId){

        /* Obtaining the ConnectedComponents JobId from the promise */
        self._jobId = jobId;

        /* Keeping track of all requested jobs */
        self._trackJobId(
                          self._jobId,
                          Enums.algorithmType.CONNECTED_COMPONENTS,
                          self._objPageRank._status
                        );


      }, (err) => {

        /* Error in Promise */
        console.log("Error: " + err);

      });

      break;

    /* Get new Triangle Counting instance */
    case Enums.algorithmType.TRIANGLE_COUNTING:

      /* Triangle Counting personalized parameters */
      let triangleCountingParameters = {
        graph:   job.algorithm.property.graph
      };

      self._objTriangleCounting = new
                              TriangleCounting(triangleCountingParameters);


      /* Promise based Dynamic Version of TriangleCounting */
      self._objTriangleCounting.run_promise().then(function(jobId){

        /* Obtaining the TriangleCounting JobId from the promise */
        self._jobId = jobId;

        /* Keeping track of all requested jobs */
        self._trackJobId(
                          self._jobId,
                          Enums.algorithmType.TRIANGLE_COUNTING,
                          self._objPageRank._status
                        );

      }, (err) => {

        /* Error in Promise */
        console.log("Error: " + err);

      });

      break;

    /* Algorithm not recognized */
    default:
      throw new Error(Enums.errorMessages.computeSchedulerAlgorithmNotRecognized);

  }//switch

};//_compute_promise

/**
 * Instantiating Compute Classes (for Spark Job Server)
 *
 * @param jobId this contains the JobID obtained from compute() call
 * @return the status of the job from the Spark Job Server.
 */
ComputeScheduler.prototype._jobStatus = function(jobId) {

  let self = this;

  self._jobRequests[jobId].status = this._objPageRank._jobStatusRequest(jobId);

  return self._jobRequests[jobId].status;

};//_jobStatus

/**
 * Establish the current jobId (taken from the Spark Job Server)
 *
 * @return Return the current _jobId.
 */
ComputeScheduler.prototype._getJobId = function() {

  return this._jobId;

};//_getJobId

/**
 * Keep Track of Jobs
 * @param jobId this contains the JobID obtained from compute() call
 * @param algorithmType type of algorithm
 * @param status of the job
 */
ComputeScheduler.prototype._trackJobId = function(jobId, algorithmType, status) {

  let self = this;

  /* Keeping track of all requested jobs */
  self._jobRequests[self._jobId] = {};
  self._jobRequests[self._jobId].status = status;
  self._jobRequests[self._jobId].algorithmType  = algorithmType;

};//_trackJobId

/* Exporting module */
module.exports = ComputeScheduler;
