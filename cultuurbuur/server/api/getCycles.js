/* ==========================================================================
 *
 *	Get Cycles server route
 * 
 ========================================================================== */

Router.route( "/api/cycles", { where: "server" } ).get( function() {

	// NodeJS request/response objects
	var request = this.request;
	var response = this.response;

	// Get params
	var params = this.params.query;

	// Response content-type is JSON
  	response.writeHead(200, {'Content-type': 'application/json'});

	try {
		var result = HTTP.get( 'http://www.veiligstallen.nl/veiligstallen.xml', {},
        	function(xmlError, xmlResponse){
                if(xmlError){
                    response.write( JSON.stringify( xmlError ));
                }else{
                    xml2js.parseString(xmlResponse.content, {
                    	explicitArray: false, 
                    	emptyTag: undefined
                    }, function (jsError, jsResult) {
	                    if( jsError ){
	                        response.write( JSON.stringify( jsError ));
	                    }else {
	                    	// Store data in session
	                    	var parsedResult = parseResult( jsResult, params );

	                    	if(parsedResult) {
	                    		response.write( JSON.stringify( parsedResult ));
	                    	} else {
	                    		response.write( JSON.stringify( {
	                    			message: "Something went wrong..."
	                    		} ))
	                    	}
	                    }
                	});
            	}
            	response.end();
            }
    	);

	} catch ( e ) {
		// Return response to client
		response.write( JSON.stringify( e ) );
		response.end();
	}
});

/* ==========================================================================
 *
 *	Get Cycles ID server route
 * 
 ========================================================================== */

Router.route( "/api/cycles/:id", { where: "server" } ).get( function() {

	// NodeJS request/response objects
	var request = this.request;
	var response = this.response;

	// Get params
	var id = this.params.id;

	// Response content-type is JSON
  	response.writeHead(200, {'Content-type': 'application/json'});

	try {
		var result = HTTP.get( 'http://www.veiligstallen.nl/veiligstallen.xml', {},
        	function(xmlError, xmlResponse){
                if( xmlError ) {
                    response.write( JSON.stringify( xmlError ));
                }else{
                    xml2js.parseString(xmlResponse.content, {
                    	explicitArray: false, 
                    	emptyTag: undefined
                    }, function (jsError, jsResult) {
	                    if( jsError ){
	                        response.write( JSON.stringify( jsError ));
	                    }else {
	                    	// // Store data in session
	                    	// var parsedResult = parseResult( jsResult, params );

	                    	// if(parsedResult) {
	                    	// 	response.write( JSON.stringify( parsedResult ));
	                    	// } else {
	                    	// 	response.write( JSON.stringify( {
	                    	// 		message: "Something went wrong..."
	                    	// 	} ))
	                    	// }
	                    }
                	});
            	}
            	response.end();
            }
    	);

	} catch ( e ) {
		// Return response to client
		response.write( JSON.stringify( e ) );
		response.end();
	}

});

/* ==========================================================================
 *
 *	Helper functions
 * 
 ========================================================================== */

var parseResult = function (result, params) {

	// Result object and response object
	var resultObj = result.Fietsenstallingen.Fietsenstalling;
	var responseObj = [];

	// Get part of Array and slice in new Array
	var subObj = resultObj;

	// Get locality from params transform to lowercase and remove -
	var locality = params.city.toLowerCase().replace(/\-/g,' ');

	// Loop trought results in subObj
	for(var i = 0; i < subObj.length; i++) {
		var cycleObj = {};

		// Check if result object has a city
		if(subObj[i].Plaats) {

			// to lower case and remove -
			var city = subObj[i].Plaats.toLowerCase().replace(/\-/g,' ');

			// Check if locality and city are the same
			if(locality === city) {

				// Beheerder
				if (subObj[i].Beheerder) {
					cycleObj.administrator = subObj[i].Beheerder;
				} else {
					cycleObj.administrator = false;
				}
				
		 		// BeheerderContact
		 		if (subObj[i].BeheerderContact) {
					cycleObj.administratorContact = subObj[i].BeheerderContact;
				} else {
					cycleObj.administratorContact = false;
				}

				// CapaciteitFiets
		 		if (subObj[i].CapaciteitFiets) {
					cycleObj.capacityBike = subObj[i].CapaciteitFiets;
				} else {
					cycleObj.capacityBike = false;
				}

				// CapaciteitTotaal
				if (subObj[i].CapaciteitTotaal) {
					cycleObj.capacityTotal = subObj[i].CapaciteitTotaal;
				} else {
					cycleObj.capacityTotal = false;
				}

				// Coordinaten
				if (subObj[i].Coordinaten) {
					var coordinates = subObj[i].Coordinaten;
					var string = coordinates.split(/,/);

					cycleObj.coordinates = string;
				} else {
					cycleObj.coordinates = false;
				}

				// Gemeente
				if (subObj[i].Gemeente) {
					cycleObj.congregation = subObj[i].Gemeente;
				} else {
					cycleObj.congregation = false;
				}

				// ID
				if (subObj[i].ID) {
					cycleObj.id = subObj[i].ID;
				} else {
					cycleObj.id = false;
				}

				// Naam
				if (subObj[i].Naam) {
					cycleObj.name = subObj[i].Naam;
				} else {
					cycleObj.name = false;
				}

				// Openingstijden
				if (subObj[i].Openingstijden) {
					cycleObj.openinghours = subObj[i].Openingstijden;
				} else {
					cycleObj.openinghours = false;
				}

				// Plaats
				if (subObj[i].Plaats) {
					cycleObj.city = subObj[i].Plaats;
				} else {
					cycleObj.city = false;
				}

				// Postcode
				if (subObj[i].Postcode) {
					cycleObj.zipcode = subObj[i].Postcode;
				} else {
					cycleObj.zipcode = false;
				}

				// Stationsstalling
				if (subObj[i].Stationsstalling) {
					cycleObj.stationHousing = subObj[i].Stationsstalling;
				} else {
					cycleObj.stationHousing = false;
				}

				// Straat
				if (subObj[i].Straat) {
					cycleObj.street = subObj[i].Straat;
				} else {
					cycleObj.street = false;
				}

				// Toegangscontrole
				if (subObj[i].Toegangscontrole) {
					cycleObj.accesControl = subObj[i].Toegangscontrole;
				} else {
					cycleObj.accesControl = false;
				}

				// Type
				if (subObj[i].Type) {
					cycleObj.type = subObj[i].Type;
				} else {
					cycleObj.type = false;
				}

				// Url
				if (subObj[i].Url) {
					cycleObj.homepage = subObj[i].Url;
				} else {
					cycleObj.homepage = false;
				}

				// Verwijssysteem
				if (subObj[i].Verwijssysteem) {
					cycleObj.referral = subObj[i].Verwijssysteem;
				} else {
					cycleObj.referral = false;
				}

				// Voorzieningen
				if (subObj[i].Voorzieningen) {
					cycleObj.services = subObj[i].Voorzieningen;
				} else {
					cycleObj.services = false;
				}

				responseObj.push(cycleObj);
			}
		}
	}

	// Check if new object is empty
	if(responseObj.length < 0) {
		return false;
	} else {
		return responseObj;
	}

	return false;
}
