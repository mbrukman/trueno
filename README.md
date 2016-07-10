
<table border-style="none" cellspacing="6" cellpading="6">
  <tr>
    <td><img height="75" src="https://raw.githubusercontent.com/TruenoDB/trueno/master/assets/images/truenoDB.png"></td>
    <td><img height="300" src="https://raw.githubusercontent.com/TruenoDB/trueno/dev/assets/images/logo_medium.png"></td>
  </tr>
</table>

----------

## WARNING
<b>THIS PROJECT IS UNDER HEAVY DEVELOPMENT AND ITS NOT PRODUCTION READY.</b>

>The Dynamic/Static Graph Distributed Database

[![Build Status](https://travis-ci.org/mastayoda/trueno.io.svg?branch=master)](https://travis-ci.org/mastayoda/trueno.io)
[![npm version](https://badge.fury.io/js/trueno.io.svg)](http://badge.fury.io/js/trueno.io)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/TruenoDB/trueno) 
[![GitHub Stars](https://img.shields.io/github/stars/TruenoDB/trueno.svg)](https://github.com/TruenoDB/trueno)
[![Supported Platforms](https://img.shields.io/badge/platforms-Chrome|Firefox|Opera|Node.js-orange.svg)](https://github.com/mastayoda/trueno.io)

[//]: [![NPM](https://nodei.co/npm/trueno.io.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/trueno.io/)

## Features

- Distributed, resilient, and fast dynamic and static **graph database**.
- Support distributed computation.
- Online queries and traversal.
- Scalable to billions of nodes and edges.
- Easy setup for both cluster and single instance installations.
- User friendly and intuitive interface for graph analysis, fast algorithm processing and visualization.
- Designed for Data Mining and Machine Learning.

## Building blocks:

<p align="center">
  <img height="300" src="https://raw.githubusercontent.com/TruenoDB/trueno/master/assets/images/building_blocks.png">
</p>

## Workflow with **TruenoDB**

<p align="center">
  <img height="200" src="https://raw.githubusercontent.com/TruenoDB/trueno/master/assets/images/workflow.png">
</p>

## Architecture

<p align="center">
  <img height="400" src="https://raw.githubusercontent.com/TruenoDB/trueno/master/assets/images/architecture.png">
</p>

> **Components:**

> 1. **Gremlin (Apache Tinkerpop)** [1]: A graph traversal language for intuitive and easy graph analysis.
> 2. **Web Console**: Web Interface for graph processing, analytics, visualization, and database management. Data laboratory that connects directly to the database/processing engine.
> 3. **TensorFlow** [2]: Open Source Software Library for Machine Intelligence
> 4. **Trueno Core**: Database/Computational Engine Core.
> 5. **Apache Solr** [3]: The popular, blazing-fast, open source enterprise search platform built on Apache Lucene™ used for vertices and edges properties indexing.
> 6. **Apache Spark** [4]: a fast and general engine for large-scale data processing. Used for Distributed Graph Processing (GraphX [5]).
> 7. **Scylla DB** [6]: World's fastest NoSQL column store database. Fully compatible with Apache **Cassandra** [7] at 10x the throughput and low latency. Stores all graph structures.


##Roadmap to alpha version:

| Component                       | Percentage    |
| ------------------------------- | ------------- |
| Core                            |      30%      |
| Web Console                     |      30%      |
| Connectors                      |      20%      |
| Graph Compute Engine            |      20%      |
| Backend Storage                 |      20%      |
| Indexing                        |      10%      |
| Gremlin Tinkerpop Integration   |      20%      |
| Dynamic Graphs                  |      10%      |
| Tensorflow Integration          |      05%      |


----------

<p align="center">
  <img height="500" src="https://raw.githubusercontent.com/TruenoDB/trueno/master/assets/images/trueno_interface.png">
</p>

> **TruenoDB Interface Features:**
> Trueno relies on a fast graph analytic/visualization UI.

> 1. Angular Material Based.
> 2. Pure **WebSockets**, no slow HTTP requests.
> 3. **Sigma.js WebGL** rendering for high scalability.
> 4. **Gremlin** Language Traversal for graph retrieval.
> 5. XPath for graph component filtering.
> 6. Point, drag, click based functionality. No complex coding or preparation.
> 7. Export, Save, Import graphs.

----------


## Install

```sh
$ npm install -g trueno
```


###References:
 * [1] https://tinkerpop.apache.org/
 * [2] https://www.tensorflow.org/
 * [3] https://lucene.apache.org/solr/
 * [4] https://spark.apache.org/
 * [5] https://spark.apache.org/graphx/
 * [6] http://www.scylladb.com/
 * [7] https://cassandra.apache.org/



 © [Victor O. Santos, Servio Palacios, Edgardo Barsallo, Miguel Rivera, Aswin Siva, Venkata Subramanya, Peng Hao, Chih-Hao Fang, Ananth Grama](https://github.com/TruenoDB)
