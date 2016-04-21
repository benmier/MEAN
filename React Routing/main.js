var React = require('react')
var ReactDOM = require('react-dom')
// This file exports our array of data
var data = require('./data.js')
var NinjaList = React.createClass({
  render: function(){
    var ninjas = this.props.turtles.map(function(turtle){
      return (
        <li key={turtle.id}>
          <a>{turtle.name}</a>
        </li>
      )
    })
    return (
      <ul>
        {ninjas}
      </ul>
    )
  }
});
var NinjaComponent = React.createClass({
    render: function (){
        return (
          <div>
            <h1>Greetings Ninja!</h1>
            <h2>Click on a ninja for more information</h2>
            <NinjaList turtles={this.props.data}/>
          </div>
        )
    }
});
var NinjaDescription = React.createClass({
  render: function(){
    return(
      <div>
        <h1>Ninja Name</h1>
        <p>Ninja Description</p>
      </div>
    )
  }
});
ReactDOM.render(<NinjaComponent data={data}/>, document.getElementById('react-container'))