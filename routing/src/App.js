import React from 'react'  
import UserForm from './UserForm'
import Nav from './Nav'
import About from './About'
import Shop from './Shop'
import Contact from './Contact'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

class App extends React.Component {  
  render() {  
    return (  
      <Router>
        <div className='App'>  
          <Nav/>
          <Routes>
          <Route path='/about' component={About} />
          <Route path='/shop' component={Shop} />
          <Route path='/contact' component={Contact} />
          </Routes>
        </div>  
      </Router>
    )  
  }  
}  
export default App