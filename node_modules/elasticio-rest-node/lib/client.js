module.exports = ElasticIO;

ElasticIO.API_DEFAULT_BASE_URL = 'https://api.elastic.io';
ElasticIO.API_VERSION = 'v1';

var resources = {
    accounts: require('./resources/accounts'),
    components: require('./resources/components'),
    exec: require('./resources/exec'),
    recipes: require('./resources/recipes'),
    resources: {
        s3: require('./resources/s3'),
        storage: require('./resources/storage')
    },
    repos: require('./resources/repos'),
    sshkeys: require('./resources/sshkeys'),
    tasks: require('./resources/tasks'),
    teams: require('./resources/teams'),
    users: require('./resources/users')
};

function ElasticIO(user, password) {
    var self = this;
    var baseUri = process.env.ELASTICIO_API_URI || ElasticIO.API_DEFAULT_BASE_URL;
    this._api = {
        user: user || process.env.ELASTICIO_API_USERNAME,
        password: password || process.env.ELASTICIO_API_KEY,
        basePath: baseUri + '/' + ElasticIO.API_VERSION
    };

    prepareResources(self, resources);

    return this;
}

function prepareResources(container, resources) {
    var self = this;

    for (var next in resources) {
        var name = next.toLowerCase();
        var value = resources[next];

        if (typeof value === 'object') {
            container[name] = {};
            prepareResources(container[name], value);
        } else {
            container[name] = new resources[next](self);
        }
    }
}
