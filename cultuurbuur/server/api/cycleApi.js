Router.route( "/api/cycle", { where: "server" } )
	.get( function() {

		// NodeJS request/response objects
		var request = this.request;
		var response = this.response;

		// Response content-type is JSON
		var headers = {'Content-type': 'application/json'};
      	response.writeHead(200, headers);

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
		                    	// console.log("typof jsResult", typeof jsResult);
		                    	response.write( JSON.stringify( jsResult ));
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

var parseResult = function (result) {

	var resultObj = result.Fietsenstallingen;
	var responseObj = [];

	for(var i = 0; i < 10; i++) {
		var cycleHousing = resultObj[i];

		// Filter!

		responseObj.push(cycleHousing);
	}

	return responseObj;
}
