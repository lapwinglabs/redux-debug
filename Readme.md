
# redux-debug

  [debug()](https://github.com/tj/debug/) as redux middleware. Similar to [redux-logger](https://github.com/fcomb/redux-logger/), but works both on the server and in the client.

  ![img](https://cldup.com/-bY7fA8ljK.png)

## Installation

```
npm install redux-debug
```

## Usage

```js
var Debug = require('redux-debug')
var debug = require('debug')('redux')

var Store = Redux.compose(
  Redux.applyMiddleware(Debug(debug))
)(Redux.createStore)
```

## API

### `Debug(fn, options)`

This middleware usually takes a `debug` but can take any sprintf-compatible function.

```js
Redux.applyMiddleware(Debug(console.log))
```

Available options include:

- `collapsed` (default: false): Collapse the state transitions

## FAQ

- My logs aren't showing up!

If you're using debug, you'll need to pass the `DEBUG=...` environment variable. If you're
in the browser, you'll need to set `localStorage.DEBUG='...'`.

## License

MIT
