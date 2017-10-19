describe('/teams', function () {
    var client = require("../../lib/client")("root", "secret");
    var teams = client.teams;
    var nock = require('nock');

    describe('/list', function () {

        it('should send request successfully', function (done) {

            var response = [
                {
                    "id":"55083c567aea6f030000001a",
                    "name":"My team",
                    "members":[
                        "5508411b34e5ac0300000019",
                        "510fc14d173cff0200000003"
                    ]
                }
            ];

            nock('https://api.elastic.io')
                .get('/v1/teams/')
                .basicAuth({
                    user: 'root',
                    pass: 'secret'
                })
                .reply(200, response);

            var result;

            teams
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
                "name": "My team"
            };

            var response = {
                "id":"55083c567aea6f030000001a",
                "name":"My team",
                "members":["5508411b34e5ac0300000019"]
            };

            nock('https://api.elastic.io')
                .post('/v1/teams/', input)
                .basicAuth({
                    user: 'root',
                    pass: 'secret'
                })
                .reply(200, response);

            var result;

            teams
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
