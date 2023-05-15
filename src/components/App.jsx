import { Component } from "react";

import { Searchbar } from './Searchbar/Searchbar';



export class App extends Component {
  state = {
    query: '',
    page:1,
  }


  render() {
  
    return (
      <>
      <Searchbar/>
      </>
    )
  }
}