# How 
```
npm install .
```

## Install mui
```
npm install @mui/material @emotion/react @emotion/styled
```

# Run
```
npm run build
npm run start
```

# Note
* `webpack` is used in this project
* use `dist`
* `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.1.2/semantic.min.css"></link>` need to be in `index.html`
* `webpack` will add another script tag automatically, we don't need to add `bundle.js` script tag by ourself
  * otherwise, the onclick function in button tag will be disappear


## Run by docker
```
docker build -t myhello .
docker run -it --rm -p9000:9000 myhello
```


