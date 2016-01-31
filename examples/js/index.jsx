/*global require*/
var React = require('react'),
    ReactDOM = require('react-dom'),
    Tinderable = require('../../lib/tinderable.js');

var cardsData = [
    {
        title: 'A wonderful day',
        text: '—— - ——— - - - ——— ———— - — ——— —— - ————— - - ———— —— - ——— - - - ——— ———— - — ——— —— -',
        image: 'portrait-1.jpg',
        id: '1'
    },
    {
        title: 'My amazing journey',
        text: ' - — ——— —— - ————— - - ———— —— - ——— - - - ——— ———— - — ——— —— - ————— - - ——— - - - ——— ———— ',
        image: 'portrait-2.jpg',
        id: '2'
    },
    {
        title: 'Three recipes without cocoa',
        text: ' - — ——— —— - ————— - - ———— —— - ——— - - - ——— ———— - — ——— —— - ————— - - ——— - - - ———',
        image: 'portrait-3.jpg',
        id: '3'
    },
    {
        title: 'Generic clickbait title',
        text: ' —— ———— - — ——— —— - ————— - - ———— —— - ——— - - - ——— ———— - — ——— —— - ————— - - ———— —— - ——— - - - ——— ———— - — ——— —— - ————— - - ———— - ——— ',
        image: 'portrait-4.jpg',
        id: '4'
    }
];

ReactDOM.render(
    <Tinderable initialCardsData={cardsData} />,
    document.getElementById('master-root')
);
