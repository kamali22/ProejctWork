import React from "react";

class App extends React.Component {
   constructor() {
      super();
      this.state = { value: 'Hello World' };
   }

   handleChange = (e) => {
      console.log(this.state.value);
      this.setState({ value: e.target.value });
   };

   render() {
     return (
       <div>
          <p>Hello Kamali</p>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          <p>{this.state.value}</p>
       </div>
     );
   }
} 

class HelloWorld extends React.Component {
   render() {
      return (
         <div>
            <h1>Hello World!</h1>
            <App />
         </div>
      );
   }
}
export default HelloWorld;