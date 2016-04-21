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
        <div style={{backgroundColor: "green", height:"200px"}}></div>
        <div style={{backgroundColor: "blue", height:"500px", width:"200px", margin:"20px 20px 0px 0px"}}></div>
      </div>
    )
  }
})


ReactDOM.render(<NinjaComponent />, document.getElementById('react-container'));