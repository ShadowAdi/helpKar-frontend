import { GetTokenFromLocalStorage } from "./StorageToken";

export async function CheckAuth(): Promise<boolean> {
    const token = await GetTokenFromLocalStorage("token");
    return !!token; // Simplified return
  }