import { select, Selection } from 'd3-selection';
import { transition, Transition } from 'd3-transition';
import * as D3 from 'd3';

import * as mytypes from '../hs.types';

import constants from './constants';
import utils from '@karlcode/d3-utils';
import chartutils from './chartutils';

// import shims from '../utils/polyfill/index'

let bestSquareTiles = utils.geometry.bestSquareTiles;
let shims = utils.polyfill



export function statusRings() {
  var prettyEmpty = constants.ft.emptyDataPretty;
  let width = 100, // default width
    height = 100, // default height
    num = 0, // which pie on the page are we?
    w = 1024, //number of internal units
    h = 768,
    data: mytypes.Graph  = {
      nodes: [],
      links: []
    }; //default empty data array // empty signifies no doublefalted connections

    // if we want to get typy should be Selection<SVGSVGElement, any, null, undefined>;
  let svg: Selection<SVGSVGElement, any, null, undefined> = undefined;
  
  

  let my = <mytypes.ChartFunction<d3.Selection<SVGSVGElement, any, null, undefined>, mytypes.Graph, any, void>> function my(placeholder: d3.Selection<SVGSVGElement, any, null, undefined>, thedata: mytypes.Graph, dispatch: D3.Dispatch<any> ): void  {
    // generate chart here, using `width` and `height`
    //NB width and height are really just the aspe, ct ratio
    // real size is forced by outer div. viewport scales it.
    // so width and height can be used to internally scale stuff.

    //data.meta contains meta data such as was the data sorted what direction and was it filtered by the user?
    // allprofiles is an array of allprofile names applied before they get filtered out
    // { filteredBy: profile, sortedBy: id||name||status, sortRevOrder: true||false, allprofiles: [profilenames]}
    var dataMetadata = (!!thedata.meta) ? thedata.meta : {};
    //Only overwrtie data if some is provided.
    if (!!thedata) {
      //nb slicing it rips the metadata off
      // data.nodes = Array.prototype.slice.call(thedata.nodes);
      data.nodes = thedata.nodes;
      //TODO we only use nodes for this chart not links or history map.. so we could arrange for the directive to just send nodes.
      // data.links = Array.prototype.slice.call(thedata.links);
      data.links = thedata.links;


    }

    //helper to lookup by name
    var nodeByNameMap = {}
    var nodenames: string[] = []
    data.nodes.forEach(function (d, i, a) {
      //      console.log("node: = "+JSON.stringify(d))
      nodeByNameMap[d.service.name] = d;
      nodenames.push(d.service.name);
    })



    //initialize position of all nodes
    //    data.nodes.forEach(function (n, i, a) {
    //      n.x = (w / 2);
    //      n.y = (h / 2);
    //    })


    //If we have no data then there are no faults... so create fake data that can be used to display a 
    //Happy display rather than an empty table
    //    if(data.length === 0) {
    //      
    //      array.length == 0
    //      
    //    }

    var metaTableDiv = {};
    if (!!placeholder) {
      svg = placeholder;   
    }

    svg.classed("healthoverviewdiag", true)
      // .attr("xmlns", "http://www.w3.org/2000/svg").attr("version","1.1")
      // .attr("viewBox", "0 0 " + w + " " + h)
      // .attr("preserveAspectRatio", "xMidYMin meet")
      .attr("shape-rendering", "geometricPrecision")
      //    .attr("width", width)
      //    .attr("height", height);

    var defs = svg.append('defs');

    defs.append("filter").attr("id", "B1")
      .append("feGaussianBlur").attr("stdDeviation", 3)

    //invisible font calulation stuff
    //----------------------------------
    var invisnode = svg.append("text").attr("x", w / 2).attr("y", 10 /* h / 2 */ ).text("M")
      .style("visibility", "hidden")
      .attr("font-size", "1em")
      .style("font-family", "'Didact Gothic', sans-serif")
      .attr("fill", "white")

    //  theSVG.select("body").select("#invisitext1").node();

    var invisnodeNode = <Element>invisnode.node()
    var bbox = invisnodeNode.getBoundingClientRect() // .getBBox();
    var oneCharWidth = bbox.width;
    var oneCharHeight = bbox.height; // = 1em
    var widthInEm = oneCharWidth / oneCharHeight;
    var heightInEm = oneCharHeight / oneCharWidth;

    //one char width must be seventh of width
    var fsizeInEm = function (numChars: number, availWidth: number) {
        var lengthWithoutMod = numChars * oneCharWidth;
        var ret = availWidth / lengthWithoutMod;

        //        console.log("fsize ---->>>>>>>>> numChars:" + numChars + "  availWidth" + availWidth + "    fsInEm:"+ret);

        return ret;
      }
      //            var cw = scaledSize / 7
      //            var fsizeInEm = (cw * widthInEm) / 7;

    invisnode.remove();
    //-------------------------------------------


    var focusOnEnter = false;
    var numberNodes = data.nodes.length;
    var maxSquareSize = bestSquareTiles(w, h, numberNodes);
    var serviceRadius = ((maxSquareSize * 0.7) / 2);
    var dependantRingO = ((maxSquareSize * 0.9) / 2);
    var dependantRingI = ((maxSquareSize * 0.8) / 2);
    var strokeWidth = 3;


    //---------------- DISPATCHERS -------------
    dispatch.on('nodeHovered.gridChart', function (d: any, i: number, serviceName: string) {
      lights2(serviceName, true)
    });

    dispatch.on('nodeAbandoned.gridChart', function (d: any, i: number, serviceName: string) {
      lights2(serviceName, false)
    });



    //=====================
    function doBlur(isOn: boolean, fname?: string) {
      if (!!!fname) {
        fname = "#B1";
      }
      if (isOn) {
        return "url(#B1)";
      } else {
        return "none";
      }
    }

    interface NodeColourizer {
      (d: mytypes.Node): d3.ColorCommonInstance,
      darker(d: mytypes.Node): d3.ColorCommonInstance,
      lighter(d: mytypes.Node): d3.ColorCommonInstance
    }

    let colourNode = <NodeColourizer>function (d: mytypes.Node) : d3.ColorCommonInstance {
      return chartutils.colourizeNode(d.status);
    }

    colourNode.darker = function (d: mytypes.Node): d3.ColorCommonInstance {
      return this(d).darker();
    }

    colourNode.lighter = function (d: mytypes.Node): d3.ColorCommonInstance {
      return this(d).brighter();
    }

    /** 
     * Calc the xpos in the SVG of the center of the node given it's index
     * and the max size of a side and the width available
     **/
    function calcCentroidXYPos(index: number, side: number, width: number, height: number) {
      var ret = {
        "x": 0,
        "y": 0
      };
      var numX = Math.floor(width / side);
      var numY = Math.floor(height / side);
      var marginX = (width - (side * numX)) / 2;
      var marginY = (height - (side * numY)) / 2;

      var xPos = marginX + (index.mod(numX) * side) + (side / 2);
      var yPos = marginY + (Math.floor(index / numX) * side) + (side / 2);

      return {
        "x": xPos,
        "y": yPos
      };
    }


    //light on or off cirles and arcs that match the node name
    function lights2(serviceName:string, isOn: boolean) {

      var fillColour = (isOn) ? colourNode(nodeByNameMap[serviceName]) : colourNode.darker(nodeByNameMap[serviceName]);
      var strokeColour = (isOn) ? colourNode.darker(nodeByNameMap[serviceName]) : colourNode.darker(nodeByNameMap[serviceName]).darker();

      //kill all lights first to prevent Jira bug TELDVN2-138 usually there will just be the existing one,
      // but fast mouseing sometimes truncates the mousout event and leaves multple turned on
      D3.selectAll(".lit-up").each(function (d, i) {
//        console.log("----> litup <---------");
        var el = D3.select(this);
        //calc current color values of the lit-up thingy
        var fillC: D3.RGBColor = D3.rgb(el.style("fill"));
        var strokeC = D3.rgb(el.style("stroke"));
//       console.log("----> el.id"+ el.attr("id") +": fillC="+JSON.stringify(fillC)+ "r="+ fillC.r +"  :  strokeC="+strokeC)

        // set the lightsOff look //may need to create it as an rgb before applying darker()
//        el.style("fill", d3.rgb(fillC.r, fillC.g, fillC.b).darker())
        el.style("fill", fillC.darker().toString())
          .style("stroke", strokeC.darker().toString())
          .style("filter", doBlur(false))
          .classed("lit-up", false);
      })

      //light the circle add a marker class so we can turn it off on next mouseover
      D3.select("#serviceCircle_" + serviceName)
        .style("fill", fillColour.toString())
        .style("stroke", strokeColour.toString())
        .style("filter", doBlur(isOn))
        .classed("lit-up", isOn);

      //light the arcs that match the circle add a marker class so we can turn it off on next mouseover
      D3.selectAll(".serviceArc_" + serviceName)
        .style("fill", fillColour.toString())
        .style("stroke", strokeColour.toString())
        .style("filter", doBlur(isOn))
        .classed("lit-up", isOn);
    }


    // starthere karl build the full table I guess
    //    console.log("->>>>>>>>>>>>>>>> data.nodes.length is " + data.nodes.length);
    var square = svg.selectAll("g.overviewsquare").data(data.nodes);
    var squareEnter = square.enter();
    var squareExit = square.exit().remove();

    var squareG = squareEnter.append('g')
      .classed('overviewsquare', true)
      // position relative to index
      .attr("transform", function (d, i) {
        var dist = (w / numberNodes) * i;
        var posXY = calcCentroidXYPos(i, maxSquareSize, w, h);
        return "translate(" + posXY.x + ", " + posXY.y + ")"
      }) //no y motion just x

    var serviceCirc = squareG.append('circle')
    .attr("id", function (d, i) {
        return "serviceCircle_" + d.service.name;
      })
      .attr("cx", 0).attr("cy", 0)
      .attr('r', 0)
      .attr('stroke', function (d) {
        return colourNode.darker(d).darker().toString();
      })
      .attr('stroke-width', strokeWidth)
      .attr('fill', function (d) {
        return colourNode.darker(d).toString();
      })

    serviceCirc.transition()
      .delay(50)
      .duration(550)
      .attr("r", serviceRadius)





    serviceCirc.on('mouseover', function (d: mytypes.Node, i: number) {
        //this.parentNode.appendChild(this);
        D3.select(this).style("cursor", "pointer"); //we have a click event so set pointer as indicator that we can be clicked
        dispatch.call('nodeHovered', this, d, i, nodenames[i]);
      })
      .on('mouseout', function (d: mytypes.Node, i: number) {
        dispatch.call('nodeAbandoned', this, d, i, nodenames[i]);
      })
      .on('click', function (d: mytypes.Node, i: number) {
        dispatch.call('nodeClicked', this ,d, i, nodenames[i]);
      })

    /* find dependants for this node add them as arcs */
    var arcs = squareG.selectAll('path.dependant').data(function (d: mytypes.Node, j: number) {
      var deps = (!!d.service.dependsOn) ? d.service.dependsOn : [];
      // pimp each dep with knowldge of length of array
     //  deps = Array.prototype.slice.call(deps);
      var ret = deps.map(function (d, i, a) {
        return {
          "name": d,
          "dependeeIndex": j,
          "arrayLength": a.length
        }
      })
      return ret;
    })
    var arcEnter = arcs.enter();
    var arcExit = arcs.exit().remove();



    var depArc = arcEnter.append("path")
      .attr("id", function (d, i) {
        return "serviceArc_" + d.name + "_" + i;
      })
      .attr("class", function (d) {
        return "serviceArc_" + d.name;
      })
      .style("opacity", 0)
      .attr("d", function (d, i, a) {

        let padAngle = ((Math.PI / 180) * 3); //convert to deg then 3 degs

        let Arc:any = D3.arc();
          
        Arc.innerRadius(dependantRingI)
          .outerRadius(dependantRingO)
          .startAngle((i * (Math.PI * 2)) / d.arrayLength) //converting from degs to radians
          .endAngle(((i + 1) * (Math.PI * 2)) / d.arrayLength) //just radians
          .padAngle(padAngle)

        return Arc()
      })
      .attr('stroke', function (d) {
        return colourNode.darker(nodeByNameMap[d.name]).darker().toString();
      })
      .attr('stroke-width', strokeWidth)
      .attr('fill', function (d: {name: string, dependeeIndex: number, arrayLength:number}) {
        return colourNode.darker(nodeByNameMap[d.name]).toString();
      })

    depArc.transition().delay(550).duration(250).style("opacity", 1);

    depArc.on('mouseover', function (d: {name: string, dependeeIndex: number, arrayLength:number}, i:number) {
        D3.select(this).style("cursor", "pointer"); //we have a click event so set pointer as indicator that we can be clicked
        dispatch.call('nodeHovered', this, d, i, d.name);
      })
      .on('mouseout', function (d: {name: string, dependeeIndex: number, arrayLength:number}, i:number) {
        dispatch.call('nodeAbandoned', this, d, i, d.name)
      })
      .on('click', function (d: {name: string, dependeeIndex: number, arrayLength:number}, i:number) {
        dispatch.call('nodeClicked', this, d, i, d.name);
      })


    //---------------- TEXT LABLES
    var serviceLabel = squareG.append('text')
      .attr("dy", "0.35em")
      .style("text-anchor", "middle")
      .style("opacity", 0)

    .attr("x", function (d: mytypes.Node) {
        //        return ((w / currentStatusArray.length) / 2)
        return 0;
      })
      .attr("y", 0)
      .text(function (d: mytypes.Node) {
        var sname = d.service.name;
        return (!!sname) ? chartutils.fixWordLength(sname, constants.serviceNameLength) : chartutils.fixWordLength("??", constants.serviceNameLength);
      })
      .attr("font-family", "sans-serif")
      .attr("font-size", function (d, i, a) {
        //        var sname = d.service.name;
        //        sname = (!!sname) ? sname : "??";
        //        var tlen = chartutils.fixWordLength(sname, constants.serviceNameLength).length;
        var tlen = constants.serviceNameLength;
        //                    console.log("time - " + d.data.time + " tlen=" + tlen);
        // num chars plus 1.5 at each end
        // avail is hole in middle calc chord given offset innerRadius
        //        var emsize = fsizeInEm((tlen ), ( sqserviceRadius * 2));
        var emsize = fsizeInEm((tlen), (dependantRingO * 2));

        return "" + emsize + "em";
      })
      .attr('fill', 'white')


    serviceLabel.transition().delay(550).duration(250).style("opacity", 1);


    serviceLabel.on("mouseover", function (d, i, a) {
        D3.event.stopPropagation();
        D3.select(this).style("cursor", "pointer")

        dispatch.call('nodeHovered',this, d, i, d.service.name, "#serviceCircle_" + i); //hack to keep lights on in circle
      })
      .on('click', function (d: mytypes.Node, i: number) {
        D3.event.stopPropagation();
        dispatch.call('nodeClicked',this, d, i, d.service.name);
      })


    //Add default data if no data, be sure to set back to this in remove too
    if (data.nodes.length === 0 && prettyEmpty) {
      //no data so draw a happy thing
      //       console.log("MNMNMNMNMN draw a happy thing")
      //      alertTableBody.append("tr")
      //        .attr("class", chartutils.classifySeverity(["OKAY"]))
      //        .append("td")
      //        .classed("align-center", true)
      //        .attr("colspan", 4)
      //        .html("No Double-Faulted Connections&nbsp;<span class=\"glyphicon glyphicon-thumbs-up\"></span>");

      return; // break out before you remove everything
    }


  } //end function my

  // ================
  // == chart API ===
  // ================
  my.width = function (value?: number) {
    if (!arguments.length) return width;
    width = value;
    height = width;
    return my;
  };

  my.height = function (value) {
    if (!arguments.length) return height;
    height = value;
    return my;
  };

  my.num = function (value) {
    if (!arguments.length) return num;
    num = value;
    return my;
  };

  my.data = function (value) {
    if (!arguments.length) return data;
    data = value;
    return my;
  };

  return my;
}; // end alertChartTableFunc
