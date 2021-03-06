![Screenshot](/documentation/figures/StrawberryBanner.png?raw=true "Banner")

[![Code Climate](https://codeclimate.com/github/livioso/strawberry/badges/gpa.svg)](https://codeclimate.com/github/livioso/strawberry) [![Heroku](https://heroku-badge.herokuapp.com/?app=strawberry-livioso&style=flat)](https://strawberry-livioso.herokuapp.com/) [![Packages](https://david-dm.org/livioso/strawberry.svg)](https://github.com/livioso/strawberry/blob/master/package.json) [![Coverage Status](https://coveralls.io/repos/livioso/strawberry/badge.svg?branch=master)](https://coveralls.io/r/livioso/strawberry?branch=master)

**Strawberry** is a simple collaborative shopping list developed using the MEAN stack (MongoDB, ExpressJS, AngularJS and Node.js) and serves as a personal learning playground for those technologies. :-)

### How to get it running?

#### Initial installation

Install all required node packages using `npm`:

```
npm install
```

Install frontend libraries using `bower`:

```
bower install
```

Do all the other required stuff (sass etc.) using `gulp`:

```
gulp build
```

Now we can start the server:

```
npm start
```

##### Run the tests
```
npm test
```

##### Run the test in `--auto-watch`
```
npm run-script tdd
```

##### Run JSCS and JSHint
```
npm run-script jscs
```
```
npm run-script jshint
```



![Screenshot](/documentation/figures/Screenshot.png?raw=true "Screenshot")

> ###### Contribution
> If you have something interesting to contribute or you just know how to do something better, simply send me a pull request. :-)
