(function(){

  var coffeeReactTransform = require('coffee-react-transform')
  var CoffeeScript = require('coffee-script')

  var scripts = document.querySelectorAll("script[type='text/cjsx']");
  for (var i=0;i < scripts.length; i++){

    var originalCJSX = scripts[i].innerHTML;
    var coffee = coffeeReactTransform(originalCJSX);
    compilerResult = CoffeeScript.compile(coffee, {
      sourceMap: true
    });

    function sourceMapComment(sourceMap) {
      sourceMap.sources[0] = "embedded_cjsx_" + i;
      sourceMap.sourcesContent = [originalCJSX];
      base64 = btoa(JSON.stringify(sourceMap));
      var datauri = 'data:application/json;charset=utf-8;base64,' + base64;
      return "\n//@ sourceMappingURL=" + datauri;
    }

    var v3SourceMap = JSON.parse(compilerResult.v3SourceMap);
    eval(compilerResult.js + sourceMapComment(v3SourceMap));
  }

})();
