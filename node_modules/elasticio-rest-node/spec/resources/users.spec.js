describe('/users', function () {
    var client = require("../../lib/client")("root", "secret");
    var users = client.users;
    var nock = require('nock');

    describe('/', function () {

        it('should send request successfully', function (done) {

            var response = {
                "first_name": "John",
                "last_name": "Doe",
                "email": "test@example.com",
                "password": "secret",
                "company": "Doe & Partners"
            };

            nock('https://api.elastic.io')
                .get('/v1/users/')
                .basicAuth({
                    user: 'root',
                    pass: 'secret'
                })
                .reply(200, response);

            var result;

            users
                .me()
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
                "first_name": "John",
                "last_name": "Doe",
                "email": "test@example.com",
                "password": "secret",
                "company": "Doe & Partners"
            };

            var response = {
                "_id" : "54f4be3fe7d5224f91000001",
                "first_name": "John",
                "last_name": "Doe",
                "email": "test@example.com",
                "password": "secret",
                "company": "Doe & Partners"
            };

            nock('https://api.elastic.io')
                .post('/v1/users/', input)
                .basicAuth({
                    user: 'root',
                    pass: 'secret'
                })
                .reply(200, response);

            var result;

            users
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
                "message" : "Successfully deleted user id=54f4be3fe7d5224f91000001"
            };

            nock('https://api.elastic.io')
                .delete('/v1/users/54f4be3fe7d5224f91000001')
                .basicAuth({
                    user: 'root',
                    pass: 'secret'
                })
                .reply(200, response);

            var result;

            users
                .delete("54f4be3fe7d5224f91000001")
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
