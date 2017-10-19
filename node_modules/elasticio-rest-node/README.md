[![Circle CI](https://circleci.com/gh/elasticio/elasticio-rest-node.svg?style=svg)](https://circleci.com/gh/elasticio/elasticio-rest-node)
[![Coverage Status](https://coveralls.io/repos/elasticio/elasticio-rest-node/badge.svg?branch=master&service=github)](https://coveralls.io/github/elasticio/elasticio-rest-node?branch=master)

# Installation

``npm install elasticio-rest-node``

# Documentation

Documentation is available at http://api.elastic.io/docs/

# API Overview



````js
var client = require('elasticio-rest-node')('YOUR_EMAIL', 'YOUR_API_KEY');
````



# Repos

````js
client.repos.retrieve('555c5ade13c2298a9d32fe67')
    .then(function (repo) {
        // Do something with your repo
    });
````


# Users

````js
client.users.me()
    .then(function (user) {
        // Do something with your user
    });
````

