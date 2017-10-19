var Resource = require("../resource.js");

module.exports = Resource.extend({
    path: 'exec',

    schedule: Resource.method({
        method: Resource.POST,
        path: '/schedule',
        prepareResponse: prepareScheduleResponse
    }),

    pollResult: Resource.method({
        path: '/poll/{id}',
        prepareResponse: preparePollingResponse
    })
});

function prepareScheduleResponse(response, body) {

    if (response.statusCode !== 202) {
        throw new Error(JSON.stringify(body));
    }

    var location = response.headers.location;

    if (!location) {
        throw new Error("elastic.io API did not provide a location");
    }

    body.location = location;

    return body;
}

function preparePollingResponse(response, body) {

    if (response.req.path.indexOf('/exec/result') !== -1) {
        return {
            ready: true,
            result: body
        };
    }

    return {
        ready: false
    };
}
