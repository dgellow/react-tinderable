# react-tinderable

## Usage

Install `react-tinderable` from npm

```
npm install react-tinderable
```

In your javascript, require `react-tinderable` and render a `Tinderable` component

```javascript
var React = require('react'),
    Tinderable = require('react-tinderable');

var data = [
  {title: '', text: '', id: '', image: ''}
];

React.render(
    <Tinderable initialCardsData={data} />,
    document.body
);
```

## Dev

Clone the repo

```
git clone git@github.com:dgellow/react-tinderable.git
cd react-tinderable
```

Install dependencies

```
npm install
```

Build JSX

```
npm run build
```

or

```
npm run watch
```

Build and run examples

```
npm run examples
```

## Author

Samuel El-Borai aka dgellow, http://webp.ch
