'use strict';

var qs = require('qs');

function sanitizeQueryString(queryString){
  return queryString.slice(1); //remove the '?' at the beginning
}

var params = function(){
  return qs.parse(sanitizeQueryString(location.search));
};

module.exports = params;
