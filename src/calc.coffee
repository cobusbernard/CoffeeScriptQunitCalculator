#Class to contain a row's data and perform operations.
class @CalculationRow
  constructor: (@lineNumber, @operator, @values) ->
  calculate: () ->
    switch(@operator)
      when "SUM" then go sum
      when "MIN" then go min
      when "MAX" then go max
      when "AVERAGE" then go average

  sum: () ->
    return @values.reduce(t, s) -> t + s
  min: () ->
    return @values.reduce(t, s) -> Math.min(t, s)
  max: () ->
    return @values.reduce(t, s) -> Math.max(t, s)
  average: () ->
    return (@values.reduce(t, s, 0) -> t += s) / @values.length


#Sets text to uppercase and tries to validate the input pattern.
@validateInput = (inputString) -> 
  validRegex = /// (
    \d\#-        #Starting number followed by #-
    (\bSUM\b     #The SUM operator
    |\bAVERAGE\b #The AVERAGE operator
    |\bMIN\b     #The MIN operators
    |\bMAX\b)    #The MAX operator
    :            #Colon between the operator and input list
    (\s*\d+)(,\s*\d+\s*)* #Comma seperated integer list
    )
  ///
  return (!!inputString && validRegex.test(inputString.toUpperCase()))

#Removes the whitespace and changes string to uppercase.
@stripWhiteSpaceAndChangeToUpper = (inputString) ->
  return inputString.replace /^\s+|s+$/g, ""

#The linebreak regex is from: www.unicode.org.
@parseInputText = (inputString) ->
  rows = inputString.match(/\r\n|[\n\v\f\r\x85\u2028\u2029]/)
  
  