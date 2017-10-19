var Resource = require("../resource.js");

module.exports = Resource.extend({
    path: 'accounts',

    create: Resource.method({
        method: Resource.POST,
        path: '/'
    }),

    list: Resource.method({
        path: '/'
    }),

    retrieve: Resource.method({
        path: '/{id}'
    }),

    update: Resource.method({
        method: Resource.PUT,
        path: '/{id}'
    })
});
