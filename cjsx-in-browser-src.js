(function(){

  var coffeeReactTransform = require('coffee-react-transform')
  var CoffeeScript = require('coffee-script')

  function sourceMapComment(originalCJSX, transformedCJSX, javascript, sourceMap, fileName) {
    sourceMap.sources = [fileName, fileName + "_transformed", fileName + "_compiled"];
    sourceMap.sourcesContent = [originalCJSX, transformedCJSX, javascript];

    var base64 = btoa(JSON.stringify(sourceMap));
    var dataUri = 'data:application/json;charset=utf-8;base64,' + base64;

    return "\n//@ sourceMappingURL=" + dataUri;
  }

  function processCJSX (originalCJSX) {
    var coffee = coffeeReactTransform(originalCJSX);
    var compilerResult = CoffeeScript.compile(coffee, {
      sourceMap: true
    });
    var javascript = compilerResult.js;
    var v3SourceMap = JSON.parse(compilerResult.v3SourceMap);

    eval(javascript + sourceMapComment(originalCJSX, coffee, javascript, v3SourceMap, "cjsx" + i));
  }

  var scripts = document.querySelectorAll("script[type='text/cjsx']");
  for (var i = 0; i < scripts.length; i++){
    processCJSX(scripts[i].innerHTML);
  }

})();
