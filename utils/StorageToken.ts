import * as SecureStore from "expo-secure-store";

export async function SaveToken(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export async function GetItemFromLocalStorage(key: string): Promise<string | null> {
  let result = await SecureStore.getItemAsync(key);
  return result;
}
