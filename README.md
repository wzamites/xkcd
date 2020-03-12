# a random xkcd

Display a random xkcd comic
[Deployed Here on Heroku](https://shielded-spire-58092.herokuapp.com/)

## Run it locally

    $ git clone https://github.com/wzamites/xkcd/
    $ cd xkcd
    $ npm install
    $ npm start

## Architecture: {root}/api

{root}/api serves a url in quotations (JSON standard) of a random xkcd comic. The entry point, server.js, servers this file as the result of business logic. An API call is made to two endpoints: 

http://xkcd.com/info.0.json (current comic)

In order to return a random comic, we have to know the range of comic numbers. In this case they are sequential by creation date starting with 1 and ending with 2278. The maximum will increment by one every time a new comic is published. Since it changes, hardcoding it is less desirable. Calling the first API will always give the current comic with the maximum number.

http://xkcd.com/{number}/info.0.json (comic of a given number)

Once we have the maximum number, we use randIntGen(max, min) to generate a random integer between max and min, inclusive. Now we have a number to make the call. Once this is done, the img url property of the result is served as an internal API at {root}/api.

 The server also serves up static pages without business logic (index.html, index.css, index.js), which exist as pages in /static/
