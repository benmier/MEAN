var Header = React.createClass({
	render: function(){
 		return React.createElement('nav', {style: {border: "1px solid black"}}, 
 			React.createElement('ul',null,
 				React.createElement(ListItemWithLink,{name: "home"}),
 				React.createElement(ListItemWithLink,{name: "Logout"}),
 				React.createElement(ListItemWithLink,{name: "About Me"})
 			)
 		)
 	}
});

var NinjaComponent = React.createElement('div',null,
	React.createElement(NinjaTitle, { title: 'React Ninja'}),
	React.createElement(NinjaTitle, { title: 'Angular Ninja'}),
	React.createElement(NinjaTitle, { title: 'Backbone Ninja'}),
	React.createElement(NinjaTitle, { title: 'jQuery Ninja'})
)
ReactDOM.render(NinjaComponent, document.getElementById('react-container'));