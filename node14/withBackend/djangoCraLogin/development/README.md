# What
* proxy can NOT to be set in `package.json`, we need `http-proxy-middleware` with `CRA` 
* If proxy is not working, we need to `rm -r package-lock.json node_modules`
* `concurrently` need to be installed in order to run both backend and frontend
* Auto reload feature is there
* when proxy setting works, it still send to `http://127.0.0.1:3000/` first, and then redirect to `http://127.0.0.1:8000/`

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

