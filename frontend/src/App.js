import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Users from "./components/Users";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="nav">
          <Link to="/">Home</Link>
          <Link to="/users"> Users</Link>
        </div>
      </div>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/users" component={Users} />
      </Switch>
    </Router>
  );
}

export default App;
