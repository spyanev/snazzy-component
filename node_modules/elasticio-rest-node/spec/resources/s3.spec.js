describe('/resources/s3', function () {
    var client = require("../../lib/client")("root", "secret");
    var resources = client.resources;
    var nock = require('nock');

    describe('/create', function () {

        it('should send request successfully', function (done) {

            var input = {};

            var response = {
                expires: 1,
                put_url: 'http://a-signed-url.com/put',
                get_url: 'http://a-signed-url.com/get'
            };

            nock('https://api.elastic.io')
                .post('/v1/resources/s3/signed-url', input)
                .basicAuth({
                    user: 'root',
                    pass: 'secret'
                })
                .reply(200, response);

            var result;

            resources
                .s3
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
