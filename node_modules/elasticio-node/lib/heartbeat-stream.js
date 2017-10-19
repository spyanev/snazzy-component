var events = require("events");
var StreamCounter = require('stream-counter');
var util = require("util");

var HEARTBEAT_PERIOD = 10 * 1000; // 10 secs

var HeartBeatStream = function(heartBeatEmitter) {
    if (heartBeatEmitter instanceof events.EventEmitter) {
        this.emitter = heartBeatEmitter;
    }
    events.EventEmitter.call(this);
};

util.inherits(HeartBeatStream, events.EventEmitter);

HeartBeatStream.prototype.start = function start(stream) {

    var lastHeartbeatTime = 0;

    var that = this;

    var counter = new StreamCounter();

    counter.on('progress', function() {

        var now = new Date().getTime();

        if ((now - lastHeartbeatTime) > HEARTBEAT_PERIOD) {
            console.log(counter.bytes + " bytes read so far");

            lastHeartbeatTime = now;

            if (that.emitter) {
                that.emitter.emit('heartbeat')
            }

            that.emit('heartbeat');
        }

    });

    stream.pipe(counter);
};

exports.HeartBeatStream = HeartBeatStream;