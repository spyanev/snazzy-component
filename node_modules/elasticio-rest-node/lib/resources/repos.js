var Resource = require("../resource.js");

module.exports = Resource.extend({
    path: 'repos',

    list: Resource.method({
        path: '/'
    }),

    retrieve: Resource.method({
        path: '/{id}'
    }),

    create: Resource.method({
        method: Resource.POST,
        path: '/'
    }),

    delete: Resource.method({
        method: Resource.DELETE,
        path: '/{id}'
    }),

    retrieveEnvVars: Resource.method({
        path: '/{id}/env/'
    }),

    updateEnvVars: Resource.method({
        method: Resource.PUT,
        path: '/{id}/env/'
    })
});
