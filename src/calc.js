// Generated by CoffeeScript 1.4.0
(function() {
  var root;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.CalculateRow = (function() {

    function CalculateRow(lineNumber, operator, values) {
      var value, _i, _len, _ref;
      this.lineNumber = lineNumber;
      this.operator = operator;
      this.values = [];
      _ref = values.split(",");
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        value = _ref[_i];
        this.values.push(parseInt(value));
      }
    }

    return CalculateRow;

  })();

  root.validateInput = function(inputString) {
    var validRegex;
    validRegex = /(\s*\d\s*\#(\s*.\s*)?(\bSUM\b|\bAVERAGE\b|\bMIN\b|\bMAX\b)\s*:(\s*\-?\d+)(,\s*\d+\s*)*)/;
    return !!inputString && validRegex.test(inputString.toUpperCase());
  };

  root.stripWhiteSpaceAndChangeToUpper = function(inputString) {
    return (inputString.replace(/\s+|s+$/g, "")).toUpperCase().replace(/\b\#([^a-zA-Z])?\b/g, "#");
  };

  root.calculate = function(operator, values) {
    switch (operator) {
      case "SUM":
        return values.reduce(function(t, s) {
          return t + s;
        });
      case "MIN":
        return Math.min.apply(this, values);
      case "MAX":
        return Math.max.apply(this, values);
      case "AVERAGE":
        return Math.round((values.reduce(function(t, s) {
          return t += s;
        })) / values.length);
      default:
        return -1;
    }
  };

  root.buildOutput = function(lineNumber, operator, result) {
    return "" + lineNumber + "#:" + operator + "=" + result;
  };

  root.splitRow = function(row) {
    var lineNumber, operator, operatorValues, result, values, _ref, _ref1;
    _ref = (stripWhiteSpaceAndChangeToUpper(row)).split("#"), lineNumber = _ref[0], operatorValues = _ref[1];
    _ref1 = operatorValues.split(":"), operator = _ref1[0], values = _ref1[1];
    result = new CalculateRow(lineNumber, operator, values);
    return result;
  };

  root.parseRow = function(row) {
    var calcRow, result;
    if (validateInput(row)) {
      calcRow = splitRow(row);
      result = calculate(calcRow.operator, calcRow.values);
      return buildOutput(calcRow.lineNumber, calcRow.operator, result);
    } else {
      return "Could not parse. [ " + row + " ]";
    }
  };

  root.parseInputText = function(inputString) {
    var output, row, rows;
    rows = inputString.split(/\r\n|[\n\v\f\r\x85\u2028\u2029]/);
    return output = ((function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = rows.length; _i < _len; _i++) {
        row = rows[_i];
        _results.push(parseRow(row));
      }
      return _results;
    })()).reduce(function(t, s) {
      return t + "\r\n" + s;
    });
  };

  root.parseInput = function(inputDivName, outputDivName) {
    var inputString;
    inputString = (root.document.getElementById(inputDivName)).value;
    return (root.document.getElementById(outputDivName)).value = root.parseInputText(inputString);
  };

}).call(this);
