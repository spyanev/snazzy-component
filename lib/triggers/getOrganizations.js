"use strict";
const request = require('request-promise');
const messages = require('elasticio-node').messages;

const snazzy = require('../actions/snazzy.js');

exports.process = processTrigger;

function processTrigger(msg, cfg) {

  let organizations = [];
  let self = this;

  snazzy.createSession(cfg, () => {

    let apiKey = cfg.apikey;
    let uri = `http://snazzycontacts.com/mp_contact/json_respond/address_compnay/json_mainview?address_company_search=${cfg.search}&mp_cookie=${cfg.mp_cookie}`;

    let requestOptions = {
      json: true,
      headers: {
        'X-API-KEY': apiKey
      }
    };

    request.post(uri, requestOptions)
      .then((res) => {
        organizations = res.content;
        emitData();
      }, (err) => {
        emitError();
      });
  });

  function emitData() {

    let data = messages.newMessageWithBody({
      "organizations": organizations
    });
    console.log('Emitting data: ' + JSON.stringify(data, undefined, 2));
    self.emit('data', data);
  }

  function emitError(e) {
    console.log(`ERROR: ${e}`);
    self.emit('error', e);
  }
}
