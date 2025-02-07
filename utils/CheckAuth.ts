import { GetItemFromLocalStorage } from "./StorageToken";

export async function CheckAuth(): Promise<boolean> {
  const token = await GetItemFromLocalStorage("token");
  return !!token; // Simplified return
}

export async function GetUserRole() {
  // Fetch user role from your backend or storage
  const user = await GetItemFromLocalStorage("role"); // Example function
  return user || null;
}
