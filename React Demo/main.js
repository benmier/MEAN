var React = require('react');
var ReactDOM = require('react-dom');

var NinjaButton = React.createClass({
    render: function (){
        return <button onClick={this.myFunction}></button>
    },
    myFunction: function(){
        alert('Hello!')
    }
});

var MyComponent = React.createClass({
    getInitialState: function(){
        return {}
    },
    render: function (){
        return <div></div>
    }
})

ReactDOM.render(<NinjaButton />, document.getElementById('react-container'));