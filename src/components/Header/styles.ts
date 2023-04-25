import styled from "styled-components/native";
import { Dimensions, Platform } from "react-native";
const { width: SCREEN_WIDTH } = Dimensions.get("screen");
const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? 44 : 20;

export const Logo = styled.Image.attrs({
  resizeMode: "contain",
})`
  width: ${SCREEN_WIDTH}px;
  height: 40px;
  margin-bottom: 10px;
`;
export const Container = styled.View`
  height: ${STATUS_BAR_HEIGHT + 64}px;
  width: ${SCREEN_WIDTH}px;
  display: flex;

  background: #fff;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  text-align: center;
  padding: ${STATUS_BAR_HEIGHT}px 10px 0px 10px;
`;
