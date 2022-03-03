const express = require("express");

const app = express();
app.get('/', (request, response) => {
    response.send({message: "Hello Word",
currentTime: new Date().toISOString()});
});

app.listen(3000, () => {
    console.log("Server running at port 3000");
});