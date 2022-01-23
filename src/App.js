import { useState } from "react";
import { 
  BrowserRouter as Router,
  Switch,
  Route } from "react-router-dom";
import PrivateRoute from "./component/PrivateRoute" ;
import TwitterPage from './pages/TwitterPage';
import NewsPage from './pages/NewsPage';
import UserProfilePage from "./pages/UserProfile";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import NewsCrawl from "./pages/NewsCrawl";
import './App.css'
// import Navbar from "./component/Navbar";



function App() {
  const[isAutheticated] = useState(localStorage.token ? true : false)
  
  return (
    <div className="App">
    <Router>
      {/* <Navbar /> */}
        <Switch>
          <div>
              <PrivateRoute exact path="/" component={TwitterPage} auth={isAutheticated} />
              <Route path="/login" component={LoginPage} exact />
              <Route path="/signup" component={SignUpPage} exact/>
              {/* <PrivateRoute path="/twittercrawl" component={} auth={isAutheticated} /> */}
              <PrivateRoute path="/news" component={NewsPage} />
              <PrivateRoute path="/user" component={UserProfilePage} auth={isAutheticated} />
              <PrivateRoute path="/newscrawl" component={NewsCrawl} auth={isAutheticated} />
          </div>
        </Switch>
    </Router>
      
    </div>
  );
}

export default App;
