import styled from "styled-components/native";
import { Dimensions, Platform } from "react-native";
const { width: SCREEN_WIDTH } = Dimensions.get("screen");
const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? 20 : 0;

export const Container = styled.View`
  height: ${STATUS_BAR_HEIGHT}px;
  width: ${SCREEN_WIDTH}px;
  display: flex;

  background: #eeeeee;

  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  text-align: center;
  padding: ${STATUS_BAR_HEIGHT}px 10px 0px 10px;
`;
