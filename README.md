# Quick Guide to Run a React Project with json-server

## Watch the Short Clip From Project

To watch the project clip, visit [this link](https://www.aparat.com/Software_hp)

## Installation:

### Clone the project:

`git clone` https://github.com/Iamhhp/website-articles-courses.git

### Install dependencies:

`npm install`

### Backend with json-server:

#### Install json-server:

`npm install -g json-server`

##### Start json-server:

`json-server --watch db.json --port 5000`

### Start React App:

`npm start`

**Notes-1: db.json: Ensure that this file is filled with the necessary data for your project. Make sure the port used by json-server does not conflict with the port specified in npm start (default is 3000).**
