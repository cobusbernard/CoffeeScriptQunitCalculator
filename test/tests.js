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
    "1#-SUM: 1 , 2 , 3 "
  ];
  
  for(var i = 0; i < validInputs.length; i++) 
    ok( validateInput(validInputs[i]) == true, "Passed!" );
});

test( "Performance test", function() {  
  var startTime = new Date().getTime();

  var iterations = 100000;
  for (var i = 0; i < iterations; i++)
    validateInput("1#-SUM: 1,2,3");

  var endTime = new Date().getTime();
  var duration = (endTime - startTime);
  ok( (duration < 100), "Passed!");
});

test( "SUM operation", function() {  
  var inputRow = new CalculationRow(1, "SUM", [1, 2, 3, 4]);
  var result = inputRow.calculate();
  ok( result == 10, "Passed! [ Expected 10, was " + result + "]");
});

test( "MIN operation", function() {  
  var inputRow = new CalculationRow(1, "MIN", [1, 2, 3, 4]);
  var result = inputRow.calculate();
  ok( result == 1, "Passed! [ Expected 1, was " + result + "]");
});

test( "MAX operation", function() {  
  var inputRow = new CalculationRow(1, "MAX", [1, 2, 3, 4]);
  var result = inputRow.calculate();
  ok( result == 4, "Passed! [ Expected 4, was " + result + "]");
});

test( "AVERAGE operation - round up", function() {  
  var inputRow = new CalculationRow(1, "AVERAGE", [1, 2, 3, 4]);
  var result = inputRow.calculate();
  ok( result == 3, "Passed! [ Expected 3, was " + result + "]");
});

test( "AVERAGE operation - round down", function() {  
  var inputRow = new CalculationRow(1, "AVERAGE", [2, 3, 5]);
  var result = inputRow.calculate();
  ok( result == 3, "Passed! [ Expected 3, was " + result + "]");
});

/*
Results: append: 9ms, reduce 25ms
test( "Test speed Reduce vs Apply", function() {  

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
*/

/*
test( "", function() {  
});
*/
