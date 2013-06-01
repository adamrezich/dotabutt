var async = require('async');
var moment = require('moment');

exports.index = function(req, res) {
	var butt = res.locals.butt;
	res.locals.matches = {};
	res.locals.players = {}
	async.series([
		function(callback) {
			butt.getMatchCount(function(count) {
				res.locals.matches.count = count;
				callback();
			});
		},
		function(callback) {
			butt.getPlayerCount(function(count) {
				res.locals.players.count = count;
				callback();
			});
		}
	],
	function(err) {
		res.locals.matches.latest = moment(butt.lastTime.toString(), 'X');
		res.locals.matches.behind = moment(res.locals.matches.latest).fromNow(true);
		res.render('stats', { title: 'Stats', user: req.user });
	});
}