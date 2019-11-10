const request = require('request');

exports.handler = function(event, context, callback) {
  let apiEndpoint = 'http://184.172.214.162:30001';
  let query = event.queryStringParameters;

  let baseUrl = `${apiEndpoint}/getProblems?`; // TODO: URL will be changed
  let queryString = `set_name=${query.set_name}&num_problems=${query.num_problems}`;
  let url = baseUrl + queryString;
  console.log(url);
  request(url, { json: true }, (err, resToReceive, body) => {
    if (err) { return console.log(err); }
    
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(body),
    });
  });
}