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
		<div style={{backgroundColor: "green", height:"100px", width:"900px"}}></div>
		<div style={{backgroundColor: "blue", height:"500px", width:"100px", margin:"20px 20px 0px 0px", display:"inline-block"}}></div>
		<div style={{backgroundColor: "red", height:"500px", width:"780px", display:"inline-block"}}>
			<div style={{backgroundColor: "yellow", height:"150px", width:"150px", margin:"20px", display:"inline"}}></div>
			<div style={{backgroundColor: "yellow", height:"150px", width:"150px", margin:"20px", display:"block"}}></div>
		</div>
	  </div>
	)
  }
})


ReactDOM.render(<NinjaComponent />, document.getElementById('react-container'));