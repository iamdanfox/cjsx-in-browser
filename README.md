CJSX In Browser
===============

[**Try it out on CodePen**][1]

Let's say you just want to try out CoffeeScript.  You can send some coffeescript files to the browser, include coffee-script.js and they magically compile and run.

What if you just want to try CJSX?  **Now you can**:

```html
<script type="text/cjsx">
MyApp = React.createClass
  getInitialState: ->
    woo: 'nah'

  doSomething: ->
    @setState woo: 'yeah'

  render: ->
    <div>
      <h3>Hello, world!</h3>
      <div>Woo {@state.woo}</div>
      <button onClick={@doSomething}>Do something awesome</button>
    </div>

React.renderComponent <MyApp />, document.documentElement
</script>
<script type="text/javascript" src="http://fb.me/react-0.11.1.js"></script>
<script type="text/javascript" src="cjsx-in-browser.js"></script>
```

Magical Chrome source maps
--------------------------

 - **Source maps:**  When something pops up in your console, just click the line number and you'll see the original line of CJSX you wrote.
You won't need to wade through the mess of double compiled code. Magic.

 - **All compiler outputs:** let's say you're debugging, and you want to see what your CJSX actually got compiled into.  In the Chrome inspector 'Resources' tab, hit Cmd-P and you can open all the sources you need:
   - Original source: hit Cmd-P and type `cjsx0` (0 gets the first embedded script on your page, 1 gets the next, etc)
   - Coffee-React transformer output: open `cjsx0_transformed`
   - Fully compiled output: open `cjsx0_compiled`


[1]: http://codepen.io/iamdanfox/pen/oywJq?editors=100
