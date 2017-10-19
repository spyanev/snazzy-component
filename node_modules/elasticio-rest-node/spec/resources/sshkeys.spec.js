describe('/sshkeys', function () {
    var client = require("../../lib/client")("root", "secret");
    var sshkeys = client.sshkeys;
    var nock = require('nock');

    describe('/list', function () {

        it('should send request successfully', function (done) {

            var response = [
                {
                    "id": "54982ee6bdf2a2030000000f",
                    "title": "My Key",
                    "fingerprint": "fingerprint",
                    "user_id": "user_id",
                    "key":"ssh_key"
                }
            ];

            nock('https://api.elastic.io')
                .get('/v1/sshkey/')
                .basicAuth({
                    user: 'root',
                    pass: 'secret'
                })
                .reply(200, response);

            var result;

            sshkeys
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

    describe('/create', function () {

        it('should send request successfully', function (done) {

            var input = {
                "key": "ssh-rsa YOUR KEY GOES HERE",
                "title": "My Key"
            };

            var response = {
                "id": "54982ee6bdf2a2030000000f",
                "title": "My Key",
                "fingerprint": "fingerprint",
                "user_id": "user_id",
                "key":"ssh_key"
            };

            nock('https://api.elastic.io')
                .post('/v1/sshkey/', input)
                .basicAuth({
                    user: 'root',
                    pass: 'secret'
                })
                .reply(200, response);

            var result;

            sshkeys
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
                "message" : "Successfully deleted ssh key id=54982ee6bdf2a2030000000f"
            };

            nock('https://api.elastic.io')
                .delete('/v1/sshkey/54982ee6bdf2a2030000000f')
                .basicAuth({
                    user: 'root',
                    pass: 'secret'
                })
                .reply(200, response);

            var result;

            sshkeys
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
});
