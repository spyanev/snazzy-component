describe('/recipes', function () {
    var client = require("../../lib/client")("root", "secret");
    var recipes = client.recipes;
    var nock = require('nock');

    describe('/list', function () {

        it('should send request successfully', function (done) {

            var response = [
                {
                    "id": "google_contacts_to_mailjet",
                    "title": "Google Contacts to Mailjet"
                },
                {
                    "id": "mandrill_to_keenio",
                    "title": "Mandrill to Keen.io"
                },
                {
                    "id": "salesforce_to_debitoor",
                    "title": "Salesforce to Debitoor"
                }
            ];

            nock('https://api.elastic.io')
                .get('/v1/recipes/')
                .basicAuth({
                    user: 'root',
                    pass: 'secret'
                })
                .reply(200, response);

            var result;

            recipes
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

    describe('/retrieve/{id}', function () {

        it('should send request successfully', function (done) {

            var response = {
                "id": "53d61965a6b9e9183f000001",
                "title": "Synchronise Amazon MWS and your Shopware data",
                "description": "Synchronises products and orders between Shopware and Amazon",
                "accounts": {}
            };

            nock('https://api.elastic.io')
                .get('/v1/recipes/53d61965a6b9e9183f000001')
                .basicAuth({
                    user: 'root',
                    pass: 'secret'
                })
                .reply(200, response);

            var result;

            recipes
                .retrieve('53d61965a6b9e9183f000001')
                .then(function (body) {
                    result = body;
                })
                .finally(function () {
                    expect(result).toEqual(response);

                    done();
                });

        });
    });

    describe('activate', function () {

        it('should send request successfully', function (done) {

            var input = {
                "accounts" : {
                    "mailchimp" : {
                        "name": "Account for plugin",
                        "credentials" : {
                            "apiKey": "123456789-eu1"
                        }
                    }
                },
                "configuration" : {
                    "mailchimp" : {
                        "listId" : "112233"
                    }
                }
            };

            var response = {
                "syncAppId": "55cdf472aebbe9650d000008",
                "syncAppTitle": "Shopware to Mailchimp",
                "tasks": [
                    {
                        "id": "55cdf472aebbe9650d000006",
                        "name": "New Mailchimp subscriber"
                    },
                    {
                        "id": "55cdf472aebbe9650d000007",
                        "name": "Un-subscribe from Mailchimp"
                    }
                ]
            };

            nock('https://api.elastic.io')
                .post('/v1/recipes/53d61965a6b9e9183f000001', input)
                .basicAuth({
                    user: 'root',
                    pass: 'secret'
                })
                .reply(200, response);

            var result;

            recipes
                .activate('53d61965a6b9e9183f000001', input)
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
