var React = require('react');
var ReactDOM = require('react-dom');

var NinjaTitle = React.createClass({
 render: function(){
  return <h1>{this.props.title}</h1>;
 }
});

var NinjaComponent = React.createElement('div',
    null,
    React.createElement(NinjaTitle, { title: 'React Ninja'}),
    React.createElement(NinjaTitle, { title: 'Angular Ninja'}),
    React.createElement(NinjaTitle, { title: 'Backbone Ninja'}),
    React.createElement(NinjaTitle, { title: 'jQuery Ninja'})
    )
ReactDOM.render(NinjaComponent, document.getElementById('react-container'));