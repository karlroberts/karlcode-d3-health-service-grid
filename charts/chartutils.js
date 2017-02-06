"use strict";
var constants_1 = require("./constants");
var d3 = require("d3");
var modelutils_1 = require("./modelutils");
var helper = {
    "whoami": "helper functions",
    "calcEmSize": function calcEmSize() {
        return 1;
    },
    "homogeneous": function homogeneous(stateList) {
        if (!stateList || stateList.length === 0) {
            console.warn("helper.homogeneous(stateList): was passed an empty or null stateList. return empty array");
            return false;
        }
        return modelutils_1.default.homogeneous(stateList);
    },
    "canonicalSort": function canonicalSort(stateList) {
        if (!stateList || stateList.length === 0) {
            console.warn("helper.canonicalSort(statelist): was passed an empty or null statelist. return empty array");
            return [];
        }
        return modelutils_1.default.canonicalSort(stateList);
    },
    "unique": function (xs) {
        return xs.filter(function (x, i) {
            return xs.indexOf(x) === i;
        });
    },
    "colourizeNode": function colourizeNode(state) {
        var ret = d3.hsl("white");
        switch (state) {
            case "UNKNOWN":
                ret = d3.hsl(constants_1.default.COLOURS.UNKNOWN);
                break;
            case "ERROR":
                ret = d3.hsl(constants_1.default.COLOURS.ERROR);
                break;
            case "WARN":
                ret = d3.hsl(constants_1.default.COLOURS.WARN);
                break;
            case "OK":
                ret = d3.hsl(constants_1.default.COLOURS.OK);
                break;
        }
        return ret;
    },
    "nodeSize": function nodeSize(state) {
        var ret = 12;
        switch (state) {
            case "UNKNOWN":
            case "OK":
                ret = 12;
                break;
            case "ERROR":
                ret = 20;
                break;
            case "WARN":
                ret = 15;
                break;
        }
        return ret;
    },
    fixWordLength: function (word, size, position) {
        if (!!!size) {
            size = constants_1.default.serviceNameLength;
        }
        if (!!!position) {
            position = "CENTER";
        }
        if (word.length > size) {
            return word.slice(0, (size - 1)) + "-";
        }
        else {
            var diff = size - word.length;
            var ret = word;
            var prefix = "";
            var postfix = "";
            switch (position) {
                case "CENTER":
                    var pre = Math.floor(diff / 2);
                    var post = (diff - pre);
                    if (pre.mod(2) !== 0)
                        (post = pre);
                    for (var i = 0; i < pre; i++) {
                        prefix = prefix + "_";
                    }
                    for (var i = 0; i < post; i++) {
                        postfix = postfix + "_";
                    }
                    ret = prefix + word + postfix;
                    break;
                case "PREFIX":
                    for (var i = 0; i < diff; i++) {
                        prefix = prefix + " ";
                    }
                    ret = prefix + word;
                    break;
                case "POSTFIX":
                    for (var i = 0; i < diff; i++) {
                        postfix = postfix + " ";
                    }
                    ret = word + postfix;
                    break;
                default:
                    ret = word;
                    break;
            }
            return word;
        }
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = helper;
//# sourceMappingURL=chartutils.js.map