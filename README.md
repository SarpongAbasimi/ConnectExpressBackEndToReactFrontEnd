<h1 align='center'>
  React Frontend And A Node/Express Backend.
</h1>

> My personal Learning goal this week was to learn how to test ``async`` application in ``javaScript`` and also learn how to connect an ``Express`` Application to a ``React Application``.

 <h1 align='center'>
   Was I Able To Achieve This Learning Goal?
</h1>

> A Big ``fat`` yes. Here is a [link](https://github.com/SarpongAbasimi/TestingWithJest) to my session with Makers coach Alice where I learnt about ``async`` testing.

> Now To The Big Question.

 <h1 align='center'>
   How did I connect React Applications To A Node/Express Backend
</h1>

-  To start, navigate to your desktop and ``mkdir ReactExpress``.
-  ``cd`` into the ``ReactExpress`` directory and type ``npm init -y `` to create a ``package.json``.
-  Now in terminal type ``npm install express`` to install express.
-  Also type in  terminal ``npm install concurrently --save``. ``This is used to start the express and react app at the same time``.
-  You might also need ``nodemon`` this will help you to avoid constantly reloading your server every time you make changes.
-  Now ``touch server.js``.
-  Inside ``server.js`` create a ``simple express app``.``Mine looked something like this``.

```javascript

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
});

const port = process.env.PORT || 5000

app.listen(port, ()=>{
  console.log(`Listening on Port ${port}`)
});

```

- To test the endpoint to verify what ``http://localhost:3001/api/data`` was returning I used ``postman`` .
- This was the request ``response``.

<img width="1278" alt="Screen Shot 2019-06-02 at 12 20 52" src="https://user-images.githubusercontent.com/37377831/58760527-f3fed780-8530-11e9-8585-3c76f3f4478b.png">

- Make sure you have the ``create-react-app-cli installed``.
- In terminal type ``npx create-react-app client``.
- cd into client.
- Inside of the ``package.json`` file in the client directory add a ``proxy``.

> Proxy so that when fetching the api, we don't type ``http://localhost:5000/api/data`` but rather ``api/data``.

- Make sure to set proxy to ``http://localhost:5000/`` which is the same as the port for the ``Express server``.
- Mine looks something like this.

```javascript

{
  "name": "client",
  "version": "0.1.0",
  "private": true,
  "proxy": "http://localhost:5000",
  "dependencies": {
    "react": "^16.8.6",
    "react-dom": "^16.8.6",
    "react-scripts": "3.0.1"
  }

```

- Now, inside of your react ``src`` directory ``delete everything``.
- Then, create an ``index.js`` and ``app.js`` file inside of the ``src`` directory.
- The ``index.js`` file should contain something like this.

```javascript

import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app';

ReactDOM.render(<App/>, document.getElementById('root'))

```

- The ``app.js`` file should contain something like this.

```javascript

import React from 'react';

export class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      list: []
    }
  }

  componentDidMount(){
   fetch('/api/data')
   .then(response => {
     if(response.ok){
       return response.json()
     }
     throw new Error('Request Failes');
   }, networkError => console.log(networkError.message))
   .then(jsonResponse => this.setState({list:jsonResponse}))
   .catch(rejection => console.log(`There was a rejection ${rejection}`));
  }

  render(){
    return(<div>
    <span> React And Express </span>
     {this.state.list.map(eachData => {
       return(<ul key={eachData.id}>
         <li>{eachData.name}</li>
       </ul>)
     })}
    </div>)
  }
}

```

> What is happening in the code above?.

- ``componentDidMount`` waits for the react component to ``mount`` and then it fetching the data from the ``/api/data`` api.
- The same api, that was built using ``express.js``.
- The data is then stored into ``list`` using this line ``then(jsonResponse => this.setState({list:jsonResponse}))``.
- The ``render`` function renders the results to the ``screen``.


> Now its time to user we ``concurrently``.

- ``cd .. `` to where you have your ``server.js``.
- Inside the ``package.json`` where in ``concurrently`` was saved, make these ``configurations``.
- Insde of ``scripts`` add ``"server": "nodemon server.js"`` , ``"client": "cd client && npm start" ``.
- Lastly add ``"dev": "concurrently \"npm run server\" \" npm run client\""``.

```javascript

  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "server": "nodemon server.js",
    "client": "cd client && npm start",
    "dev": "concurrently \"npm run server\" \" npm run client\""
  },

```

- Now in terminal type ``npm dev``
- This should start the ``server`` and ``react``.
- This is how I connected ``React`` to ``Express.js``.


<h1 align='center'>
  Incase oF This Error.
</h1>

<img width="1280" alt="Screen Shot 2019-06-02 at 10 34 10" src="https://user-images.githubusercontent.com/37377831/58760841-34605480-8535-11e9-86c6-a124b53dcee7.png">


- Check the fetch method.
- Make sure that ``return response.json()`` is being returned and not ``response.json()``.
- This might lead to a second Error.
  - 
<img width="1279" alt="Screen Shot 2019-06-02 at 10 35 18" src="https://user-images.githubusercontent.com/37377831/58760861-8e611a00-8535-11e9-8c6c-407d33e48e5a.png">

  - Nothing Shows up.
  - Make sure to ``restart the server``.
  - This should holpefully ``fix`` the problem.
