test( "Single row input tests", function() {
  //Positive asserts
  var validInputs = [
    "1#-SUM: 1",
    "1#-AVERAGE: 1",
    "1#-MIN: 1",
    "1#-MAX: 1",
    "1#-SUM:1,2,3",
    "1#-SUM: 1,2,3",
    "1#-SUM: 1, 2, 3",
    "1#-SUM: 1 , 2 , 3 ",
    "1#-SUM:1,-2,3",
    " 1 # - SUM : 1 , 2 , 3 ",
    "1#SUM: 1",
    "1#+SUM: 1",
    "1# SUM: 1"
  ];
  
  for(var i = 0; i < validInputs.length; i++) 
    ok( validateInput(validInputs[i]) == true, "Passed!" );
});

test( "SUM operation", function() {  
  var result = calculate("SUM", [1, 2, 3, 4]);
  ok( result == 10, "Passed! [ Expected 10, was " + result + "]");
});

test( "SUM operation - int overflow", function() {  
  var result = calculate("SUM", [ Number.MAX_VALUE, 200000]);
  var expected = Number.MAX_VALUE + 200000;
  ok( result == expected, "Passed! [ Expected " + expected + ", was " + result + "]");
});

test( "MIN operation - positive", function() {  
  var result = calculate("MIN", [1, 2, 3, 4]);
  ok( result == 1, "Passed! [ Expected 1, was " + result + "]");
});

test( "MIN operation - negative", function() {  
  var result = calculate("MIN", [-1, -2, -3, -4]);
  ok( result == -4, "Passed! [ Expected -4, was " + result + "]");
});

test( "MAX operation - positive", function() {  
  var result = calculate("MAX", [1, 2, 3, 4]);
  ok( result == 4, "Passed! [ Expected 4, was " + result + "]");
});

test( "MAX operation - negative", function() {  
  var result = calculate("MAX", [-1, -2, -3, -4]);
  ok( result == -1, "Passed! [ Expected -1, was " + result + "]");
});

test( "AVERAGE operation - round up - positive", function() {  
  var result = calculate("AVERAGE", [1, 2, 3, 4]);
  ok( result == 3, "Passed! [ Expected 3, was " + result + "]");
  result = calculate("AVERAGE", [2,4,9]);
  ok( result == 5, "Passed! [ Expected 5, was " + result + "]");
});

test( "AVERAGE operation - round down - positive", function() {  
  var result = calculate("AVERAGE", [2, 3, 5]);
  ok( result == 3, "Passed! [ Expected 3, was " + result + "]");
});

test( "AVERAGE operation - round up - negative", function() {  
  var result = calculate("AVERAGE", [-1, -2, -3, -4]);
  ok( result == -2, "Passed! [ Expected -2, was " + result + "]");
  result = calculate("AVERAGE", [-2,-4,-9]);
  ok( result == -5, "Passed! [ Expected -5, was " + result + "]");
});

test( "AVERAGE operation - round down - negative", function() {  
  var result = calculate("AVERAGE", [-2, -3, -5]);
  ok( result == -3, "Passed! [ Expected -3, was " + result + "]");
});

test( "Invalid operation - round down", function() {  
  var result = calculate("AVG", [2, 3, 5]);
  ok( result == -1, "Passed! [ Expected -1, was " + result + "]");
});

test( "Remove whitespace and set to upper", function() {
  var validInputs = [
    "1#-SUM:1,2,3,4",
    "1#SuM: 1, 2, 3, 4",
    "1#+SUM: 1, 2, 3, 4",
    "1# SUM: 1, 2, 3, 4"
  ]
  
  var expected = "1#SUM:1,2,3,4";  

  for(var i = 0; i < validInputs.length; i++) 
    var result = stripWhiteSpaceAndChangeToUpper(validInputs[i]);
    ok( result == expected, 
      "Passed! [Expected: " + expected + ", was " + result);
});

