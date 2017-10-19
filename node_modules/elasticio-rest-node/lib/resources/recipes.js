var Resource = require("../resource.js");

module.exports = Resource.extend({
    path: 'recipes',

    list: Resource.method({
        path: '/'
    }),

    retrieve: Resource.method({
        path: '/{id}'
    }),

    activate: Resource.method({
        method: Resource.POST,
        path: '/{id}'
    })
});
