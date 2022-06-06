# How 
```
npm install .
```

# Run
```
npm run build
npm run start
```

# Note
* `webpack` is used in this project
* use `dist`

## Run by docker
* run with dev server
```
docker build -f dev.server.dockerfile -t myreact .
docker run --rm -p9000:9000 -it myreact
```

* run with build and nginx
```
docker build -f build.nginx.dockerfile -t myreact .
docker run -it --rm -p80:80 myreact
```

