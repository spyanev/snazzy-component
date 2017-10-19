var request = require('request');

exports.createSession = function(cfg, continueOnSuccess) {
    var token;
    var apiKey = cfg.apiKey;
    var email = cfg.email;
    var password = cfg.password;
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
                cfg['mp_cookie'] = body['content']['mp_cookie'];
                console.log('Cookie:' + cfg['mp_cookie']);
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
