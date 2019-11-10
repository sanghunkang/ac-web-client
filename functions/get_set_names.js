const request = require('request');

exports.handler = function(event, context, callback) {
  let apiEndpoint = 'http://184.172.214.162:30001';
  let baseUrl = `${apiEndpoint}/getSetNames`; // TODO: URL will be changed
  let queryString = '';//`set_name=${req.query.set_name}&num_problems=${req.query.num_problems}`;
  let url = baseUrl + queryString;
  console.log(url);
  console.log(event);
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