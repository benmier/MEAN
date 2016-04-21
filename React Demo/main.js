var React = require('react');
var ReactDOM = require('react-dom');

var NinjaButton = React.createClass({
    render: function (){
 		var button = "Burrito"
        return <button onClick={this.myFunction} value={{button}}></button>
    },
    myFunction: function(){
        alert('Hello!')
    }
});
ReactDOM.render(<NinjaButton />, document.getElementById('react-container'));