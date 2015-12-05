/*
 *	Api get venues via sparql resquest
*/

Router.route( "/api/sparql/venues", { where: "server" } )
	.get( function() {

		// NodeJS request/response objects
		var request = this.request;
		var response = this.response;

		// Params
		var params = this.params;
		// Todo, encode locality before query, no spaces needed
		var locality = params.query.locality;

		// Sparql variables
		var sparqlEndpoint = "http://api.artsholland.com/sparql" + ".json" + "?callback=?";

		// Prefix declarations, for abbreviating URIs
		var prefixes = "";
			prefixes += "PREFIX ah: <http://purl.org/artsholland/1.0/> ";
			prefixes += "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> ";
			prefixes += "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> "
			prefixes += "PREFIX owl: <http://www.w3.org/2002/07/owl#> ";
			prefixes += "PREFIX dc: <http://purl.org/dc/terms/> ";
			prefixes += "PREFIX foaf: <http://xmlns.com/foaf/0.1/> ";
			prefixes += "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> ";
			prefixes += "PREFIX time: <http://www.w3.org/2006/time#> ";
			prefixes += "PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#> ";
			prefixes += "PREFIX vcard: <http://www.w3.org/2006/vcard/ns#> ";
			prefixes += "PREFIX osgeo: <http://rdf.opensahara.com/type/geo/> "; 
			prefixes += "PREFIX bd: <http://www.bigdata.com/rdf/search#> ";
			prefixes += "PREFIX search: <http://rdf.opensahara.com/search#> ";
			prefixes += "PREFIX fn: <http://www.w3.org/2005/xpath-functions#> ";
			prefixes += "PREFIX gr: <http://purl.org/goodrelations/v1#> ";
			prefixes += "PREFIX gn: <http://www.geonames.org/ontology#> ";

		// Dataset definition, stating what RDF graph(s) are being queried
		// FROM ah
		var datasetDefinition = "";

		// A result clause, identifying what information to return from the query
		// SELECT 
		var resultClause = "";
			resultClause += "SELECT DISTINCT ";
			resultClause += "?venue ";
			resultClause += "?title ";
			resultClause += "$description ";
			resultClause += "$openingHours ";
			resultClause += "$cidn ";
			resultClause += "$shortdescription ";
			resultClause += "$telephone ";
			resultClause += "$publictransportation ";
			resultClause += "$geolat ";
			resultClause += "$geolong ";
			resultClause += "$homepage ";

		// The query pattern, specifying what to query for in the underlying dataset
		// WHERE
		var queryPattern = "";
			queryPattern += "WHERE { ";
			queryPattern += "?venue a ah:Venue . ";
			queryPattern += "?venue dc:title ?title . ";
			queryPattern += "?venue ah:locationAddress ?address . ";
			queryPattern += "?venue dc:description ?description . ";
			queryPattern += "?venue ah:openingHours ?openingHours . ";
			queryPattern += "?address vcard:locality \"Amsterdam\" . ";
			queryPattern += "?venue ah:cidn $cidn . ";
			queryPattern += "?venue ah:shortDescription $shortdescription . ";
			queryPattern += "?venue ah:telephone $telephone . ";
			queryPattern += "?venue ah:publicTransportInformation $publictransportation . ";
			queryPattern += "?venue geo:lat $geolat . ";
			queryPattern += "?venue geo:long $geolong . ";
			queryPattern += "?venue foaf:homepage $homepage ";
			queryPattern += "FILTER (langMatches(lang(?title), \"nl\")) ";
			queryPattern += "} ";

		// Query modifiers, slicing, ordering, and otherwise rearranging query results
		// LIMIT 25
		var queryModifiers = "";
			queryModifiers += "ORDER BY ?venue ";
			queryModifiers += "LIMIT 100 ";

		// Concat varibles to sparqlQuery
		var sparqlQuery = prefixes + datasetDefinition + resultClause + queryPattern + queryModifiers;

		// Headers
		var contentTypeHeader = "application/x-www-form-urlencoded";
		var acceptHeader = "application/sparql-results+json";

		/*
			Do a GET to sparql and encoding the sparql query 
			in the query parameter.
		*/

		try {
			var result = HTTP.get( sparqlEndpoint, {
				params: {
					query: sparqlQuery
				},
				headers: {
					"Content-Type": contentTypeHeader,
					"Accept": acceptHeader
				}
			}, function( error, result ) {
				response.writeHead( 200, { "Content-Type": "application/json" } );

				// Error handling
				if(error)
					response.write( JSON.stringify( error ) );

				// Result
				if(result) {
					// Parse Sparql result
					var resultSet = parseSparqlResult( result )

					// Send response to client
					response.write( JSON.stringify( resultSet ) );
				}

				// End response object
				response.end();
			});

		} catch ( e ) {
			// Return response to client
			response.write( JSON.stringify( e ) );
			response.end();
		}
	});

/*
 * 	Custom Api functions
 *	Create the perfect object for the client
 * 	Helpers
*/

var parseSparqlResult = function( result ) {

	var resultSet = result.data.results.bindings;
	var resultObj = [];

	for( var i = 0 ; i < resultSet.length ; i++ ) {
		resultObj.push( { 
			title: 					resultSet[ i ].title.value,
			description: 			resultSet[ i ].description.value,
			venue: 					resultSet[ i ].venue.value,
			openinghours: 			resultSet[ i ].openingHours.value,
			cidn: 					resultSet[ i ].cidn.value,
			shortdescription: 		resultSet[ i ].shortdescription.value,
			telephone: 				resultSet[ i ].telephone.value,
			publictransportation: 	resultSet[ i ].publictransportation.value,
			geolat: 				resultSet[ i ].geolat.value,
			geolong: 				resultSet[ i ].geolong.value,
			homepage: 				resultSet[ i ].homepage.value
		} );
	}

	return resultObj;
}

/**
 *	Build sparql query
 *	Function that get's an object with all the
 *	details for building the right query string
 */

var buildSparqlQuery = function ( object ) {

	var sparqlQuery = "";

	return sparqlQuery;
}


