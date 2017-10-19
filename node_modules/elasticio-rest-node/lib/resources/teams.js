var Resource = require("../resource.js");

module.exports = Resource.extend({
    path: 'teams',

    list: Resource.method({
        path: '/'
    }),

    create: Resource.method({
        method: Resource.POST,
        path: '/'
    })
});
