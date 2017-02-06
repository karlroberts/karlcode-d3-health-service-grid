import { PWrapper, Patient, HealthStatusService, StatusHistory } from '../hs.types';

import Config from './config'

/**
 * Implement a hacky ENUM
 **/
let statemap = {};
statemap["UNFIXABLE"]    = "UNFIXABLE";
statemap["CANBEUNLET"] = "CANBEUNLET";
statemap["CANBELET"] = "CANBELET";
statemap["LET"]    = "LET";
statemap["OKAY"] = "OKAY";

let statevalues = {};
statevalues["UNFIXABLE"]    = 10000;
statevalues["CANBEUNLET"] = 1000;
statevalues["CANBELET"] = 100;
statevalues["LET"]    = 10;
statevalues["OKAY"] = 1;

export { statemap }
export { statevalues }

let statearray = [
  statemap["UNFIXABLE"],
  statemap["CANBELET"],
  statemap["LET"],
  statemap["CANBEUNLET"],
  statemap["OKAY"]
];

function enumerateState(state: string) {
  return statearray.indexOf(state);
}

function compareState(s1: string, s2: string) {
  if (enumerateState(s1) < enumerateState(s2)) {
    return -1;
  }
  if (enumerateState(s1) > enumerateState(s2)) {
    return 1;
  }
  // a must be equal to b
  return 0;
}

//assign a number to a state array, useful for doing sorting on mixed state connections
function evaluateStates(stateArray: string[]) {
  stateArray = Array.prototype.slice.call(stateArray); // coerce

  //map each state to a number then sum them up
  var total = stateArray.map(function (state, i, a) {
    return statevalues[state];
  }).reduce(function (acc, curr) {
    return acc + curr;
  });

  return total;
}


function homogeneous(statelist: string[]) {
  statelist = Array.prototype.slice.call(statelist);
  var ret = statelist.every(function(d){ return (d === statelist[0]); });  
  return ret;
}

function canonicalSort(statelist: string[]) {
  statelist = Array.prototype.slice.call(statelist);
  var ret = statelist.sort(compareState);
  return ret;
}

