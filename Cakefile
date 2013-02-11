fs     = require 'fs'
{exec} = require 'child_process'

appFiles  = [
  # omit src/ and .coffee to make the below lines a little shorter
  'calc'
]

task 'build', 'Build single application file from source files', ->
  console.log 'Build start ...'
  appContents = new Array remaining = appFiles.length
  exec 'cp src/calc.html build/', (err, stdout, stderr) ->
    throw err if err
    console.log stdout + stderr
  for file, index in appFiles then do (file, index) ->
    fs.readFile "src/#{file}.coffee", 'utf8', (err, fileContents) ->
      throw err if err
      appContents[index] = fileContents
      process() if --remaining is 0
  process = ->
    fs.writeFile 'build/calc.coffee', appContents.join('\n\n'), 'utf8', (err) ->
      throw err if err
      exec 'coffee --compile build/calc.coffee', (err, stdout, stderr) ->
        throw err if err
        console.log stdout + stderr
        fs.unlink 'build/calc.coffee', (err) ->
          throw err if err
          console.log 'Build done.'
task 'minify', 'Minify the resulting application file after build', ->
  console.log 'Minify start...'
  exec 'java -jar "lib/compiler.jar" --js build/calc.js --js_output_file dist/calc.min.js', (err, stdout, stderr) ->
    throw err if err
    console.log stdout + stderr
    console.log 'Minify done.'
