"use strict";
const request = require('request-promise');
const messages = require('elasticio-node').messages;

const snazzy = require('../actions/snazzy.js');

exports.process = processTrigger;

function processTrigger(msg, cfg) {

  let contacts = [];
  let self = this;

  snazzy.createSession(cfg, () => {

    let apiKey = cfg.apikey;
    // let uri = `https://snazzycontacts.com/mp_contact/json_respond/address_contactperson/json_mainview?address_contactperson_search=${cfg.search}&mp_cookie=${cfg.mp_cookie}`;
    let uri = 'https://snazzycontacts.com/mp_contact/json_respond/address_contactperson/json_mainview?mp_cookie=' + cfg.mp_cookie;

    let requestOptions = {
      json: {
        max_hits: 100,
        print_address_data_only: 1
      },
      headers: {
        'X-API-KEY': apiKey
      }
    };

    // request.post(uri, requestOptions)
    // .then((res) => {
    //   contacts = res.content;
    //   emitData();
    // }, (err) => {
    //   emitError();
    // });

    request.post(uri, requestOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        contacts = body.content;
        console.log('Contacts:', contacts);
        console.log("BODY:");
        console.log(JSON.stringify(body, undefined, 2));
        console.log(JSON.stringify(contacts, undefined, 2));
        emitData();
      } else {
        emitError();
      }
    });

  });

  function emitData() {

    let data = messages.newMessageWithBody({
      "persons": contacts
    });
    console.log('Emitting data: '+ JSON.stringify(data, undefined, 2));
    self.emit('data', data);
  }

  function emitError(e) {
    console.log(`ERROR: ${e}`);

    self.emit('error', e);
  }

}
