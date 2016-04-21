var React = require('react');
var ReactDOM = require('react-dom');

var MyComponent = React.createClass({
    getInitialState: function(){
        return {
        gold: 0,
        activities: ["Welcome to Ninja Gold!"]
        }
    },
	render: function (){
	    return (
	            <div style={{margin:"20px",textAlign:"center"}}>
	                <p>Your Gold: <input readOnly value={this.state.gold} /></p>
					<div style={{border:"1px solid black",height:"150px",width:"150px",display:"inline-block",margin:"10px 20px 20px 0px",verticalAlign:"top"}}>
						<h3>Farm</h3>
						<p>(earns 10-20 golds)</p>
						<button onClick={this.farm}>Find Gold!</button>
					</div>
					<div style={{border:"1px solid black",height:"150px",width:"150px",display:"inline-block",margin:"10px 20px 20px 0px",verticalAlign:"top"}}>
						<h3>Cave</h3>
						<p>(earns 5-10 golds)</p>
						<button onClick={this.cave}>Find Gold!</button>
					</div>
					<div style={{border:"1px solid black",height:"150px",width:"150px",display:"inline-block",margin:"10px 20px 20px 0px",verticalAlign:"top"}}>
						<h3>House</h3>
						<p>(earns 2-5 golds)</p>
						<button onClick={this.house}>Find Gold!</button>
					</div>
					<div style={{border:"1px solid black",height:"150px",width:"150px",display:"inline-block",margin:"10px 20px 20px 0px",verticalAlign:"top"}}>
						<h3>Casino</h3>
						<p>(earns +/- 50 golds)</p>
						<button onClick={this.casino}>Find Gold!</button>
					</div>
					<p>Activities:</p>
					<div style={{border:"1px solid black",height:"auto",width:"300px",display:"inline-block",margin:"10px 20px 20px 0px",verticalAlign:"top"}}>{this.state.activities}</div>
	            </div>
	        )
	},
	farm: function(event){
		var reward = this.randInt(10,20)
    	this.setState({
    		gold: this.state.gold+reward,
    		activities: this.state.activities.concat(<p>Earned {reward} golds from the farm!</p>)});
	},
	cave: function(event){
    	var reward = this.randInt(5,10)
    	this.setState({
    		gold: this.state.gold+reward,
    		activities: this.state.activities.concat(<p>Earned {reward} golds from the cave!</p>)});
	},
	house: function(event){
	    var reward = this.randInt(2,5)
    	this.setState({
    		gold: this.state.gold+reward,
    		activities: this.state.activities.concat(<p>Earned {reward} golds from the house!</p>)});
	},
	casino: function(event){
	    var reward = this.randInt(-50,50)
    	this.setState({
    		gold: this.state.gold+reward,
    		activities: this.state.activities.concat(<p>Earned {reward} golds from the casino!</p>)});
	},
	randInt: function(min,max){
    	return Math.floor(Math.random()*(max-min+1)+min);
	}
});

ReactDOM.render(<MyComponent />, document.getElementById('react-container'));