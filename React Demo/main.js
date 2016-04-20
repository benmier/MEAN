var React = require('react');
var ReactDOM = require('react-dom');

var NinjaTitle = React.createClass({
 render: function(){
    return <h1>{this.props.title}</h1>
 }
});


var NinjaComponent = React.createClass({
  render: function(){
    return (
      <div>
        <NinjaTitle title='React Ninja'/>
        <NinjaTitle title='Angular Ninja'/>
        <NinjaTitle title='Backbone Ninja'/>
        <NinjaTitle title='jQuery Ninja'/>
      </div>
    )
  }
})


ReactDOM.render(<NinjaComponent />, document.getElementById('react-container'));