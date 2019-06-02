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
