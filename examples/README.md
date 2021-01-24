# Prerequisite
* html/css/javascript
* nodejs
* webpack
  * babel
* docker (optional)
* typescript (optional)

## Babel
* It is a JavaScript compiler
* It is a toolchain that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or environments
* It can convert JSX syntax
* It's main job is to turn unsupported or cutting-edge language features into ES5
* It used for both backend and frontend

### example
```javascript
// ES6 syntax
import moment from 'moment';
export default () => moment().format("YYYY Do MM");
```

into 

```javascript
// ES5 syntax
const moment = require('moment')

function getDateString() {
  const date = moment();
  return date.format("YYYY Do MM");
}
```

## Webpack
* It is frontend only
* It is a dependency analyzer and module bundler
  * It can collect all your inline CSS styles in your Javascript files and bundle them into one
  * This is also known as `minify` and `uglify`
* Webpack often runs Babel as one of its jobs

## jQuery and Bootstrap
jQuery approach from Bootstrap is very difficult to work with React since React primarily works with a Virtual DOM


