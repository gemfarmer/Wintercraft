# Wintercraft
===========

This application is built to help individuals more accurately gauge when their ice lantern has completed

## What it does
* User signs in, says where they are, the weight or diameter of their globe and starts the timer
* OPTIONS:
  * User can add different locations, stored as their locations
  * User can determine desired end thickness
  * User can toggle notification method (text, email, alert)

#### Things that need to be done! (From Highest to lowest priority)
##### ~~~~ Steps ~~~~
  1. find weather api that has geolocator
    * wunderground??
  2. Hook up api
  3. Enable ability to store previous locations
  4. Create form for options input
  5. Create algorithm that predicts end time
  6. Determine how to notify user

## Architecture

Scaffolding: [Yeoman Angular FullStack Generator](https://www.npmjs.org/package/generator-angular-fullstack)
To make additions to the architecture, it would be advisable to use their cli generation tools. They are consistent and helpful

### License:
COPYFARLEFT PUBLIC LICENSE. This is a form of [Peer Production License](http://p2pfoundation.net/Peer_Production_License)

### Production:

### Dev:
Front-end: [http://localhost:9000](http://localhost:9000)


## Deployment && Hosting
For now I will have full control over the deployment process
 `grunt build`
 `grunt buildcontrol:heroku` (the site is hosted via heroku and uses the mongohq add-on)

## Dev Environment Setup

### Backend

1. Install XCode and/or the command line tools: [https://developer.apple.com/xcode/]()
2. Install homebrew: http://brew.sh/
3. Install node.js: [with nvm](https://github.com/creationix/nvm) or [without](http://nodejs.org/)
3.b. Install Grunt: `npm install -g grunt-cli`
4. Install MongoDB and Mongoose:
5. Install npm
6. Install bower: `npm install -g bower`
7. Clone the project `git clone https://github.com/gemfarmer/mpls-community-houses.git`
8. `cd mpls-community-houses && npm install`
9. `bower install`
10. Open up new terminal window, then, in same directory `sudo mongod` and enter credentials
11. Open an additional window and `mongo` to set up MongoDB locally
12. `grunt serve` to start server

## Client


- Dependencies: Bower
- Tasks: Grunt
- Routing: angular-ui-router


