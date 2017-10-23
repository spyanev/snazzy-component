var request = require('request');

exports.createSession = function(config, continueOnSuccess) {
    var token;
    var apiKey = config.apikey;
    var email = config.email;
    var password = config.password;
    console.log('API KEY:' + apiKey);

    request.post('http://snazzycontacts.com/mp_base/json_login/login/get_token', {
        headers: {
          'X-API-KEY': apiKey
        }
      }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          var data = JSON.parse(body);
          token = data['content']['token'];
          console.log('Token:' + token);

          request.post('http://snazzycontacts.com/mp_base/json_login/login/verify_credentials', {
              json: {
                token: token,
                email: email,
                password: password
              },
              headers: {
                'X-API-KEY': apiKey
              }
            },
            function(error, response, body) {
              if (!error && response.statusCode == 200) {
                config['mp_cookie'] = body['content']['mp_cookie'];
                console.log('Cookie:' + config['mp_cookie']);
                continueOnSuccess();
              }
            }
          )
        } else if (error) {
          console.log(error);
        }
      }
    );
}
