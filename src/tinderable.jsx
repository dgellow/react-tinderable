/*global require,module,setTimeout*/
var React = require('react'),
    ReactDOM = require('react-dom'),
    addons = require('react-addons'),
    Hammer = require('hammerjs'),
    merge = require('merge');

var Card = React.createClass({
    getInitialState: function() {
        return {
            initialPosition: {
                x: 0,
                y: 0
            }
        };
    },

    setInitialPosition: function() {
        var screen = document.getElementById('master-root'),
            card = ReactDOM.findDOMNode(this),

            initialPosition = {
                x: Math.round((screen.offsetWidth - card.offsetWidth) / 2),
                y: Math.round((screen.offsetHeight - card.offsetHeight) / 2)
            };

        this.setState({
            initialPosition: initialPosition
        });
    },

    componentDidMount: function() {
        this.setInitialPosition();

        window.addEventListener('resize', this.setInitialPosition);
    },

    componentWillUnmount: function() {
        window.removeEventListener('resize', this.setInitialPosition);
    },

    render: function() {
        var initialTranslate = ''.concat(
            'translate3d(',
            this.state.initialPosition.x + 'px,',
            this.state.initialPosition.y + 'px,',
            '0px)'
        );

        var style = merge({
            msTransform: initialTranslate,
            WebkitTransform: initialTranslate,
            transform: initialTranslate,
            zIndex: this.props.index,
            backgroundImage: 'url("images/' + this.props.image + '")'
        }, this.props.style);

        var classes = addons.classSet(merge(
            {
                card: true
            },
            this.props.classes
        ));

        return (
                <div style={style} className={classes}>
                <h1>{this.props.title}</h1>
                <p>{this.props.text}</p>
                </div>
        );
    }
});

var DraggableCard = React.createClass({
    getInitialState: function() {
        return {
            x: 0,
            y: 0,
            initialPosition: {
                x: 0,
                y: 0
            },
            startPosition: {
                x: 0,
                y: 0
            },
            animation: null
        };
    },

    resetPosition: function() {
        var screen = document.getElementById('master-root'),
            card = ReactDOM.findDOMNode(this);

        var initialPosition = {
            x: Math.round((screen.offsetWidth - card.offsetWidth) / 2),
            y: Math.round((screen.offsetHeight - card.offsetHeight) / 2)
        };

        var initialState = this.getInitialState();
        this.setState(
            {
                x: initialPosition.x,
                y: initialPosition.y,
                initialPosition: initialPosition,
                startPosition: initialState.startPosition
            }
        );
    },

    panHandlers: {
        panstart: function() {
            this.setState({
                animation: false,
                startPosition: {
                    x: this.state.x,
                    y: this.state.y
                }
            });
        },
        panend: function(ev) {
            var screen = document.getElementById('master-root'),
                card = ReactDOM.findDOMNode(this);

            if (this.state.x < -50) {
                this.props.onOutScreenLeft(this.props.cardId);
            } else if ((this.state.x + (card.offsetWidth - 50)) > screen.offsetWidth) {
                this.props.onOutScreenRight(this.props.cardId);
            } else {
                this.resetPosition();
                this.setState({
                    animation: true
                });
            }
        },
        panmove: function(ev) {
            this.setState(this.calculatePosition(
                ev.deltaX, ev.deltaY
            ));
        },
        pancancel: function(ev) {
            console.log(ev.type);
        }
    },

    handlePan: function(ev) {
        ev.preventDefault();
        this.panHandlers[ev.type].call(this, ev);
        return false;
    },

    handleSwipe: function(ev) {
        console.log(ev.type);
    },

    calculatePosition: function(deltaX, deltaY) {
        return {
            x: (this.state.initialPosition.x + deltaX),
            y: (this.state.initialPosition.y + deltaY)
        };
    },

    componentDidMount: function() {
        this.hammer = new Hammer.Manager(ReactDOM.findDOMNode(this));
        this.hammer.add(new Hammer.Pan({threshold: 0}));

        var events = [
            ['panstart panend pancancel panmove', this.handlePan],
            ['swipestart swipeend swipecancel swipemove',
             this.handleSwipe]
        ];

        events.forEach(function(data) {
            if (data[0] && data[1]) {
                this.hammer.on(data[0], data[1]);
            }
        }, this);

        this.resetPosition();
        window.addEventListener('resize', this.resetPosition);
    },

    componentWillUnmount: function() {
	this.hammer.stop();
	this.hammer.destroy();
	this.hammer = null;

        window.removeEventListener('resize', this.resetPosition);
    },

    render: function() {
        var translate = ''.concat(
            'translate3d(',
            this.state.x + 'px,',
            this.state.y + 'px,',
            '0px)'
        );

        var style = {
            msTransform: translate,
            WebkitTransform: translate,
            transform: translate
        };

        var classes = {
            animate: this.state.animation
        };

        return (<Card {...this.props}
                style={style}
                classes={classes}></Card>);
    }
});

var Tinderable = React.createClass({
    getInitialState: function() {
        return {
            cards: this.props.initialCardsData,
            alertLeft: false,
            alertRight: false
        };
    },

    removeCard: function(side, cardId) {
        setTimeout(function(){
            if (side === 'left') {
                this.setState({alertLeft: false});
            } else if (side === 'right') {
                this.setState({alertRight: false});
            }
        }.bind(this), 3000);

        this.setState({
            cards: this.state.cards.filter(function(c) {
                return c.id !== cardId;
            }),
            alertLeft: side === 'left',
            alertRight: side === 'right'
        });
    },

    render: function() {
        var cards = this.state.cards.map(function(c, index, coll) {
            var props = {
                cardId: c.id,
                index: index,
                onOutScreenLeft: this.removeCard.bind(this, 'left'),
                onOutScreenRight: this.removeCard.bind(this, 'right'),
                title: c.title,
                text: c.text,
                image: c.image
            };

            var component = (index === (coll.length - 1)) ?
                    DraggableCard:
                    Card;

            return React.createElement(component, props);
        }, this);

        var classesAlertLeft = addons.classSet({
            'alert-visible': this.state.alertLeft,
            'alert-left': true,
            'alert': true
        });
        var classesAlertRight = addons.classSet({
            'alert-visible': this.state.alertRight,
            'alert-right': true,
            'alert': true
        });

        return (
            <div>
                <div className={classesAlertLeft}>left</div>
                <div className={classesAlertRight}>right</div>
                <div id="cards">
                    {cards}
                </div>
            </div>
        );
    }
});

module.exports = Tinderable;
