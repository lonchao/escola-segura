import React, { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { wpApi } from "../../services/api";
import AlertForm from "../../components/AlertForm";
import PanicButton from "../../components/PanicButton";

import { storeData, getData } from "../../services/session";
import {
  ButtonLogin,
  LabelLogin,
  LabelName,
  LabelUserContainer,
  LabelUserInfo,
  Container,
} from "./style";
WebBrowser.maybeCompleteAuthSession();

export interface IUserInfo {
  name: string;
  email: string;
  online: boolean;
  escola_vinculada: number;
  telefone: string;
  estado: string;
}
export interface IVerifyUserParams {
  email: string;
}

export default function AuthValidator() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    // expoClientId:
    //   "468939357617-crv2ftgoq8otsd3v2e8n3heintenc2lh.apps.googleusercontent.com",
    // clientSecret: "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",
    androidClientId:
      "468939357617-8m4hlc82cqcm3809l23g9cs3lppov8og.apps.googleusercontent.com",
    iosClientId: "GOOGLE_GUID.apps.googleusercontent.com",
  });

  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);

  useEffect(() => {
    if (response?.type === "success" && response.authentication) {
      setToken(response.authentication.accessToken);
      getUserInfo();
    }
  }, [response, token]);

  useEffect(() => {
    async function loadInformation() {
      const userData = await getData({ key: "USER", type: "JSON" });
      if (userData && userData.email) {
        const userWp = await verifyUser({ email: userData.email });

        userData.online = userWp.online;
        userData.telefone = userWp.telefone;
        userData.estado = userWp.estado;
        userData.escola_vinculada = userWp.escola_vinculada;

        setUserInfo(userData);
      }
    }
    loadInformation();
  }, []);

  const verifyUser = async ({ email }: IVerifyUserParams) => {
    const response = await wpApi.get(
      `usuarios-app?meta_key=email&meta_value=${email}`
    );
    if (response.data[0]) {
      const user = response.data[0];
      return {
        online: true,
        escola_vinculada: user.acf.escola_vinculada,
        telefone: user.acf.telefone,
        estado: user.acf.estado,
      };
    } else {
      return {
        online: false,
        escola_vinculada: 0,
        telefone: "",
        estado: "",
      };
    }
  };
  const getUserInfo = async () => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user: IUserInfo = await response.json();
      const userWp = await verifyUser({ email: user.email });

      user.online = userWp.online;
      user.telefone = userWp.telefone;
      user.estado = userWp.estado;
      user.escola_vinculada = userWp.escola_vinculada;

      console.log("user", user);
      if (user.email) {
        storeData({ key: "USER", type: "JSON", value: user });
        setUserInfo(user);
      }
    } catch (error) {
      // Add your own error handler here
    }
  };

  return (
    <Container>
      {userInfo === null ? (
        <>
          <LabelLogin>
            Você precisa realizar login para poder utilizar o sistema de
            segurança
          </LabelLogin>
          <ButtonLogin
            title="Logar com Google"
            disabled={!request}
            onPress={() => {
              promptAsync();
            }}
          />
        </>
      ) : (
        <>
          <LabelUserContainer>
            <LabelUserInfo> Olá </LabelUserInfo>
            <LabelName>{userInfo?.name}</LabelName>
          </LabelUserContainer>
          {userInfo.online ? (
            <>
              <AlertForm />
              <PanicButton />
            </>
          ) : (
            <LabelUserContainer>
              <LabelUserInfo> Usuário não autorizado ainda </LabelUserInfo>
            </LabelUserContainer>
          )}
        </>
      )}
    </Container>
  );
}
