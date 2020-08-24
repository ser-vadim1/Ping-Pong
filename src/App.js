import React from "react";
import "../src/App.css";
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
