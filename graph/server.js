const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'src')))
console.log(__dirname)
app.get("/graphFile", (req, res) => {
    res.sendFile("index.html", { root: __dirname + "/src"});
});

app.listen(8080, () => console.log('Example app listening on port 8080!'));
