var Resource = require("../resource.js");

module.exports = Resource.extend({
    path: 'components',

    mine: Resource.method({
        path: '/mine'
    }),

    public: Resource.method({
        path: '/public'
    }),

    retrieve: Resource.method({
        path: '/{id}'
    })
});
