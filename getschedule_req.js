var https = require('https');

function getSchedules(user, pwd, method, callback) {
	var options = {
		host : '10.10.1.120',
		path : '/vmrest/' + method,
		method : 'GET',
		headers : { 'Content-Type' : 'application/json',
					'Accept' : 'application/json' },
		auth : user+':'+pwd,
		rejectUnauthorized: false
	};
	console.log(options.path);
	var request = https.request(options, function(response) {
		var body = '';
		// console.log(response.statusCode);
		response.on('data', function(chunk) {
			body += chunk.toString('utf8');
		});
		response.on('end', function() {
			var schedules = [];
			var scheds = JSON.parse(body);
			scheds.Schedule.forEach(function(schedule) {
				schedules.push({
					name : schedule.DisplayName,
					objectid : schedule.ObjectId
				});
			});
			callback(schedules);
		});
	});
	request.end();	
}; 
getSchedules('cucadmin','cisco,123', 'schedules', function(schedules) {
	console.log('There are ' + schedules.length + ' Schedules.');
	for (idx in schedules) {
		console.log('Schedule ' + idx +': ' + schedules[idx].name);
	}
});
