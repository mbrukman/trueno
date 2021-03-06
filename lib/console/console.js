"use strict";

/**
 * @author Miguel Rivera Mediavilla
 * @description Console for TruenoDB
 * @module console/lib/console-entry
 * @see console/lib/actions
 */

const vorpal = require('vorpal')();
const Actions = require('./actions');

/** The console class */
class Console {

  /**
   * Create a ConsoleEntry Object.
   * @param {object} [param= {}] - Parameter with default value of object {}.
   */
  constructor(param = {}) {

    /* Set command line arguments */
    this._host = param.host || 'localhost';
    this._port = param.port || 8000;

  }

  /**
   * Initializes and launch the console.
   */
  init() {

    /* New Actions Instance */
    let actions = new Actions({vorpal: vorpal});

    /* Setup action array */
    let actionsArray = [
      {
        cmd: 'clear',
        action: actions.clear.bind(actions),
        options: [],
        desc: 'Clear the console.'
      },

      {
        cmd: 'connect',
        action: actions.connect.bind(actions),
        options: [['-h, --host', 'Specify host to connect to.'], ['-p, --port', 'Specify port to use for connection.']],
        desc: 'Connects the console to the server.'
      },

      {
        cmd: 'disconnect',
        action: actions.disconnect.bind(actions),
        options: [],
        desc: 'Disconnects the console from the server.'
      },

      {
        cmd: 'create <graphName>',
        action: actions.createGraph.bind(actions),
        options: [
          ['-d, --directed', 'Set the graph as directed'],
          ['-y, --dynamic', 'Set graph as dynamic']
        ],
        desc: 'Creates a new graph in the database.'
      },

      {
        cmd: 'load <graphName>',
        action: actions.loadGraph.bind(actions),
        options: [],
        desc: 'Loads a graph in memory.'
      },

      {
        cmd: 'list [graphName]',
        action: actions.listGraph.bind(actions),
        options: [
          ['-v, --vertice [vertexName]', 'List vertices of the specified graph.'],
          ['-e, --edge [fromVertex]', 'List edges of the specified graph']],
        desc: 'Lists all graphs in the database. Optionally list vertices and/or edges of a graph.'
      },

      {
        cmd: 'drop <graphName>',
        action: actions.deleteGraph.bind(actions),
        options: [],
        desc: 'Deletes the specified graph in the database.'
      },

      {
        cmd: 'add <entity> [graphName]',
        action: actions.add.bind(actions),
        options: [
          ['-n, --name <vertexName>', 'Vertex name of the intended vertex to add.'],
          ['-f, --from <fromVertex>', 'Start point (vertex name) of the intended edge to add'],
          ['-t, --to <toVertex>', 'Endpoint (vertex name) of the intended edge to add.'],

          ['-a, --attrib <attributes>', 'Set the attributes property for a vertex/edge.'],
          ['-c, --computed <computed>', 'Set the computed results property for a vertex/edge.'],
          ['-m, --metadata <metadata>', 'Set the metadata property for a vertex/edge.']
        ],
        desc: 'Adds an entity [vertex|edge] to a specified graph in the database.',
        type: {string: ['a', 'c', 'm']}
      },

      {
        cmd: 'update <entity> [graphName]',
        action: actions.update.bind(actions),
        options: [
          ['-n, --name <vertexName>', 'Vertex name of the intended vertex to update.'],
          ['-f, --from <fromVertex>', 'Start point (vertex name) of the intended edge to update'],
          ['-t, --to <toVertex>', 'Endpoint (vertex name) of the intended edge to update.'],

          ['-n, --name <vertexName>', 'Set the name property for a vertex.'],
          ['-a, --attrib <attributes>', 'Set the attributes property for a vertex/edge.'],
          ['-c, --computed <computed>', 'Set the computed results property for a vertex/edge.'],
          ['-m, --metadata <metadata>', 'Set the metadata property for a vertex/edge.']
        ],
        desc: 'Modifies an entity [vertex|edge] of specified graph.'
      },

      {
        cmd: 'delete <entity> [graphName]',
        action: actions.del.bind(actions),
        options: [
          ['-n, --name <vertexName>', 'Vertex name of the intended vertex to delete.'],

          ['-f, --from <fromVertex>', 'Start point (vertex name) of the intended edge to delete.'],
          ['-t, --to <toVertex>', 'Endpoint (vertex name) of the intended edge to delete.']
        ],
        desc: 'Deletes a [vertex|edge] from the specified graph in the database.'
      },

      {
        cmd: 'status',
        action: actions.showStatus.bind(actions),
        options: [],
        desc: 'Query the status of the graph database cluster.'
      }
    ];

    /* Delimiter and show CLI console */
    vorpal.delimiter('trueno ○-○').show();

    /* RPL mode command. Here we bind a function (RPL) to an Vorpal object
      in order to use this object inside the RPL function. */
    vorpal
      .mode('repl')
      .delimiter('repl>')
      .action(Actions.REPL.bind(actions));

    /* Add all other console commands */
    actionsArray.forEach((command)=> {
      let c = vorpal.command(command.cmd);
      c.description(command.desc);
      c.action(command.action);

      /* Set options, opt[0] are the flags, opt[1] is the description of the flag */
      command.options.forEach((opt)=> {
        c.option(opt[0], opt[1]);
      });
    });
  }
}


/* exporting the module */
module.exports = Console;
