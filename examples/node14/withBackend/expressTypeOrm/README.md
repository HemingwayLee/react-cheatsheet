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

