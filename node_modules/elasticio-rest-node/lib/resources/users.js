var Resource = require("../resource.js");

module.exports = Resource.extend({
    path: 'users',

    me: Resource.method({
        path: '/'
    }),

    create: Resource.method({
        method: Resource.POST,
        path: '/'
    }),

    delete: Resource.method({
        method: Resource.DELETE,
        path: '/{id}'
    })
});
