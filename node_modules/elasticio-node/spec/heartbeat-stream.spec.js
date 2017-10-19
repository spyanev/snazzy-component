var HeartBeatStream = require('../lib/heartbeat-stream.js').HeartBeatStream;
var Stream = require('stream');
var events = require('events');

describe('HeartbeatStream', function () {
    it('Emit heartbeat on progress', function () {
        var stream = new Stream();
        var eventEmitter = new events.EventEmitter();
        var hb1 = jasmine.createSpy('hb1');
        var hb2 = jasmine.createSpy('hb2');

        eventEmitter.on('heartbeat', hb1);

        runs(function () {
            new HeartBeatStream(eventEmitter).on('heartbeat', hb2).start(stream);
            stream.emit('data', "A DATA");
            stream.emit('end');
        });

        waitsFor(function () {
            return hb1.calls.length;
        });

        runs(function () {
            expect(hb1).toHaveBeenCalled();
            expect(hb2).toHaveBeenCalled();
        });
    });
});