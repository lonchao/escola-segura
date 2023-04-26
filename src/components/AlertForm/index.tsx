import React from "react";
import { Alert } from "react-native";
import { Container, Button, ButtonLabel } from "./styles";
import prompt from "react-native-prompt-android";

export default function AlertForm() {
  function openAlertForm() {
    console.log("openAlertForm");

    prompt(
      "Mensagem de alerta",
      "Avise sobre algo suspeito que esteja vivenciando",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Enviar",
          onPress: (text) => Alert.alert("Mensagem enviada: " + text),
        },
      ],
      {
        type: "plain-text",
        cancelable: false,
      }
    );

    // Alert.prompt(
    //   "Mensagem de alerta",
    //   "Avise sobre algo suspeito que esteja vivenciando",
    //   [
    //     {
    //       text: "Enviar",
    //       onPress: (text) => Alert.alert("Mensagem enviada: " + text),
    //     },
    //   ]
    // );
  }
  return (
    <Container>
      <Button onPress={() => openAlertForm()}>
        <ButtonLabel>Mensagem de alerta</ButtonLabel>
      </Button>
    </Container>
  );
}
