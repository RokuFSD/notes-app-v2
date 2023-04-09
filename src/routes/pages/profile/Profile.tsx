import React from "react";
import Login from "./components/Login";
import Header from "./components/Header";
import Container from "./components/Container";

export function Profile() {
  return (
    <Container>
      <Header />
      <Login />
    </Container>
  );
}