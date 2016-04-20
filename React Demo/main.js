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

var Sidebar = React.createClass({
	render: function(){
 		return React.createElement('div', {style: {border: "1px solid black", width:"50px", height:"100%"}}, 
 			React.createElement('ul',null,
 				React.createElement(ListItemWithLink,{name: "home"}),
 				React.createElement(ListItemWithLink,{name: "Logout"}),
 				React.createElement(ListItemWithLink,{name: "About Me"})
 			)
 		)
 	}
});

var ListItemWithLink = React.createClass({
	render: function(){
		return React.createElement('li', null,
			React.createElement("a", {href: ""}, this.props.name)
		)
	}
});

var NinjaComponent = React.createElement('div',null,
	React.createElement(Header);
	React.createElement(Sidebar);
)
ReactDOM.render(NinjaComponent, document.getElementById('react-container'));