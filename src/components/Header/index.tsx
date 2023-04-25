import React from "react";
import { Container, Logo } from "./styles";
import { Text } from "react-native";
export default function Header() {
  return (
    <Container>
      <Logo source={require("../../assets/img/headerLogo.png")} />
    </Container>
  );
}
