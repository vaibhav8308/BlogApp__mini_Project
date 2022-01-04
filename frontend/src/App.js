import Topbar from "./components/Topbar/Topbar";
import Home from "./components/Item/home/Home";
import Single from "./components/Item/single/Single";
import CreateBlog from "./components/Item/createBlog/CreateBlog";
import Settings from "./components/Item/settings/Settings";
import Login from "./components/Item/login/Login";
import Register from "./components/Item/register/Register";
import React from "react";
import { Context } from "./contex.js/Contex";
import { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {

const {user}=useContext(Context);
  return (
    <Router>
  <Topbar/>
  <Switch>
  <Route exact path="/">
            <Home />
  </Route>
  <Route exact path="/register">
            {user ? <Home/>:<Register />}
  </Route>
  <Route path="/login">
  {user ? <Home/>:<Login />}
  </Route>
  <Route path="/createBlog">
  {user ? <CreateBlog/>:<Register />}
  </Route>
  <Route path="/settings">
  {user ? <Settings/>:<Register />}
  </Route>
  <Route path="/post/:postId">
            <Single />
  </Route>
  </Switch>

  
  </Router>
  );
}

export default App;
