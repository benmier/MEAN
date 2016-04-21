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
        gold: 0
        }
    },
	render: function (){
	    return (
	            <div>
	                <p>Your Gold: <input readOnly value={this.state.gold} /></p>
					<p>Age: <input onChange = {this.handleAgeChange} /> ({this.state.age})</p>
					<p>Occupation: <input onChange = {this.handleOccupationChange} /> ({this.state.occupation})</p>
	            </div>
	        )
	},
	handleNameChange: function(event){
    	this.setState({name: event.target.value});
	},
	handleAgeChange: function(event){
	    this.setState({age: event.target.value});
	},
	handleOccupationChange: function(event){
	    this.setState({occupation: event.target.value});
	}
});

ReactDOM.render(<MyComponent />, document.getElementById('react-container'));