import React from "react";
import { Alert } from "react-native";
import { Container, Button, ButtonLabel } from "./styles";

export default function PanicButton() {
  function callHelp() {
    Alert.alert(
      "Atenção",
      "Você está prestes a solicitar socorro! Você tem certeza?",
      [
        {
          text: "Preciso de ajuda!",
          onPress: () =>
            Alert.alert(
              "Mensagem enviada",
              "Enviamos uma mensagem para as autoridades! Logo você será atendido!"
            ),
        },
        {
          text: "Cancelar",
          onPress: () => console.log("Cancelado"),
          style: "cancel",
        },
      ]
    );
  }
  return (
    <Container>
      <Button onPress={() => callHelp()}>
        <ButtonLabel>Botão de Pânico</ButtonLabel>
      </Button>
    </Container>
  );
}
