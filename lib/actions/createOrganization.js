"use strict";
const request = require('request-promise');
const messages = require('elasticio-node').messages;

const snazzy = require('../actions/snazzy.js');

exports.process = processAction;

function processAction(msg, cfg) {

  var reply = {};
  var self = this;

  snazzy.createSession(cfg, () => {
    if (cfg.mp_cookie) {

      let apiKey = cfg.apikey;
      let cookie = cfg.mp_cookie;
      let uri = `http://snazzycontacts.com/mp_contact/json_respond/address_company/json_insert?mp_cookie=${cookie}`;
      // let uri = 'http://snazzycontacts.com/mp_contact/json_respond/address_company/json_insert?mp_cookie=' + cfg.mp_cookie;

      let requestOptions = {
        json: msg.body,
        headers: {
          'X-API-KEY': apiKey
        }
      };

      request.post(uri, requestOptions)
        .then((res) => {
          reply = res.content;
          console.log("URI:", uri);
          emitData();
        }, (err) => {
          emitError();
        });
    }
  });

  function emitData(e) {
    let data = messages.newMessageWithBody(reply);
    self.emit('data', data);
    console.log(data);
  }

  function emitError(e) {
    console.log('Oops! Error occurred');
    self.emit('error', e);
  }
}
