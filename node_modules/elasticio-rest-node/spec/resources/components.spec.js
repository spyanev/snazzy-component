describe('/components', function () {
    var client = require("../../lib/client")("root", "secret");
    var components = client.components;
    var nock = require('nock');

    var response = {
        "components": [
            {
                "data": {
                    "title": "Component title",
                    "description": "Description",
                    "credentials": {
                        "fields": {
                            "name": {
                                "viewClass": "TextFieldView",
                                "required": true,
                                "label": "Your name"
                            }
                        }
                    }
                },
                "repo_id": "MONGO_ID"
            }
        ]
    };

    describe('/mine', function () {

        it('should send request successfully', function (done) {

            nock('https://api.elastic.io')
                .get('/v1/components/mine')
                .basicAuth({
                    user: 'root',
                    pass: 'secret'
                })
                .reply(200, response);

            var result;

            components
                .mine()
                .then(function (body) {
                    result = body;
                })
                .finally(function () {
                    expect(result).toEqual(response);

                    done();
                });

        });
    });

    describe('/public', function () {

        it('should send request successfully', function (done) {

            nock('https://api.elastic.io')
                .get('/v1/components/public')
                .basicAuth({
                    user: 'root',
                    pass: 'secret'
                })
                .reply(200, response);

            var result;

            components
                .public()
                .then(function (body) {
                    result = body;
                })
                .finally(function () {
                    expect(result).toEqual(response);

                    done();
                });

        });
    });

    describe('/:id', function () {

        it('should send request successfully', function (done) {

            nock('https://api.elastic.io')
                .get('/v1/components/123456789')
                .basicAuth({
                    user: 'root',
                    pass: 'secret'
                })
                .reply(200, { yeah : 'it works' });

            var result;

            components
                .retrieve('123456789')
                .then(function (body) {
                    result = body;
                })
                .finally(function () {
                    expect(result).toEqual({ yeah : 'it works' });
                    done();
                });

        });
    });

});
