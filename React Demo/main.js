var NinjaTitle = React.createClass({
 render: function(){
  return React.createElement('h1', null, this.props.title);
 }
});

var NinjaComponent = React.createElement('div',null,
	React.createElement(NinjaTitle, { title: 'React Ninja'}),
	React.createElement(NinjaTitle, { title: 'Angular Ninja'}),
	React.createElement(NinjaTitle, { title: 'Backbone Ninja'}),
	React.createElement(NinjaTitle, { title: 'jQuery Ninja'})
)
ReactDOM.render(NinjaComponent, document.getElementById('react-container'));