test( "Split row", function() {
  var result = splitRow("1#-SUM:1,2,3");
  var expected = new CalculateRow(1, "SUM", "1,2,3");
  ok ( result.lineNumber == expected.lineNumber, 
    "Passed! [Expected: " + expected.lineNumber + ", was " + result.lineNumber + "]");
  ok ( result.operator == expected.operator, 
    "Passed! [Expected: " + expected.operator.length + ", was " + result.operator.length + "]");
  ok ( result.values.length == expected.values.length, 
    "Passed! [Expected: " + expected.values + ", was " + result.values + "]");
  ok ( result.values[0] == expected.values[0], 
    "Passed! [Expected: " + expected.values[0] + ", was " + result.values[0] + "]");
  ok ( result.values[1] == expected.values[1], 
    "Passed! [Expected: " + expected.values[1] + ", was " + result.values[1] + "]");
  ok ( result.values[2] == expected.values[2], 
    "Passed! [Expected: " + expected.values[2] + ", was " + result.values[2] + "]");
});

test( "Parse single row", function() {
  var result = parseRow("1#-SUM:1,2,3,4");
  var expected = "1#:SUM=10";
  ok( result == expected, "Passed! [Expected: " + expected + ", was " + result + "]");
});

test( "Parse single row fail", function() {
  var result = parseRow("1#-AVG:1,2,3,4");
  var expected = "Could not parse. [ 1#-AVG:1,2,3,4 ]";
  ok( result == expected, "Passed! [Expected: " + expected + ", was " + result + "]");
});

test( "Parse rows", function() {
  var result = parseInputText("1#-SUM:1,2,3,4" 
    + "\r\n" + "2#MIN:4,4,4,4" 
    + "\r\n" + "3# MAX:3,-4,5,6" 
    + "\r\n" + "4#-AVERAGE:2,4,9" 
    + "\r\n" + "5#-AVERAGE:-3,2,9");
  var expected = "1#:SUM=10" + "\r\n" + "2#:MIN=4" + "\r\n" + "3#:MAX=6" + "\r\n" + "4#:AVERAGE=5" + "\r\n" + "5#:AVERAGE=3";
  ok( result == expected, "Passed! [Expected: " + expected + ", was " + result + "]");
});

test( "Parse rows fail", function() {
  var result = parseInputText("1#-SUM:1,2,3,4" + "\r\n" + "2#-AVG:1,2,3,4" + "\r\n" + "3#-SUM:3,4,5,6");
  var expected = "1#:SUM=10" + "\r\n" + "Could not parse. [ 2#-AVG:1,2,3,4 ]" + "\r\n" + "3#:SUM=18";
  ok( result == expected, "Passed! [Expected: " + expected + ", was " + result + "]");
});

test( "Garbage input", function() {
  var result = parseInputText("asdfsd23432f:asdf:Adsf");
  var expected = "Could not parse. [ asdfsd23432f:asdf:Adsf ]";
  ok( result == expected, "Passed! [Expected: " + expected + ", was " + result + "]");
});

test( "Empty input", function() {
  var result = parseInputText("");
  var expected = "Could not parse. [  ]";
  ok( result == expected, "Passed! [Expected: " + expected + ", was " + result + "]");
});

test( "Performance test - RegEx", function() {  
  var startTime = new Date().getTime();

  var iterations = 100000;
  for (var i = 0; i < iterations; i++)
    validateInput("1#-SUM: 1,2,3");

  var endTime = new Date().getTime();
  var duration = (endTime - startTime);
  ok( (duration < 100), "Passed! [Iterations: " + iterations + " - " + duration + "ms ]");
});

test( "Performance test - Reduce vs Apply", function() {  

  var values = [];
  var iterations = 100000;
  for (var i = 0; i < iterations; i++)
    values[i] = i;

  var rStartTime = new Date().getTime();
  var rMin = values.reduce(function(t, s) {
        return Math.min(t, s);
      });
  var rEndTime = new Date().getTime();

  var aStartTime = new Date().getTime();
  var aMin = Math.min.apply(this, values);
  var aEndTime = new Date().getTime();

  var rDuration = (rEndTime - rStartTime);
  var aDuration = (aEndTime - aStartTime);

  ok( rMin == aMin, "Passed! [Reduce: " + rDuration + "ms, Apply: " + aDuration + "ms]");
});
