# Bloglight
[![Build Status](https://travis-ci.org/knidarkness/bloglight.svg?branch=master)](https://travis-ci.org/knidarkness/bloglight)
## Overview
Bloglight is an Express-based blog engine for Node.js. It uses Passport.js for authorization and Handlebars as default template system, but both can be changed as shown in Usage section.
## Installation
To start using bloglight just run following command:

`npm install bloglight`

That should be enough to set up a bloglight app, but if something goes wrong, feel free to go to the [GitHub repository](https://github.com/knidarkness/bloglight) and create an issue.
## Usage
The simplest way to start using the bloglight after installation is following:
```js
const bloglight = require('bloglight');
bloglight.createBlog('/', { // we need to set the root address of the blog
    username: "admin@site.com", // and admin user credentials
    password: "password"
}).then((b) => { // after that, simply run it as an Express app
    b.listen(80);
});
```
Also you can use bloglight as an external module for your existing Express application:
```js
const express = require('express');
const blog = require('bloglight');

const app = express();

app.get('/', (req, res) => {
    res.send('Some useful content');
});

blog.createBlog('/blog', {
    username: "dubovyk@ucu.edu.ua",
    password: "password"
}).then((b) => {
    app.use('/blog', b);
    app.listen(80);
});
```

For both cases, you can set them as following:
```js
const blog = require('bloglight');
blog.setTheme(path.join(__dirname, 'theme'));
```
And example of the theme can be found in the [GitHub repository](https://github.com/knidarkness/bloglight) in *theme* directory.

By default bloglight uses Handlebars template system and all the view files must have .hbs extension. However, you can use any other rendering engine in the same way as with usual Express app:

```js
const express = require('express');
const blog = require('bloglight');

const app = express();

blog.createBlog('/blog', {
    username: "admin@site.com",
    password: "password"
}).then((b) => {
    b.set('view engine', 'hbs');
    app.use('/blog', b);
    app.listen(80);
});
```

Also, you can create a `sequelize.config.js` file in the root directory of your application which will follow such example to set up custom database connection:
```js
module.exports = {
    dialect: "sqlite",
    storage: "./db.sqlite"
};
```
## License & Author
This package is distributed under the MIT License by [Sergey Dubovjyk](mailto:knidarkness@gmail.com)