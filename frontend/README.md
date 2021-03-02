     import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Users from "./components/Users";
    
    
<Router>
    <div className="App">
    <Link to="/">Home</Link>
    <Link to="/users"> Users</Link>
    </div>

    <Switch>
    <Route path="/users" component={Users} />
    </Switch>
</Router>