import React from "react";
import { Switch, Route } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../../utils/route";
import NavBarContainer from "../NavBar/NavBarContainer";
import MainContainer from "../Main/MainContainer";
import LoginContainer from "../Login/LoginContainer";
import RegisterContainer from "../Register/RegisterContainer";
import ChatContainer from "../Chat/ChatContainer";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <NavBarContainer />
      <Switch>
        <AuthRoute exact path="/" component={MainContainer} />
        <AuthRoute exact path="/login" component={LoginContainer} />
        <AuthRoute exact path="/register" component={RegisterContainer} />
        <ProtectedRoute exact path="/chat" component={ChatContainer} />
      </Switch>
    </div>
  );
};

export default App;
