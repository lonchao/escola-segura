import React from "react";
import { Alert } from "react-native";
import { Container, Button, ButtonLabel } from "./styles";

export default function AlertForm() {
  function openAlertForm() {
    Alert.prompt(
      "Mensagem de alerta",
      "Avise sobre algo suspeito que esteja vivenciando",
      [
        {
          text: "Enviar",
          onPress: (text) => Alert.alert("Mensagem enviada: " + text),
        },
      ],
      "plain-text",
      ""
    );
  }
  return (
    <Container>
      <Button onPress={() => openAlertForm()}>
        <ButtonLabel>Mensagem de alerta</ButtonLabel>
      </Button>
    </Container>
  );
}
