root = exports ? this

#Class to contain a row's data and perform operations.
class root.CalculationRow
  constructor: (@lineNumber, @operator, @values) ->
  calculate: () ->
    switch(@operator)
      when "SUM" then @sum()
      when "MIN" then @min()
      when "MAX" then @max()
      when "AVERAGE" then @average()
#      else -1

  sum: () ->
    return (@values.reduce (t, s) -> t + s)
  min: () ->
    Math.min.apply(this, @values)
  max: () ->
    Math.max.apply(this, @values)
  average: () ->
    Math.round((@values.reduce (t, s) -> t += s) / @values.length)


#Sets text to uppercase and tries to validate the input pattern.
root.validateInput = (inputString) -> 
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
root.stripWhiteSpaceAndChangeToUpper = (inputString) ->
  return inputString.replace /^\s+|s+$/g, ""

#The linebreak regex is from: www.unicode.org.
root.parseInputText = (inputString) ->
  rows = inputString.match(/\r\n|[\n\v\f\r\x85\u2028\u2029]/)
  
  