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
 		return React.createElement('div', {style: {border: "1px solid black", width:"20%", height:"100%"}}, 
 			React.createElement('ul',null,
 				React.createElement(ListItemWithLink,{name: "Link!"}),
 				React.createElement(ListItemWithLink,{name: "Link!"}),
 				React.createElement(ListItemWithLink,{name: "Link!"})
 			)
 		)
 	}
});

var Main = React.createClass({
	render: function(){
 		return React.createElement('div', {style: {border: "1px solid black", width:"80%", height:"100%"}}, 
 			React.createElement('ul',null,
 				React.createElement(ListItemWithLink,{name: "Link!"})
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
	React.createElement(Header),
	React.createElement(Sidebar),
	React.createElement(Main)
)
ReactDOM.render(NinjaComponent, document.getElementById('react-container'));