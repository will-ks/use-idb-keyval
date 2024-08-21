# useIdbKeyval

[idb-keyval](https://github.com/jakearchibald/idb-keyval) is a lightweight promise-based keyval store implemented with IndexedDB.

useIdbKeyval is a react hook wrapping idb-keyval.

## Installation

`yarn add @will-ks/use-idb-keyval`

## Usage

```tsx
// Set a value
const [setFoo, { loading, error, isSet }] = useIdbKeyvalMutation('myKey')
setFoo(true)

// Retrieve a value
const [foo, { loading, error }] = useIdbKeyvalQuery<boolean>('myKey', [isSet])
```
