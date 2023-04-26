import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUserInfo } from "../../components/AuthValidator";

interface IStoreDataParams {
  value: string | IUserInfo;
  key: string;
  type: string;
}
interface IGetDataParams {
  key: string;
  type: string;
}

export const storeData = async ({ value, key, type }: IStoreDataParams) => {
  try {
    if (type === "JSON") {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`@${key}`, jsonValue);
    } else {
      await AsyncStorage.setItem(`@${key}`, value.toString());
    }
  } catch (e) {
    // saving error
  }
};
export const getData = async ({ key, type }: IGetDataParams) => {
  try {
    let value;
    if (type === "JSON") {
      const jsonValue = await AsyncStorage.getItem(`@${key}`);
      value = jsonValue != null ? JSON.parse(jsonValue) : null;
    } else {
      value = await AsyncStorage.getItem(`@${key}`);
    }
    return value;
  } catch (e) {
    // saving error
  }
};