function arrayContains(needle: any) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = needle !== needle;
    var indexOf;

    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
      //pollyfil
        indexOf = function(needle: any) {
            var i = -1, index = -1;

            for(i = 0; i < this.length; i++) {
                var item = this[i];

                if((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }

    return indexOf.call(this, needle) > -1;
};

/** 
 * Compairs items in the old model against the new, and returns a list of items that ar in old model but no longer in the new model.
 * returns the array of items to delete
**/
function prepareDeleteFromModel(newModelKeys: any[], oldModelKeys: any[]) {
  newModelKeys = Array.prototype.slice.call(newModelKeys); //co-erce it to Array
  oldModelKeys = Array.prototype.slice.call(oldModelKeys); //co-erce it to Array
  var toDelete: string[] = []; //build up a list of connectionID's not in the new model so theuy can be deleted. 

  // look for items to delete ie can't find new connId in  in current alertModel
  oldModelKeys.forEach(function (d, i, a) {
    // fix this need to add items in selfmodel that don't exist in alertModel to toDetlete array
    if (!arrayContains.call(newModelKeys, d)) {
      toDelete.push(d);
    }

  });

  return toDelete;
};

//version filter function, removes build meta cruft from the version leaving just major.minor.patch
function filterVersion(input: string, numpointsS: string) {
    
    var re3 = /v((\.\d+){1,3}).*$/g;
  var re2 = /v((\.\d+){1,2}).*$/g;
  var re1 = /v((\.\d+){1}).*$/g;
  let numpoints: number = 0;
  
  var red = /v\.(\d+)\.(\d+)\.(\d+).*$/;
    if(!!numpoints){ numpoints = parseInt(numpointsS); } else { numpoints = 3};
    var ret = input;
    switch(numpoints) {
      case 3:
        ret = input.replace(re3, "v$1");
        break;
      case 2:
        ret = input.replace(re2, "v$1");
        break;
      case 1:
        ret = input.replace(re1, "v$1");
        break;
      default:
        ret = input.replace(re3, "v$1");
        break;
        
    }
    return ret;
  }

//Calc status from statusHistory, sliceSize is how much hist to consider. 
function nodeStatus(nodename: string, statusHistoryMap: any, sliceSize?: number) {
    if(!!!nodename) {
      console.error("nodeStatus: no node name supplied");
      return "UNKNOWN";
    }
    if(!!!statusHistoryMap) {
      console.error("nodeStatus: no node statusHistoryMap supplied");
      return "UNKNOWN";
    }
    if (!!!sliceSize) {
      sliceSize = Config.historySampleSize;
    };
    
    let hist = statusHistoryMap[nodename]
    if(!hist) {
      console.error("nodeStatus: no node statusHistory for nodename:"+nodename);
      return "UNKNOWN";
    }

    let lastReport = hist[0];
    let lastTimeStamp = lastReport.timestamp;
    let lastMillis = Date.parse(lastTimeStamp);
    let now = new Date();
    let nowMillis = now.getTime();
  
//  console.log("mmmmmmmmmmmm lastTimeStamp = " + lastTimeStamp);
//  console.log("mmmmmmmmmmmm lastMillis = " + lastMillis);
//  console.log("mmmmmmmmmmmm nowMillisst = " + nowMillis);
//  console.log("mmmmmmmmmmmm lastMillis iso = " + (new Date(lastMillis).toISOString()));
//  console.log("mmmmmmmmmmmm nowMillisst iso= " + (new Date(nowMillis).toISOString()));
  
    if(!!!lastMillis) {
      console.error("The history had no timestamp! "+ JSON.stringify(lastReport));
    }
    
    // test if status is stale
  let dateDiff = (nowMillis - lastMillis);
    if(dateDiff >= Config.TimeStampError ) {
      //side effect push new psuedo healthCheck result onto the list
      hist.unshift({
        "timestamp": now.toISOString(),
        "status": "FAIL",
        "details":"Timestamp was stale by more than " + ( Config.TimeStampError / 1000) + " seconds" 
      });
      console.debug("OLD Timestamp -> Error")
      return "ERROR";
    } else if (dateDiff >= Config.TimeStampWarn ) {
      hist.unshift({
        "timestamp": now.toISOString(),
        "status": "FAIL",
        "details":"Timestamp was stale by more than " + ( Config.TimeStampWarn / 1000) +" seconds" 
      });
      console.debug("Quite OLD Timestamp -> Warn")
      return "WARN";
    }
    
    
    if (lastReport.status === "FAIL") {
      //        console.log("node " + node.service.name + " is ERROR");
      return "ERROR";
    }

    // else count num failuers with 5 of end could use slice here?
    var lastN = hist.slice(0, sliceSize);
    //      console.error("size= " + lastN.length + "   lastN:- " + JSON.stringify(lastN));

    for (var i = 0; i < lastN.length; i++) {
      //        console.log("node " + node.service.name + " lastN[" + i + "] " + lastN[i].status);
      if (lastN[i].status === "FAIL") {
        //          console.log("node " + node.service.name + " is WARN");
        return "WARN";
      }
    }

    //      console.log("node " + node.service.name + " is OK");
    return "OK";
  }


  
  let convertPWrapperToPatientGraph = function convertPWrapperToPatientGraph (rawModel: PWrapper): any {
    let nodes: any[] = [];
    let nodeNames: string[] = [];
    let links: {"source": number,
                "target": number}[] = [];
    let statusHistoryMap = {};

    if (!rawModel || !rawModel.patients) {
      return {
        "nodes": nodes,
        "links": links,
        "statusHistoryMap": statusHistoryMap
      };
    } //nothing to show
    
//    console.log("PPPPPPPPPPPPPPPPPPPPPPPP rawmodel :---- " + JSON.stringify(rawModel));
    let patients = rawModel.patients; //coerce to array

    //sort by service name TELDVN2-123 QC 1354
    patients.sort(function(p1: Patient,p2: Patient){ return p1.name.localeCompare(p2.name); }) 
    .forEach(function (p, i, a) {
      //add p to the map or overwrite if a stub already exists
      let pIndex = nodeNames.indexOf(p.name);
      if (pIndex === -1) {
        //add it and add it to the nodes array, strip off the status History so re-rendering is not always necessary on poll if status doesn't change
        nodes.push({
          "service": {
            "name": p.name,
            "dependsOn": p.dependsOn,
            "description": p.description
          },
          "status": "FOO" //patch this after statusHistory is worked on
        });
        nodeNames.push(p.name);
        pIndex = nodeNames.indexOf(p.name); //fixup pIndex it to the correct index for use later
      } else {
        //it's already been added as a stub and pIdex is already correct so just replace the stub in nodes with p
        nodes[pIndex] = {
          "service": {
            "name": p.name,
            "dependsOn": p.dependsOn,
            "description": p.description
          },
          "status": "BAR" //patch this after statusHistory is worked on
        }
      }
      // add the stripped statusHistory to the statusHistoryMap and patch the status
      statusHistoryMap[p.name] = p.statusHistory;     
      nodes[pIndex].status = nodeStatus(p.name, statusHistoryMap) // allow default slice of 5 histories to calc it.

      //sort out p's links
      let deps = p.dependsOn;
      deps.forEach(function (dep, i, a) {
        //if dep does not yet exist in nodes add a sttub
        let depIndex = nodeNames.indexOf(dep);
        if (depIndex === -1) {
          nodes.push({
            "service": {
              "missing": true,
              "name": dep,
              "dependsOn": [],
              'description': "no description"
            },
            "status": "UNKNOWN"
          }); // add a fake so we don't have a gap in out links
          nodeNames.push(dep); //because we always push after a nodepush we are at the same index
          depIndex = nodeNames.indexOf(dep); //set it to the correct index for use later
        } else {
          // already cool so do nothing
        }
        //add the link
        links.push({
          "source": pIndex,
          "target": depIndex
        })
      });

    });

    return {
      "nodes": nodes,
      "links": links,
      //Split the status history from the data so data doesn't cause an unnecessary rerender unnecessarily
      // calculate nde status and add it to the node directly.
      "statusHistoryMap": statusHistoryMap
    };

  }


export default {
  "homogeneous": homogeneous,
  "canonicalSort": canonicalSort,
  "arrayContains": arrayContains,
  "prepareDeleteFromModel": prepareDeleteFromModel,
  "filterVersion": filterVersion,
  "evaluateStates": evaluateStates,
  "nodeStatus": nodeStatus,
  "convertPWrapperToPatientGraph": convertPWrapperToPatientGraph
};