# Changelog

## [4.2.2](https://github.com/lagunovsky/redux-react-router/compare/v4.2.0...v4.2.2)

* readme update

## [4.2.0](https://github.com/lagunovsky/redux-react-router/compare/v4.1.0...v4.2.0)

### Minor Changes

* improved compatibility with `@reduxjs/toolkit`
* `useEffect` usage fix

## [4.1.0](https://github.com/lagunovsky/redux-react-router/compare/v4.0.0...v4.1.0)

### Minor Changes

* history call as microtask by default

## [4.0.0](https://github.com/lagunovsky/redux-react-router/compare/v3.2.0...v4.0.0)

### Major Changes

* removed `enableTimeTravelling` prop, time travel is always available
* removed `store` prop, store from the context is used

### Bug Fixes

* fixed synchronization of store and history. #9 ([055fd62](https://github.com/lagunovsky/redux-react-router/commit/055fd624ae6246b31211213d96b0f86a0793040b))
