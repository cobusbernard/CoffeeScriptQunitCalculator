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
  ok( inputRow.calculate() == 10, "Passed!");
});


/*
test( "", function() {  
});
*/
