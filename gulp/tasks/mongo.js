
module.exports = function() {
	var exec = require('child_process').exec;

		exec('mongod --config /usr/local/etc/mongod.conf', function (err, stdout, stderr) {
			console.log(stdout);
			console.log(stderr);
			exec('mongo --eval "use admin; db.shutdownServer();"', function (err, stdout, stderr) {
				console.log(stdout);
				console.log(stderr);
			});
		});
	
};
