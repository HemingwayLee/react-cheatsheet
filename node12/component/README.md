# How to run
```
./build_script.sh
```

# Access Website
http://127.0.0.1:3000/

## port
The port number is defined in `webpack.config.js`

## Run on 0.0.0.0
add `--host 0.0.0.0 --port 3000` in package.json

# Run inside docker
```
docker build -t mycom .
docker run -it --rm -p 3000:3000 mycom
```

# Demo
* `Header` component and `TableRow` component used in this demo
```jsx
<div>
  <Header/>
  <table>
    <tbody>
      {this.state.data.map((person, i) => 
        <TableRow key={i} data={person} />)}
    </tbody>
  </table>
</div>
```