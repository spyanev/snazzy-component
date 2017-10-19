describe('/repos', function () {
    var client = require("../../lib/client")("root", "secret");
    var repos = client.repos;
    var nock = require('nock');

    describe('/list', function () {

        it('should send request successfully', function (done) {

            var response = [
                {
                    "id": "555c5ade13c2298a9d32fe67",
                    "name": "testrepo",
                    "team_id": "5538bc1c9c0f0522391900d4"
                }
            ];

            nock('https://api.elastic.io')
                .get('/v1/repos/')
                .basicAuth({
                    user: 'root',
                    pass: 'secret'
                })
                .reply(200, response);

            var result;

            repos
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
                "id": "555c5ade13c2298a9d32fe67",
                "name": "testrepo",
                "team_id": "5538bc1c9c0f0522391900d4"
            };

            nock('https://api.elastic.io')
                .get('/v1/repos/555c5ade13c2298a9d32fe67')
                .basicAuth({
                    user: 'root',
                    pass: 'secret'
                })
                .reply(200, response);

            var result;

            repos
                .retrieve('555c5ade13c2298a9d32fe67')
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
                "name": "My Repo"
            };

            var response = {
                "name":"My Repo",
                "id": "555c5ade13c2298a9d32fe67",
                "team_id": "team_id",
                "is_public": false
            };

            nock('https://api.elastic.io')
                .post('/v1/repos/', input)
                .basicAuth({
                    user: 'root',
                    pass: 'secret'
                })
                .reply(200, response);

            var result;

            repos
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

    describe('/delete/{id}', function () {

        it('should send request successfully', function (done) {

            var response = {
                "message" : "Successfully deleted repo id=54982ee6bdf2a2030000000f"
            };

            nock('https://api.elastic.io')
                .delete('/v1/repos/54982ee6bdf2a2030000000f')
                .basicAuth({
                    user: 'root',
                    pass: 'secret'
                })
                .reply(200, response);

            var result;

            repos
                .delete("54982ee6bdf2a2030000000f")
                .then(function (body) {
                    result = body;
                })
                .finally(function () {
                    expect(result).toEqual(response);

                    done();
                });

        });
    });

    describe('/repos/{id}/env/', function () {

        it('should send request successfully', function (done) {

            var response = {
                "API_KEY": "key",
                "API_SECRET": "secret"
            };

            nock('https://api.elastic.io')
                .get('/v1/repos/555c5ade13c2298a9d32fe67/env/')
                .basicAuth({
                    user: 'root',
                    pass: 'secret'
                })
                .reply(200, response);

            var result;

            repos
                .retrieveEnvVars('555c5ade13c2298a9d32fe67')
                .then(function (body) {
                    result = body;
                })
                .finally(function () {
                    expect(result).toEqual(response);

                    done();
                });

        });
    });

    describe('update /repos/{id}/env/', function () {

        it('should send request successfully', function (done) {

            var input = {
                "API_KEY": "new_key"
            };

            var response = {
                "API_KEY": "key",
                "API_SECRET": "secret"
            };

            nock('https://api.elastic.io')
                .put('/v1/repos/555c5ade13c2298a9d32fe67/env/', input)
                .basicAuth({
                    user: 'root',
                    pass: 'secret'
                })
                .reply(200, response);

            var result;

            repos
                .updateEnvVars('555c5ade13c2298a9d32fe67', input)
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
