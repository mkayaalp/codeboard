*Forked from [codeboardio/codeboard](https://github.com/codeboardio/codeboard). Deployment is not recommended due to old dependencies.*

# Codeboard

Codeboard is a web-based IDE to teach programming in the classroom. This is the core of the Codeboard web application. Part of the codeboard.io project.

### Requirements

Codeboard requires NodeJS, MySQL, MongoDB, and graphicsmagick (for resizing user profile pictures).

* Nodejs: tested with version 6.17.1
* MongoDB: tested with version 3.6.20
* Codeboard has been tested on an Ubuntu 16.04 system.


### Preparing the server

Installing node and npm:
```
wget https://nodejs.org/dist/v6.17.1/node-v6.17.1-linux-x64.tar.gz
sudo tar xf node-v6.17.1-linux-x64.tar.gz --directory /usr/local --strip-components 1
```

We need to install MySQL and create a database:
```
# Update packages and sources
sudo apt-get update

# Install MySQL and set the the root password
sudo apt-get install mysql-server

# Run a security script
sudo mysql_secure_installation
```

Then create the databases for codeboard and create a db user with limited privilges and a secure password:
```sql
CREATE SCHEMA `codeboard`;
CREATE SCHEMA `codeboard-test`;
CREATE USER `mysqlUser`@`localhost` IDENTIFIED BY 'mysqlPassword';
GRANT ALL PRIVILEGES ON `codeboard`.* TO `mysqlUser`@`localhost`;
GRANT ALL PRIVILEGES ON `codeboard-test`.* TO `mysqlUser`@`localhost`;
FLUSH PRIVILEGES;
```

We also need to install MongoDB:
```
wget https://repo.mongodb.org/apt/ubuntu/dists/xenial/mongodb-org/3.6/multiverse/binary-amd64/mongodb-org-server_3.6.20_amd64.deb
wget https://repo.mongodb.org/apt/ubuntu/dists/xenial/mongodb-org/3.6/multiverse/binary-amd64/mongodb-org-shell_3.6.20_amd64.deb
sudo dpkg -i mongodb-org-server_3.6.20_amd64.deb mongodb-org-shell_3.6.20_amd64.deb
sudo systemctl enable mongod
sudo systemctl start mongod
```

Create users for mongo databases:
```
use admin
db.system.version.insert({ "_id" : "authSchema", "currentVersion" : 3 })
use fullstack-dev
db.createUser({ user: "mongoUser", pwd: "mongoPassword", roles: [ "readWrite", "dbAdmin" ]});
use codeboardSession
db.createUser({ user: "mongoUser", pwd: "mongoPassword", roles: [ "readWrite", "dbAdmin" ]});
use codeboardLogs
db.createUser({ user: "mongoUser", pwd: "mongoPassword", roles: [ "readWrite", "dbAdmin" ]});
use codeboardLogs-test
db.createUser({ user: "mongoUser", pwd: "mongoPassword", roles: [ "readWrite", "dbAdmin" ]});
```

## Installing Codeboard

Clone the repository to your server
```
git clone https://github.com/codeboardio/codeboard.git
```

Change into the Codeboard folder and install all dependencies
```
cd codeboard

# Install all server dependencies
npm install 

# Make sure to have Bower installed
sudo npm install -g bower

# Install all client dependencies
bower install
```

Codeboard uses Grunt to automate various tasks. Make sure to have the Grunt-CLI installed
```
sudo npm install -g grunt-cli 
```

## Configuring Codeboard

Codeboard requires a number of settings, like database names, passwords, etc.
All those configurations must be set in the following files
```
lib/config/env/all.js
lib/config/env/development.js
lib/config/env/production.js
lib/config/env/test.js
```

## Run and Test Codeboard

Use the following command to run Codeboard (in development mode)
```
grunt serve
```

Build an optimize version for production deployment
```
# Will create a folder dist
grunt build 

cd dist
NODE_ENV=production node server.js
```

Test Codeboard
```
# run client-side tests
grunt test:client

# run server-side tests
grunt test:server
```


### Licensing
This project is available under the MIT license. See [LICENSE](https://github.com/codeboardio/mantra/blob/master/LICENSE) for the full license text.

_Important_: This project may use 3rd party software which uses others licenses. If you're planning to use this project, make sure your use-case complies with all 3rd party licenses.
