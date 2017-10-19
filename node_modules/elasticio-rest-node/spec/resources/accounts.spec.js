describe('/accounts', function () {
    var client = require("../../lib/client")("root", "secret");
    var accounts = client.accounts;
    var nock = require('nock');

    describe('/list', function () {

        it('should send request successfully', function (done) {

            var response = [
                {
                    "id":"55083c567aea6f030000001a",
                    "name":"My Dropbox account",
                    "keys": {
                        "oauth": {
                            "key": "some key"
                        }
                    }
                }
            ];

            nock('https://api.elastic.io')
                .get('/v1/accounts/')
                .basicAuth({
                    user: 'root',
                    pass: 'secret'
                })
                .reply(200, response);

            var result;

            accounts
                .list()
                .then(function (body) {
                    result = body;
                })
                .finally(function () {
                    expect(result).toEqual(response);

                    done();
                });

        });
    });

    describe('/retrieve', function () {

        it('should send request successfully', function (done) {

            var response = {
                "id":"55083c567aea6f030000001a",
                "name":"My Dropbox account",
                "keys": {
                    "oauth": {
                        "key": "some key"
                    }
                }
            };

            nock('https://api.elastic.io')
                .get('/v1/accounts/55083c567aea6f030000001a')
                .basicAuth({
                    user: 'root',
                    pass: 'secret'
                })
                .reply(200, response);

            var result;

            accounts
                .retrieve('55083c567aea6f030000001a')
                .then(function (body) {
                    result = body;
                })
                .finally(function () {
                    expect(result).toEqual(response);

                    done();
                });

        });
    });

    describe('/update', function () {

        it('should send request successfully', function (done) {

            var input = {
                "name": "New account name"
            };

            var response = {
                "id": "55083c567aea6f030000001a",
                "name": "New account name",
                "type": "dropbox",
                "keys": {
                    "oauth": {
                        "key": "some key"
                    }
                }
            };

            nock('https://api.elastic.io')
                .put('/v1/accounts/55083c567aea6f030000001a', input)
                .basicAuth({
                    user: 'root',
                    pass: 'secret'
                })
                .reply(200, response);

            var result;

            accounts
                .update('55083c567aea6f030000001a', input)
                .then(function (body) {
                    result = body;
                })
                .finally(function () {
                    expect(result).toEqual(response);

                    done();
                });

        });
    });

    describe('/create', function () {

        it('should send request successfully', function (done) {

            var input = {
                "name": "New account name"
            };

            var response = {
                "id": "55083c567aea6f030000001a",
                "name": "New account name",
                "type": "dropbox",
                "keys": {
                    "oauth": {
                        "key": "some key"
                    }
                }
            };

            nock('https://api.elastic.io')
                .post('/v1/accounts/', input)
                .basicAuth({
                    user: 'root',
                    pass: 'secret'
                })
                .reply(200, response);

            var result;

            accounts
                .create(input)
                .then(function (body) {
                    result = body;
                })
                .finally(function () {
                    expect(result).toEqual(response);

                    done();
                });

        });
    });
});
