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

# Compare to Vue.js
* Vue is easy to learn and lightweight
* React is more popular and has rich package ecosystem

# Examples
[Hello world](https://github.com/HemingwayLee/sample-react-yarn)

# TODO
frontend routing

## Status of javascript
https://2019.stateofjs.com/  

## Status of tech
https://research.hackerrank.com/developer-skills/2019  
