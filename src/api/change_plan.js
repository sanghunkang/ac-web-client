const request = require('request');

exports.handler = function(event, context, callback) {
  // let apiEndpoint = 'http://184.172.214.162:30004';
  // let url = 'http://localhost:7004/signin'

  // // console.log(event);
  // request({
  //   url: url, 
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json',
  //     'Authorization': event.headers.authorization,
  //   }
  
  // }, (err, resToReceive, body) => {
  //   if (err) { return console.log(err); }
    
  //   // console.log(body);
    callback(null, {
      statusCode: 200,
      body: JSON.stringify('/change_plan: to be implemented'),
    });    
}
// }