import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

import { AuthProvider } from "./context/auth";
import AuthRoute from './util/AuthRoute'


import MenuBar from "./components/MenuBar.js";
import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import SinglePost from './pages/SinglePost.js'
import UserPage from './pages/UserPage'

function App() {
  return (
    <AuthProvider>
      <Container>
        <Router>
          <MenuBar />
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
          <Route exact path ='/posts/:postId' component={SinglePost}></Route>
          <Route exact path ='/profile/:username' component={UserPage}></Route>
        </Router>
      </Container>
    </AuthProvider>
  );
}

export default App;
