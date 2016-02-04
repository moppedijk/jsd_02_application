/* ==========================================================================
 *
 *	Get Cycles server route
 * 
 ========================================================================== */

Router.route( "/api/cycles", { where: "server" } ).get( function() {

	// NodeJS request/response objects
	var params = this.params.query;
	var request = this.request;
	var response = this.response;

	try {
		HTTP.get( 'http://www.veiligstallen.nl/veiligstallen.xml', {}, fetchCyclesComplete );
	} catch ( error ) {
		errorResponse( error );
	}

	function fetchCyclesComplete(error, response) {
	    if(error) {
	    	errorResponse( error );
	    } else {
	        xml2js.parseString( response.content, {
	        	explicitArray: false, 
	        	emptyTag: undefined
	        	}, xmlToJsComplete
	    	);
		};
	}

	function xmlToJsComplete(error, result) {
	    if( error ){
	    	errorResponse( error );
	    } else {
	    	findObjectsByLocality( result );
	    };
	};

	function findObjectsByLocality( result ) {
		var result = result.Fietsenstallingen.Fietsenstalling;
		var resultObj = [];

		for(var i = 0; i < result.length; i++) {
			if(result[i].Plaats) {
				// Check if locality and city are the same
				if(cleanUpString(params.city) === cleanUpString(result[i].Plaats)) {
					resultObj.push(result[i]);
				}
			}
		};

		if(resultObj.length > 0) {
			// Response content-type is JSON
	  		response.writeHead(200, {'Content-type': 'application/json'});
	  		// Response write
			response.write( JSON.stringify( refactorObjectKeys(resultObj) ));
			// Response end
			response.end();
		} else {
			errorResponse({
				message: "Something went wrong, no matiching id found"
			});
		};
	};

	function cleanUpString( string ) {
		return string.toLowerCase().replace(/\-/g,' ');
	}
});

/* ==========================================================================
 *
 *	Get Cycles ID server route
 * 
 ========================================================================== */

Router.route( "/api/cycles/:id", { where: "server" } ).get( function() {
	// Get params
	var cycleId = this.params.id;
	var request = this.request;
	var response = this.response;

	try {
		HTTP.get( 'http://www.veiligstallen.nl/veiligstallen.xml', {}, fetchCyclesComplete );
	} catch ( error ) {
		errorResponse( error );
	}

	function fetchCyclesComplete(error, response) {
	    if(error) {
	    	errorResponse( error );
	    } else {
	        xml2js.parseString( response.content, {
	        	explicitArray: false, 
	        	emptyTag: undefined
	        	}, xmlToJsComplete
	    	);
		};
	}

	function xmlToJsComplete(error, result) {
	    if( error ){
	    	errorResponse( error );
	    } else {
	    	findObjectById( result );
	    };
	};

	function findObjectById( result ) {
		var result = result.Fietsenstallingen.Fietsenstalling;
		var resultObj = [];

		for(var i = 0; i < result.length; i++) {
			if(result[i].ID == cycleId) {
				resultObj.push(result[i]);
			}
		}

		if(resultObj.length > 0) {
			// Response content-type is JSON
	  		response.writeHead(200, {'Content-type': 'application/json'});
	  		// Response write
			response.write( JSON.stringify( refactorObjectKeys(resultObj) ));
			// Response end
			response.end();
		} else {
			errorResponse({
				message: "Something went wrong, no matiching id found"
			});
		};
	};
});

/* ==========================================================================
 *
 *	Helper functions
 * 
 ========================================================================== */

// Refactor Object Keys
function refactorObjectKeys (result) {
	var resultObj = [];

	// Loop trought results in result
	for(var i = 0; i < result.length; i++) {
		var cycleObj = {};

		// Beheerder
		if (result[i].Beheerder) {
			cycleObj.administrator = result[i].Beheerder;
		} else {
			cycleObj.administrator = false;
		}
		
 		// BeheerderContact
 		if (result[i].BeheerderContact) {
			cycleObj.administratorContact = result[i].BeheerderContact;
		} else {
			cycleObj.administratorContact = false;
		}

		// CapaciteitFiets
 		if (result[i].CapaciteitFiets) {
			cycleObj.capacityBike = result[i].CapaciteitFiets;
		} else {
			cycleObj.capacityBike = false;
		}

		// CapaciteitTotaal
		if (result[i].CapaciteitTotaal) {
			cycleObj.capacityTotal = result[i].CapaciteitTotaal;
		} else {
			cycleObj.capacityTotal = false;
		}

		// Coordinaten
		if (result[i].Coordinaten) {
			var coordinates = result[i].Coordinaten;
			var string = coordinates.split(/,/);

			cycleObj.coordinates = string;
		} else {
			cycleObj.coordinates = false;
		}

		// Gemeente
		if (result[i].Gemeente) {
			cycleObj.congregation = result[i].Gemeente;
		} else {
			cycleObj.congregation = false;
		}

		// ID
		if (result[i].ID) {
			cycleObj.id = result[i].ID;
		} else {
			cycleObj.id = false;
		}

		// Naam
		if (result[i].Naam) {
			cycleObj.name = result[i].Naam;
		} else {
			cycleObj.name = false;
		}

		// Openingstijden
		if (result[i].Openingstijden) {
			cycleObj.openinghours = result[i].Openingstijden;
		} else {
			cycleObj.openinghours = false;
		}

		// Plaats
		if (result[i].Plaats) {
			cycleObj.city = result[i].Plaats;
		} else {
			cycleObj.city = false;
		}

		// Postcode
		if (result[i].Postcode) {
			cycleObj.zipcode = result[i].Postcode;
		} else {
			cycleObj.zipcode = false;
		}

		// Stationsstalling
		if (result[i].Stationsstalling) {
			cycleObj.stationHousing = result[i].Stationsstalling;
		} else {
			cycleObj.stationHousing = false;
		}

		// Straat
		if (result[i].Straat) {
			cycleObj.street = result[i].Straat;
		} else {
			cycleObj.street = false;
		}

		// Toegangscontrole
		if (result[i].Toegangscontrole) {
			cycleObj.accesControl = result[i].Toegangscontrole;
		} else {
			cycleObj.accesControl = false;
		}

		// Type
		if (result[i].Type) {
			cycleObj.type = result[i].Type;
		} else {
			cycleObj.type = false;
		}

		// Url
		if (result[i].Url) {
			cycleObj.homepage = result[i].Url;
		} else {
			cycleObj.homepage = false;
		}

		// Verwijssysteem
		if (result[i].Verwijssysteem) {
			cycleObj.referral = result[i].Verwijssysteem;
		} else {
			cycleObj.referral = false;
		}

		// Voorzieningen
		if (result[i].Voorzieningen) {
			cycleObj.services = result[i].Voorzieningen;
		} else {
			cycleObj.services = false;
		}

		resultObj.push(cycleObj);
	}

	// Check if new object is not empty
	if(resultObj.length > 0) {
		return resultObj;
	} else {
		return false;
	}
}

function errorResponse ( error ) {
	// Response content-type is JSON
	response.writeHead(200, {'Content-type': 'application/json'});
	// Response write
    response.write( JSON.stringify( error ));
    // Response end
	response.end();
}