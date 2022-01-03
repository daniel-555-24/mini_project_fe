import { Switch, Route } from "react-router-dom";
import TwitterPage from './pages/TwitterPage';
import NewsPage from './pages/NewsPage';
import UserProfilePage from "./pages/UserProfile";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" component={TwitterPage} exact />
        <Route path="/login" component={LoginPage} exact />
        <Route path="/signup" component={SignUpPage} exact />
        <Route path="/news" component={NewsPage} exact />
        <Route path="/user" component={UserProfilePage} exact />
      </Switch>
    </div>
  );
}

export default App;
