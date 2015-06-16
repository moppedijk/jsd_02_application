// TODO: create class!!!

var hostname = "http://api.artsholland.com";

var week = 6048e5;
var duration = week * 2;

var xsdDateTime = function(date) {
  function pad(n) {
	 var s = n.toString();
	 return s.length < 2 ? '0'+s : s;
  };

  var yyyy = date.getFullYear();
  var mm   = pad(date.getMonth()+1);
  var dd   = pad(date.getDate());

  return yyyy + '-' + mm + '-' + dd; // +'T' +hh +':' +mm2 +':' +ss;
}


var parseSPARQLResults = function(data) {
	var results = [];
	
	// if (data) blablaba check check
	var vars = data.head.vars;  		
  for (var i = 0; i < data.results.bindings.length; i++) {
		var binding = data.results.bindings[i];			
		var result = {};
    for (var j = 0; j < vars.length; j++) {
			var key = vars[j];
      if (binding[key]) {
			  var value = binding[key].value;
			  result[key] = value;
      }
		}
		results.push(result);			
	}
	return results;
};

var executeSPARQL = function(sparql, callback) {
  $.getJSON(hostname + "/sparql.json?callback=?", {
      dataType: "jsonp",
      query: sparql
    },
    function(data) {
      callback(parseSPARQLResults(data));
    }
  );
};

var makeName = function(str) {
  return str.replace(/\W/g, '').toLowerCase();
};

var replaceDates = function(sparql) {
  if (sparql) {
    var dateStart = new Date();
    var dateEnd = new Date(+new Date() + duration);  
    return sparql
      .replace("??date_start", xsdDateTime(dateStart))
      .replace("??date_end", xsdDateTime(dateEnd));
  }
  return sparql;
}

var getVar = function(vari, obj) {
  if (vari && vari.charAt(0) == '?' && vari.charAt(1) == '?') {
    if (obj[vari.substring(2, vari.length)]) {
      return obj[vari.substring(2, vari.length)]
    }
  }  
  return null;
};

function quote(str) {
  return (str+'').replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
};

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(quote(find), 'g'), replace);
}

var formatDateTime = function(str) {
  if (str) {
    var regex = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})Z/;
    if (str.match(regex)) {
      //return str.replace(regex, "$3-$2-$1 $4:$5");    
      return moment(str).calendar()
    }
    
  }
  return str;
};

var replaceVars = function(str, vars) {
  if (str) {
    for (var v in vars) {
      str = replaceAll(str, "??" + v, vars[v])
    }
  }
  return str;
};

var replacePrefixes = function(str, prefixes) {
  if (str) {
    for (var prefix in prefixes) {
      var uri = prefixes[prefix];
      if (str.indexOf(uri) == 0) {
        return replaceAll(str, uri, prefix + ":");
      }
    }
  }
  return str;
};

var removePrefixes = function(sparql) {
  if (sparql) {
    return sparql.replace(/^PREFIX.*$/mg,"").trim();
  }
};

var getJSONLink = function(sparql) {
  return hostname + "/sparql.json?query=" + encodeURIComponent(sparql);
};

var getSPARQLBrowserLink = function(sparql) {
  return hostname + "/sparql?query=" + encodeURIComponent(removePrefixes(sparql)) + "&selectoutput=browse"; 
};

