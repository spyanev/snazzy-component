const elasticio = require('elasticio-node');
const messages = elasticio.messages;
const request = require('request-promise');
const snazzy = require('./snazzy');

exports.process = processAction;

function processAction(msg, cfg) {

  let reply = {};

  msg.body['print_address_data_only'] = 1;
  msg.body['max_hits'] = 100;

  snazzy.createSession(cfg, function() {

    const apiKey = cfg.apikey;

    var uri = `http://snazzycontacts.com/mp_contact/json_respond/address_contactperson/json_mainview?mp_cookie=${cfg.mp_cookie}`;

    var requestOptions = {
      uri: uri,
      json: msg.body,
      headers: {
        'X-API-KEY': apiKey
      }
    };

    request.post(requestOptions, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        reply = body;
        emitData();
      } else if (error) {
        emitError();
      }
    });

    function emitData() {
      var data = messages.newMessageWithBody(reply);
      this.emit('data', data);
    }

    function emitError(e) {
      console.log('Error occurred!');
      this.emit('error', e);
    }

  });
}
