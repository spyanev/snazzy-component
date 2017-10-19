const Q = require('q');
const elasticio = require('elasticio-node');
const messages = elasticio.messages;
const request = require('request');
const snazzy = require('./snazzy.js');

exports.process = processAction;

function processAction(msg, cfg) {

  var reply = {};

  snazzy.createSession(cfg, () => {
    if (cfg.mp_cookie) {
      var uri = `http://snazzycontacts.com/mp_contact/json_respond/address_contactperson/json_insert?mp_cookie= + ${cfg.mp_cookie}`;
      request.post(uri, {
          json: msg.body,
          headers: {
            'X-API-KEY': cfg.apikey
          }
        },
        (error, response, body) => {
          if (!error && response.statusCode === 200) {
            reply = body;
            emitData();
          }
        }
      );
    } else {
      console.log('ERROR: Invalid session!');
    }
  });

  function emitData(e) {
    let data = messages.newMessageWithBody(reply);
    this.emit('data', data);
  }

  function emitError(e) {
    console.log('Oops! Error occurred');
    this.emit('error', e);
  }

  function emitEnd() {
    console.log('Finished execution');
    this.emit('end');
  }

  // Q().then(emitData).fail(emitError).done(emitEnd);

}
