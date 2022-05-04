# What
* devServer.proxy need to be set in `frontend/webpack.config.js`
* proxy need to be set in `package.json` 
* If proxy is not working, we need to `rm -r package-lock.json node_modules`
* `concurrently` need to be installed in order to run both backend and frontend

# Init
```
npm init
npm install -g nodemon
npm install express pg typeorm
nodemon index.js
```

# Note
* Open browser and access `http://localhost:3000`
* it needs to copy local node_modules into container

# How to run
```
npm install 
npm start
```

# Run with docker
```
docker build -t myexp .
docker run -it --rm -p3000:3000 myexp
```

# Run with dockercompose
```
docker-compose build
docker-compose up
```

