/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);