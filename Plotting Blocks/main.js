var React = require('react');
var ReactDOM = require('react-dom');

var NinjaComponent = React.createClass({
 -  render: function(){
   -  return (
   -    <div>
   -    <div style={{backgroundColor: "green", height:"100px", width:"900px", marginBottom:"20px"}}></div>
   -    <div style={{backgroundColor: "blue", height:"500px", width:"100px", marginRight:"20px", display:"inline-block"}}></div>
   -    <div style={{backgroundColor: "red", height:"500px", width:"780px", display:"inline-block", verticalAlign:"top"}}>
   -      <div style={{backgroundColor: "yellow", height:"225px", width:"225px", margin:"20px 0px 20px 20px", display:"inline-block"}}></div>
   -      <div style={{backgroundColor: "yellow", height:"225px", width:"225px", margin:"20px 0px 20px 20px", display:"inline-block"}}></div>
   -      <div style={{backgroundColor: "yellow", height:"225px", width:"225px", margin:"20px 0px 20px 20px", display:"inline-block"}}></div>
   -      <div style={{backgroundColor: "purple", height:"150px", width:"720px", margin:"20px 0px 20px 20px", display:"inline-block"}}></div>
   -    </div>
   -    </div>
   -  )
 -  }
 })


ReactDOM.render(<NinjaComponent />, document.getElementById('react-container'));