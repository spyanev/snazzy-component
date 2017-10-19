describe('/exec', function () {
    var client = require("../../lib/client")("root", "secret");
    var exec = client.exec;
    var nock = require('nock');

    describe('/schedule', function () {

        it('should send location header', function (done) {

            var input = {
                "execution_type": "get_meta_model",
                "action_or_trigger": "put",
                "component": "{CONNECTOR_ID}",
                "account_id": "{ACCOUNT_ID}"
            };

            var response = {
                "message": "ok"
            };

            var headers = {
                location: 'https://api.elastic.io/v1/exec/poll/540492e623773659c5000002',
                'Content-type': 'application/json'
            };

            nock('https://api.elastic.io')
                .post('/v1/exec/schedule', input)
                .basicAuth({
                    user: 'root',
                    pass: 'secret'
                })
                .reply(202, response, headers);

            var result;

            exec
                .schedule(input)
                .then(function (body) {
                    result = body;
                })
                .finally(function () {
                    expect(result).toEqual({
                        message: 'ok',
                        location: 'https://api.elastic.io/v1/exec/poll/540492e623773659c5000002'
                    });

                    done();
                });

        });

        it('should fail if location header is not present', function (done) {

            var input = {
                "execution_type": "get_meta_model",
                "action_or_trigger": "put",
                "component": "{CONNECTOR_ID}",
                "account_id": "{ACCOUNT_ID}"
            };

            var response = {
                "message": "ok"
            };

            nock('https://api.elastic.io')
                .post('/v1/exec/schedule', input)
                .basicAuth({
                    user: 'root',
                    pass: 'secret'
                })
                .reply(202, response);

            var result;

            exec
                .schedule(input)
                .fail(function (e) {
                    result = e;
                })
                .finally(function () {
                    expect(result.message).toEqual('elastic.io API did not provide a location');

                    done();
                });

        });

        it('should fail if response status code not 202', function (done) {

            var input = {
                "execution_type": "get_meta_model",
                "action_or_trigger": "put",
                "component": "{CONNECTOR_ID}",
                "account_id": "{ACCOUNT_ID}"
            };

            var response = {
                "message": "not ok at all"
            };

            nock('https://api.elastic.io')
                .post('/v1/exec/schedule', input)
                .basicAuth({
                    user: 'root',
                    pass: 'secret'
                })
                .reply(500, response);

            var result;

            exec
                .schedule(input)
                .fail(function (e) {
                    result = e;
                })
                .finally(function () {
                    expect(result.message).toEqual('{"message":"not ok at all"}');

                    done();
                });

        });
    });

    describe('/poll', function () {

        it('should receive ready=false if result is not ready yet', function (done) {

            var response = {
                "message": "Result is not ready yet."
            };

            nock('https://api.elastic.io')
                .get('/v1/exec/poll/540492e623773659c5000002')
                .basicAuth({
                    user: 'root',
                    pass: 'secret'
                })
                .reply(200, response);

            var result;

            exec
                .pollResult('540492e623773659c5000002')
                .then(function (body) {
                    result = body;
                })
                .finally(function () {
                    expect(result).toEqual({
                        ready: false
                    });

                    done();
                });

        });
        it('should follow redirect if result is ready', function (done) {

            var pollingResponse = {
                "message": "Ready."
            };

            var resultResponse = {
                "data": {
                    "some": "value"
                }
            };


            var headers = {
                location: 'https://api.elastic.io/v1/exec/result/540492e623773659c5000002',
                'Content-type': 'application/json'
            };

            nock('https://api.elastic.io')
                .get('/v1/exec/poll/540492e623773659c5000002')
                .basicAuth({
                    user: 'root',
                    pass: 'secret'
                })
                .reply(303, pollingResponse, headers)
                .get('/v1/exec/result/540492e623773659c5000002')
                .basicAuth({
                    user: 'root',
                    pass: 'secret'
                })
                .reply(200, resultResponse);

            var result;

            exec
                .pollResult('540492e623773659c5000002')
                .then(function (body) {
                    result = body;
                })
                .finally(function () {
                    expect(result).toEqual({
                        ready: true,
                        result: resultResponse
                    });

                    done();
                });

        });
    });
});
