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
 * PageRank class.
 * @module lib/compute/algorithms/pagerank
 * @see module:core/api/external-api
 */

//External Libraries
var spark_job_request = require('superagent');

//Local Libraries
var Enums = require("./../enum/enums");
var config = require("./../config/config.json");
const Algorithm = require("./algorithm");

/** The Page Rank class */
class Dependencies extends Algorithm {

  /**
   * Create a PageRank object instance.
   * @param {object} [param= {}] - Parameter with default value of object {}.
   */
  constructor(param = {}) {

    /* Instance super constructor */
    super(param);

    /* The graph in which the algorithm will run. */
    this._property._graph = param.graph || Enums.pageRank.graph;

    /* The tolerance allowed at convergence (smaller => more accurate). */
    this._property._inputString = "Morgan";

    /* The type of algorithm */
    this._property._algorithmType = Enums.algorithmType.DEPENDENCIES;

  }

  /*<<<<<<<<<<<<<<<<<<<<<<<<<<<< GETTERS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/

  get TOL() {
    return this._property._TOL;
  }

  get resetProbability() {
    return this._property._resetProbability;
  }

  get alpha() {
    return this._property._resetProbability;
  }

  /******************************* SETTERS ************************************/

  set TOL(value) {
    this._property._TOL = value;
  }

  set resetProbability(value) {
    this._property._resetProbability = value;
  }

  set alpha(value) {
    this._property._resetProbability = value;
  }

}

/* Exporting the module */
module.exports = Dependencies;

