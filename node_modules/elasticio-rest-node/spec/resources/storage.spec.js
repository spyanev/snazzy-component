describe('/resources/storage', function () {
    var client = require("../../lib/client")("root", "secret");
    var resources = client.resources;
    var nock = require('nock');

    describe('createSignedUrl', function () {

        it('should send request successfully', function (done) {

            var input = {};

            var response = {
                put_url: 'http://a-signed-url.com/put',
                get_url: 'http://a-signed-url.com/get'
            };

            nock('https://api.elastic.io')
                .post('/v1/resources/storage/signed-url', input)
                .basicAuth({
                    user: 'root',
                    pass: 'secret'
                })
                .reply(200, response);

            var result;

            resources
                .storage
                .createSignedUrl(input)
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
