var Resource = require("../resource.js");

module.exports = Resource.extend({
    path: 'resources/s3',

    createSignedUrl: Resource.method({
        method: Resource.POST,
        path: '/signed-url'
    })
});
