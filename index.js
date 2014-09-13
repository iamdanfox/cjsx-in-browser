(function(){

  var coffeeReactTransform = require('coffee-react-transform')
  var CoffeeScript = require('coffee-script')

  function sourceMapComment(originalCJSX, transformedCJSX, sourceMap, fileName) {
    sourceMap.sources = [fileName, fileName + "_transformed"];
    sourceMap.sourcesContent = [originalCJSX, transformedCJSX];

    var base64 = btoa(JSON.stringify(sourceMap));
    var dataUri = 'data:application/json;charset=utf-8;base64,' + base64;

    return "\n//@ sourceMappingURL=" + dataUri;
  }

  function processCJSX (originalCJSX) {
    var coffee = coffeeReactTransform(originalCJSX);
    var compilerResult = CoffeeScript.compile(coffee, {
      sourceMap: true
    });
    var v3SourceMap = JSON.parse(compilerResult.v3SourceMap);

    eval(compilerResult.js + sourceMapComment(originalCJSX, coffee, v3SourceMap, "cjsx_" + i));
  }

  var scripts = document.querySelectorAll("script[type='text/cjsx']");
  for (var i = 0; i < scripts.length; i++){
    processCJSX(scripts[i].innerHTML);
  }

})();
