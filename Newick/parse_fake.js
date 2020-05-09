var i 			= 0,
	imax 		= BioTreeContainer.length,
	targetObj 	= {},
	tempObj 	= {},
	tempArr		= [],
	tempId		= '',
	tempType	= '',
	tempName	= '',
	tempParent	= '',
	tempDiverge	= '';

for(;i<imax;i++){
	tempObj = BioTreeContainer[i];
	
	tempId 		= tempObj["id"];
	tempParent 	= ( (!tempObj["parent"] && tempObj["parent"] !== 0) ? "none" : tempObj["parent"]);
	tempType	= tempObj["features"][0].split(" ")[0];
	if(tempType === "NODE"){
		tempName = tempObj["features"][0].split(" ")[1]*1;
	}
	else{
		tempName = tempObj["features"][0].split("/")[0].split(".")[1] || tempObj["features"][0];
		tempType = "submission";
	}
	tempDiverge	= tempObj["features"][1]*1;
	
	targetObj[tempId] 				= {};
	targetObj[tempId]["id"] 		= tempId;
	targetObj[tempId]["type"] 		= tempType;
	targetObj[tempId]["name"] 		= tempName;
	targetObj[tempId]["parent"] 	= tempParent;
	targetObj[tempId]["divergence"] = tempDiverge;
	targetObj[tempId]["total_divergence"] = tempDiverge;
}

function returnParentInfo(parentId){
	var thisDivergence = targetObj[parentId]["divergence"];

	if(targetObj[parentId]["parent"] && targetObj[parentId]["parent"] !== "none"){
		thisDivergence += returnParentInfo(targetObj[parentId]["parent"]);
	}

	return thisDivergence;
}

var j;
for(j in targetObj){
	if(targetObj[j]["parent"] && targetObj[j]["parent"] !== "none"){
		targetObj[j]["total_divergence"] += returnParentInfo(targetObj[j]["parent"]); 
	}
}

var k;
for(k in targetObj){
	tempArr.push(targetObj[k]); 
}


function flatToHierarchy (flat) { // adapted from https://stackoverflow.com/questions/31383869/converting-flat-structure-to-hierarchical

    var roots = {} // things without parent

    // make them accessible by name on this map
    var all = {}

    flat.forEach(function(item) { 
      all[item.id] = item;
    })

    // connect kid to its parent, and split roots apart
    Object.keys(all).forEach(function (id) {
        var item = all[id]
        if (item.parent === "none") {
            roots[id] = item;
        } else if (item.parent in all) {
            var p = all[item.parent]
            if (!('Kids' in p)) {
                p.Kids = {};
            }
            p.Kids[id]=item;
        }
    })

    // done!
    return roots;
}

var parentChildRelationships = flatToHierarchy(tempArr);
// console.log(parentChildRelationships);


function buildHTML(prevParent, aParent, depth, sequence){
	var readyMadeHTML 	= '',
		h 				= '',
		tempName 		= '',
		totalDivergence	= 0,
		avgDivergence	= 0,
		count4diverge	= 0,
		runTotal4div	= 0,
		forSequence		= '',
		commaForSequence= '',
		cleanedSequence = '';
	/*
	// I am afraid that this little bundle of dipshittery is based on a total misunderstanding of how the branches work...
	// ... node to node to node in the branching of the mutations, not node to location to node to new location :(
	
	for(h in prevParent){
		
		if(prevParent[h]['name'] && !Number.isInteger(prevParent[h]['name']*1)){
			forSequence += commaForSequence + prevParent[h]['name'];
			commaForSequence = ', ';
		}
		
		if(prevParent[h]['name'] && !Number.isInteger(prevParent[h]['name']*1)){
			runTotal4div += prevParent[h]['total_divergence'];
			count4diverge++;
		}
	}
	
	if(forSequence !== ''){
		forSequence = '	<span style="color:red; font-weight:900;">(</span>' + forSequence + '<span style="color:red; font-weight:900;">)</span>';
	}
	
	avgDivergence = runTotal4div/count4diverge || 0;
	
	
	*/
	for(h in aParent){
		tempName = aParent[h]['name'];
		totalDivergence = aParent[h]['total_divergence'];
		readyMadeHTML += ( (!tempName  || Number.isInteger(tempName*1) ) ? '' : '<p style="font-size:' + (24-depth/2) + 'px; padding-left:' + (3*depth) + 'px;">' /*+ sequence + ' to ' */ + tempName + ': ' + totalDivergence + /*, and then to at least one other place in the world.*/ '</p>');
		if(aParent[h].Kids){
			readyMadeHTML += buildHTML(aParent, aParent[h].Kids, depth+1, /*sequence + forSequence + ": " + avgDivergence + */ ( (!tempName || Number.isInteger(tempName*1)) ? '' : tempName) );
		}
	}
	
	return readyMadeHTML;
}
var htmlForPage = '';

htmlForPage += buildHTML('', parentChildRelationships, 1, "nature");

document.body.innerHTML = htmlForPage;