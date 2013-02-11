root = exports ? this

class root.CalculateRow
  constructor: (@lineNumber, @operator, values) ->
    @values = []
    for value in (values.split ",")
      @values.push parseInt value

#Sets text to uppercase and tries to validate the input pattern.
root.validateInput = (inputString) -> 
  validRegex = /// (
    \s*\d        #Starting number,
    \s*\#        #followed by a hash,
    (\s*.\s*)?  #and a dash (that is optional).
    (\bSUM\b     #The SUM operator
    |\bAVERAGE\b #The AVERAGE operator
    |\bMIN\b     #The MIN operators
    |\bMAX\b)    #The MAX operator
    \s*:         #Colon between the operator and input list
    (\s*\-?\d+)(,\s*\d+\s*)* #Comma seperated integer list
    )
  ///
  return (!!inputString && validRegex.test(inputString.toUpperCase()))

#Removes the whitespace and changes string to uppercase.
root.stripWhiteSpaceAndChangeToUpper = (inputString) ->
  return (inputString.replace /\s+|s+$/g, "").toUpperCase().replace /\b\#([^a-zA-Z])?\b/g, "#"

#Calculates the result based on operator and input values
root.calculate = (operator, values) ->
  switch(operator)
    when "SUM" then values.reduce (t, s) -> t + s
    when "MIN" then Math.min.apply(this, values)
    when "MAX" then Math.max.apply(this, values)
    when "AVERAGE" then Math.round((values.reduce (t, s) -> t += s) / values.length)
    #Should never reach this next line.
    else return -1 

#Builds up the output
root.buildOutput = (lineNumber, operator, result) ->
  return "#{lineNumber}#:#{operator}=#{result}" 

#Splits the row into lineNumber, operator and values
root.splitRow = (row) ->
  [lineNumber, operatorValues] = (stripWhiteSpaceAndChangeToUpper row).split "#"
  [operator, values] = operatorValues.split ":"
  result = new CalculateRow(lineNumber, operator, values)
  return result

#Parses a row
root.parseRow = (row) ->
  if validateInput row
    calcRow = splitRow row
    result = calculate(calcRow.operator, calcRow.values)
    return buildOutput(calcRow.lineNumber, calcRow.operator, result)
  else
    return "Could not parse. [ #{row} ]"

#The linebreak regex is from: www.unicode.org.
root.parseInputText = (inputString) ->
  rows = inputString.split /\r\n|[\n\v\f\r\x85\u2028\u2029]/

  output = (parseRow row for row in rows).reduce (t, s) -> t + "\r\n" + s

#Sets the given text on the div
root.parseInput = (inputDivName, outputDivName) ->
   inputString = (root.document.getElementById inputDivName).value
   (root.document.getElementById outputDivName).value = (root.parseInputText inputString)