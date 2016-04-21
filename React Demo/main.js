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
        return {
        name: 'Janel',
        age: 28,
        occupation: 'Musician'
        }
    },
	render: function (){
	    return (
	            <div>
	                <p>Name: <input /> ({this.state.name})</p>
	                <p>Age: <input /> ({this.state.age})</p>
	                <p>Occupation: <input /> ({this.state.occupation})</p>
	            </div>
	        )
	}
});

ReactDOM.render(<MyComponent />, document.getElementById('react-container'));