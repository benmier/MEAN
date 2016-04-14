
module.exports = (function() {
	return {
	// notice how index in the factory(client side) is calling the index method(server side)
		index: function(req, res) {
			res.json([{name: "Andrew", age: 24}, {name: "Michael", age: 35}]);
		}
	}
})();