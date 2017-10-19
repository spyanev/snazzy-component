# The most simple HttpComponent example

The following example demonstrates the most simple component sending a GET request to a HTTP resource. This is accomplished by defining [request](https://github.com/mikeal/request) options and passing them to ``HttpComponent.get``.    

````js
var HttpComponent = require('elasticio-node').HttpComponent;

// exporting the process function to be called by elastic.io runtime
exports.process = doProcess;

function doProcess(msg, cfg) {

    // creating requestion options
    var options = {
        url: 'http://foobarbazbarney.com/api',
        json: true
    };
    
    // sending GET request with given options
    new HttpComponent(this).get(options); 
}
````

Please note that ``HttpComponent.get`` sends a HTTP GET request. The response is checked to have a status codes ``200 OK`` or ``201 Created``. If so, the response's body will be be used as component's output. Any other status code will result in an error being thrown.

# Supported HTTP verbs

The ``HttpComponent`` class exposes function for each of the supported HTTP verbs. Currently following are supported:

* ``HttpComponent.get``: sends HTTP GET
* ``HttpComponent.post``: sends HTTP POST
* ``HttpComponent.put``: sends HTTP PUT

Here is an example of how to send a HTTP POST request:

````js
var HttpComponent = require('elasticio-node').HttpComponent;

// exporting the process function to be called by elastic.io runtime
exports.process = doProcess;

function doProcess(msg, cfg) {

    // creating requestion options
    var options = {
        url: 'http://foobarbazbarney.com/api',
        body : JSON.stringify({message : "Hello, world!"})
    };
    
    // sending GET request with given options
    new HttpComponent(this).post(options); 
}
````

# Headers

HTTP Headers for the request can be set in the options object:

    // creating requestion options
    var options = {
        url: 'http://foobarbazbarney.com/api',
        json : {message : "Hello, world!"},
        headers: {
            'Authorization': 'Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==',
            'Accept-Charset': 'utf-8',
            'User-Agent': 'Mozilla/5.0'
        }
    };

# Overriding the success handler

````js
var elasticio = require('elasticio-node');
var HttpComponent = elasticio.HttpComponent;
var messages = elasticio.messages;

exports.process = doProcess;

function doProcess(msg, cfg) {

    var self = this;

    // creating requestion options
    var options = {
        url: 'http://foobarbazbarney.com/api',
        json: true
    };
    
    // overrides the default response handler
    function onSuccess(response, body) {
        
        if (response.statusCode === 400) {
            throw new Error(JSON.stringify(body));
        }
        
        // you may also modify the data before emitting them
        delete body.internalId;
        
        // creating a message from given response body
        var data = messages.newMessageWithBody(body);
        
        // emitting the "data" event
        self.emit('data', data);
    }
    
    // sending GET request with given options
    new HttpComponent(this).success(onSuccess).get(options); 
}
````
