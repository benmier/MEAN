var Header = React.createClass({
  render: function(){
            return React.createElement('nav', {style: {border: "1px solid pink"}},
              React.createElement('ul', null,
                React.createElement(ListItemWithLink,{name:"bone"}),
                React.createElement(ListItemWithLink,{name:"logout"}),
                React.createElement(ListItemWithLink,{name:"about me"})
              )
            )
          }
});

var ListItemWithLink = React.createClass({
  render: function(){
            return React.createElement('li', null,
              React.createElement('a', {href:''}, this.props.name)
            )
          }
});

var Contact = React.createClass({
  render: function(){
            return React.createElement('div', null,
              React.createElement('p', null, 'cmead@codingdojo.com')
            )
          }
});

var FakeBlog = React.createClass({
  render: function(){
            return React.createElement('div', null,
              React.createElement(Header),
              React.createElement(Sidebar),
              React.createElement(MainContent),
              React.createElement('footer', {style :{border: "1px solid black", textAlign: "center", padding: "15px"}},
                "©2016",
                React.createElement(Contact)
              )
            )
          }
});

var MainContent = React.createClass({
  render: function(){
            return React.createElement('div', {style: {display: 'inline-block', verticalAlign: 'top', margin: "10px", padding:'15px', border: "1px solid green", width: '700px'}},
              React.createElement('h1', null, "Main Content Headline"),
              React.createElement('p', null, "Main content paragraph.")
            )
          }
});

var Sidebar = React.createClass({
  render: function(){
            return React.createElement('div', {style: {display: 'inline-block', width: "300px", margin: "10px", padding:'15px', border: "1px solid purple"}},
              React.createElement('h1', null, "Sidebar Headline"),
              React.createElement(ListItemWithLink, {name: "Sidebar link"}),
              React.createElement(ListItemWithLink, {name: "Another sidebar link"}),
              React.createElement(ListItemWithLink, {name: "Yet another sidebar link"})
            )
          }
});

ReactDOM.render(React.createElement(FakeBlog), document.getElementById('react-container'));
