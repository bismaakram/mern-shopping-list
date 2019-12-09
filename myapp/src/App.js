import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AppNavbar from "./components/AppNavbar";
import ShoppingList from "./components/ShoppingList";
import { Provider } from "react-redux";
import { Container } from "reactstrap";
import store from "./store";
import ItemModal from "./components/ItemModal";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar></AppNavbar>
        <Container>
          <ItemModal></ItemModal>
          <ShoppingList></ShoppingList>
        </Container>
      </div>
    </Provider>
  );
}

export default App;
