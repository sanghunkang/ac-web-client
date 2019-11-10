const request = require('request');

exports.handler = function(event, context, callback) {
  let apiEndpoint = 'http://184.172.214.162:30001';
  
  // console.log(req.query);
  // console.log(req.session);
  console.log(event);
  let query = event.queryStringParameters //JSON.parse(event.queryStringParameters)

  let baseUrl = `${apiEndpoint}/getProblems?`; // TODO: URL will be changed
  let queryString = `set_name=${query.set_name}&num_problems=${query.num_problems}`;
  let url = baseUrl + queryString;
  console.log(url);
  request(url, { json: true }, (err, resToReceive, body) => {
    if (err) { return console.log(err); }
    console.log(body);
    
    // resToSend.send(JSON.stringify(body));
    callback(null, {
      statusCode: 200,
      // body: JSON.stringify({ msg: 'Hello From Functions' }),
      body: JSON.stringify(body),
    });
  });
}