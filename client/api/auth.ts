import { supabase } from "./supabase";
import { assertResponseOk } from "./utils";

export async function signIn() {
  const response = await supabase.auth.signIn({
    provider: "twitter",
  });
  assertResponseOk(response);
  return response.session;
}

export async function signOut() {
  const response = await supabase.auth.signOut();
  assertResponseOk(response);
}
