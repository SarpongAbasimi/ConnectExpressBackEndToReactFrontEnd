const express = require('express')
,app = express()
,path = require('path');


app.get('/api/data', (req, res)=>{
  const data =[
    {id: 1, name: "React"},
    {id: 2, name: "Express", day: "2nd June 2019"},
    {id: 3, name: "Postman"}
  ];

  res.json(data)
})


app.get("*", (req, res)=>{
  const sendPath = path.dirname(__dirname + '/client/public/index.html')
  res.sendFile(sendPath);
});

const port = process.env.PORT || 5000

app.listen(port, ()=>{
  console.log(`Listening on Port ${port}`)
});