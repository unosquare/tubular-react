'use strict';
//Export to CSV
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var isJsons = exports.isJsons = function isJsons(array) {
  return Array.isArray(array) && array.every(function (row) {
    return (typeof row === 'undefined' ? 'undefined' : _typeof(row)) === 'object' && !(row instanceof Array);
  });
};

var jsonsHeaders = exports.jsonsHeaders = function jsonsHeaders(array) {
  return Array.from(array.map(function (json) {
    return Object.keys(json);
  }).reduce(function (a, b) {
    return new Set([].concat(_toConsumableArray(a), _toConsumableArray(b)));
  }, []));
};

var jsons2arrays = exports.jsons2arrays = function jsons2arrays(jsons, headers) {
  headers = headers || jsonsHeaders(jsons);

  var headerLabels = headers;
  var headerKeys = headers;
  if (isJsons(headers)) {
    headerLabels = headers.map(function (header) {
      return header.label;
    });
    headerKeys = headers.map(function (header) {
      return header.key;
    });
  }

  var data = jsons.map(function (object) {
    return headerKeys.map(function (header) {
      return header in object ? object[header] : '';
    });
  });
  return [headerLabels].concat(_toConsumableArray(data));
};

var joiner = exports.joiner = function joiner(data) {
  var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ',';
  return data.map(function (row, index) {
    return row.map(function (element) {
      return "\"" + element + "\"";
    }).join(separator);
  }).join('\n');
};

var jsons2csv = exports.jsons2csv = function jsons2csv(data, headers, separator) {
  return joiner(jsons2arrays(data, headers), separator);
};

var toCSV = exports.toCSV = function toCSV(data, headers, separator) {
  if (isJsons(data)) return jsons2csv(data, headers, separator);
  throw new TypeError('Data should be a "String", "Array of arrays" OR "Array of objects" ');
};

var buildURI = exports.buildURI = function buildURI(data, uFEFF, headers, separator) {
  return encodeURI('data:text/csv;charset=utf-8,' + (uFEFF ? '\uFEFF' : '') + toCSV(data, headers, separator));
};