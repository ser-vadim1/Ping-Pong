import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import { _Router } from "./components/Router/Router.jsx";
import { AuthLayout } from "./components/Auth";
import "./service/firebaseService";

function App() {
  return (
    <AuthLayout>
      <>
        <_Router />
      </>
    </AuthLayout>
  );
}

export default App;
