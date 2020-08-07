var express = require('express')
var app = express()
var os = require('os');

app.get('/', function (req, res) {
  const request = require('request');
  const options = {
    url: 'http://169.254.169.254/metadata/instance?api-version=2019-03-11',
    headers: {
      'Metadata': 'true'
    }
  };

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var metadataObj = JSON.parse(body)
      let ejs = require('ejs'),
        html = ejs.render(
          '<h2><%= metadataObj.compute.name %></h2> \
            <p>Name: <%= metadataObj.compute.name %></p> \
            <p>Private IP Address: <%= metadataObj.network.interface[0].ipv4.ipAddress[0].privateIpAddress %></p> \
            <p>Resource id: <%= metadataObj.compute.resourceId %></p> \
            <p>Scale set name: <%= metadataObj.compute.vmScaleSetName %></p></p> \
            <p><pre><%=  JSON.stringify(metadataObj, null, 2) %></pre></p>',
            { metadataObj: metadataObj }
        )
      res.send(html)
    }
    else {
      console.log("Error " + response.statusCode)
    }
  })
})
app.get('/meta', function (req, res) {
        const request = require('request');
        const options = {
          url: 'http://169.254.169.254/metadata/instance?api-version=2019-03-11',
          headers: {
            'Metadata': 'true'
          }
        };
        request(options, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            res.set('Content-Type', 'application/json');
            res.send(body)
          }
          else {
            console.log("Error " + response.statusCode)
          }
        })
      })
app.get('/health', function (req, res) {
  res.send('PONG!')
})
app.listen(3000, function () {
  console.log('Hello world app listening on port 3000!')
})
