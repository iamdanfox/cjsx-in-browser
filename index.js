var coffeeReactTransform = require('coffee-react-transform')
var CoffeeScript = require('coffee-script')

var scripts = document.querySelectorAll("script[type='text/cjsx']");
for (var i=0;i < scripts.length; i++){
  scripts[i].setAttribute("type","text/javascript");
  scripts[i].innerHTML = CoffeeScript.compile(coffeeReactTransform(scripts[i].innerHTML));
}

