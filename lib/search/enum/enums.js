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

/**
 * Created by: Servio Palacios on 2016.08.20
 * Source: enums.js
 * Author: Servio Palacios
 * Description: Enumeration for the next events:
 */

function Enums() {

  this.filterType = {
    TERM: "term",
    EXISTS: "exists",
    WILDCARD: "wildcard",
    REGEXP: "regexp",
    RANGE: "range",
    PREFIX: "prefix",
    SIZE: "size"
  };

  this.dirEdge = {
    INCOMING: "in",
    OUTGOING: "out"
  };

  this.edgeEndPoint = {
    SOURCE: "source",
    TARGET: "target"
  };

}

/* Immutable for security reasons */
module.exports = Object.freeze(new Enums());
