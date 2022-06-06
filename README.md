# Key features

* It can be used as a base in the development of `single-page` or `mobile applications`
* React applications usually require the use of additional libraries for routing (e.g., React Router)
* `Components`: React code is made of Components. They can be rendered to a particular element in the DOM
  * `Functional components` and `Class-based components`
  * We should use functional components if we are writing a presentational component which doesn’t have its own state or needs to access a lifecycle hook. [Ref](https://djoech.medium.com/functional-vs-class-components-in-react-231e3fbd7108)
* `Virtual DOM`: React creates an in-memory cache, computes the resulting differences, and then updates the browser's displayed DOM (The `reconciliation` process)
  * It allows us to write code as if the entire page is rendered on each change, while the React libraries only render subcomponents that actually change. This selective rendering provides a performance boost
* `Lifecycle methods` (e.g., `shouldComponentUpdate`, `componentDidMount`, `render`, ...)
* `JSX` (or JavaScript XML): It is an extension to the JavaScript language syntax (like XHP for PHP in Facebook)
* `React hooks`: They are functions that let developers "hook into" React state and lifecycle features from function components
* `Flux architecture`: To support unidirectional data flow (contrasted with AngularJS's bidirectional flow), the Flux architecture represents an alternative to the popular MVC architecture

# Sending request
* [build-in fetch vs axios](https://blog.logrocket.com/axios-vs-fetch-best-http-requests/)

# Compare to Vue.js
* Vue is easy to learn and lightweight
* React is more popular and has rich package ecosystem

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

# Examples
[Hello world](https://github.com/HemingwayLee/sample-react-yarn)

## Status of javascript
https://2019.stateofjs.com/  

## Status of tech
https://research.hackerrank.com/developer-skills/2019 

