var React = require('react');
var ReactDOM = require('react-dom');

// var Block = React.createClass({
//  render: function(){
//     return <div></div>
//  }
// });


var NinjaComponent = React.createClass({
  render: function(){
    return (
      <div>
        <div style={{backgroundColor: "blue"}}></div>
      </div>
    )
  }
})


ReactDOM.render(<NinjaComponent />, document.getElementById('react-container'));