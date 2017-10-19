# First steps with elastic.io API

This tutorial will show you how you can create, start and stop integration on elastic.io platform.
You only need a ``curl`` and [elastic.io account](http://www.elastic.io) for that. 

## Prepare an empty request bin

Create new request bin, we'll going to use it in our integration sample to push the data.

```
curl -X POST http://requestb.in/api/v1/bins
```

you'll ge a response that would looks like this:

```json
{
  "private": false,
  "name": "xuhpomxu",
  "request_count": 0,
  "color": [
    210,
    60,
    170
  ]
}
```

Remember the ``name`` of your bin (``xuhpomxu`` in our sample above). You can also check it's empty now:

```
curl http://requestb.in/api/v1/bins/xuhpomxu
```

Make sure the ``request_count`` is 0.

## Check your API access

Now you need your e-mail and API key from elastic.io account, you can find it in your profile. 
API calls to elastic.io api should be authenticated using basic auth where your e-mail is a username and API key
is a password.

```
curl -u your-email:your-api-key https://api.elastic.io/v2/users
```
Should return you something like this:

```json
{
  "id": "123456789",
  "first_name": "Renat",
  "last_name": "Zubairov",
  "email": "foo@bar.com",
  "company": "elastic.io"
}
```

## Create new task

For our sample we'll create a simple task 'Timer' -> 'Webhook' that will simply push a data to the webhook every minute. 
First create a new file called ``task.json`` with following content:

```json
{
  "name": "Embedded Tutorial",
  "cron": "*/1 * * * *",
  "nodes": [
    {
      "function": "elasticio/timer:timer",
      "config": {
        "interval": "minute"
      }
    },
    {
      "function": "elasticio/webhook:post",
      "config": {
        "method": "POST",
        "uri": "http://requestb.in/xuhpomxu",
        "outputSample": "ignored"
      }
    }
  ]
}
```

As you can see above it's a simple integraiton flow with two components. Don't forget to replace the URL inside the webhook configuration with the request bin URL you had created in the first step.

Now post the contents of this file to ``/v1/tasks`` like this:

```
curl -u your-email:your-api-key \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -d @task.json \
  https://api.elastic.io/v2/tasks
```

And you'll see the result like this:

```
{"id":"123456789"}
```

We just created a new task with ``id`` 123456789. Now we can start it.

## Start integration flow

Now as we have a Task ID we can easily start it using [start task](http://api.elastic.io/docs/#start-a-task) API:

```
curl -u your-email:your-api-key \
  -X POST \
  https://api.elastic.io/v2/tasks/start/{TASK_ID}
```

As a response you'll see something like this:

```json
{
  "id": "123456789",
  "status": "active",
  "message": "Your task has been successfully activated."
}
```

Your first integration task has just started on elastic.io. Every minute elastic.io platform will trigger an execution of the [timer component](https://github.com/elasticio/timer). Timer component [will emit](https://github.com/elasticio/timer/blob/master/timer.js#L27) a message with the fire time in it, this message will be placed into the output data queue which is in turn connected to the [webhook component](https://github.com/elasticio/webhook) which will POST the body of the message to the configured URL.

## See your integration flow working

After 10-15 seconds you can check the request bin you created in the first step of this tutorial:

```
curl http://requestb.in/api/v2/bins/xuhpomxu
```


```json
{
  "name": "xuhpomxu",
  "request_count": 1,
  "color": [
    240,
    220,
    190
  ],
  "private": false
}
```

As you can see we have a new request in the bin. You can also open a URL in your browser ``http://requestb.in/your-bin-name?inspect`` to see the visualization statistics like this:

https://www.dropbox.com/s/3u8kqc58b8v24z9/Screenshot%202016-01-30%2012.50.48.png?dl=0

And you can be sure every minute a new request will be posted.

## Stop your integration flow

Don't forget to stop your task so that resources allocated to your account won't be wasted, use the [stop task](http://api.elastic.io/docs/#stop-a-task) API:

```
curl -u your-email:your-api-key \
  -X POST \
  https://api.elastic.io/v2/tasks/stop/{TASK_ID}
```

As a response you'll see something like this:

```json
{
  "id": "123456789",
  "status": "inactive"
}
```
## Delete you integration flow

As a last step to make sure you don't have any left-overs we'll delete the task. To do that we'l use [delete task](https://api.elastic.io/docs/#delete-a-task) API.

```
curl -u your-email:your-api-key \
  -X DELETE \
  https://api.elastic.io/v2/tasks/{TASK_ID}
```

