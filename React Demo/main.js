// create a new h1 element
var h1Element = document.createElement("h1");
// add content to the element
var myContent = document.createTextNode("JavaScript Ninja");
h1Element.appendChild(myContent); // add the text node to the newly created h1
// Finally, grab an element from the DOM and add our newly created element
document.getElementById('non-react-container').appendChild(h1Element);


// Create an h1 element, passing null as the second parameter since we aren't adding properties, and the text
// "React Ninja" as the new element's child.
var reactComponent = React.createElement('h1', null, 'React Ninja');
// Next use ReactDOM.render() to place the element to a location in the DOM.
ReactDOM.render(reactComponent, document.getElementById('react-container'));

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