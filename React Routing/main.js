var React = require('react')
var ReactDOM = require('react-dom')

// STORE EACH ROUTE'S JSX CONTENT IN VARIABLES TO STAY ORGANIZED

var List = (
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
  </ul>
)

var Image = <img src='https://metrouk2.files.wordpress.com/2013/10/ay95895977ada-lovelace-engl.jpg'/>

var Form = (
  <form>
    Name: <input type='text'/>
    <input type='submit' value='Submit'/>
  </form>
)

// Set up an object that will pin certain links to our List, Image and Form
var links = {
  home: "",
  list: List,
  image: Image,
  form: Form
}

var App = React.createClass({
    render: function (){
      console.log(this.props.route)
        // We have access to our current location as a prop! (this.props.route)

        // FIND THE CORRECT LINKS
        // Iterate through our object keys to push the links we want into an array
        var linkArray = []
        for(link in links){
          if (this.props.route !== link) { linkArray.push(link); }
        }

        // Map over the array and wrap each link value with JSX
        linkArray = linkArray.map(function(link){
          return <a key={link} href={"#"+link}>The {link.charAt(0).toUpperCase() + link.slice(1)}</a>
        });

        // Use this.props.route to find the content that should be displayed.
        var content = links[this.props.route];
        return (
          <div>
            <header>
              <h1>Ninja Router</h1>
              {linkArray}
          </header>

            <div className='content-container'>
              <h2>Your location: {this.props.route}</h2>
              {content}
            </div>
          </div>
        )
    }
})

// Set up a rendering function that we want to call everytime the location changes
function renderReactContent(){
  // Runs ReactDOM.render() and passes the current location in as a prop.
  // Uses .substr(1) to chop off #
  ReactDOM.render(<App route={location.hash.substr(1)}/>, document.getElementById('react-container'))
}

// Add a listener to the 'haschange' event, and render our content when that happens
window.addEventListener('hashchange', renderReactContent);

// Render it for the first time
renderReactContent();
