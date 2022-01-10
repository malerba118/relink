import { supabase } from "./supabase";
import { assertResponseOk } from "./utils";

export async function signIn() {
  const response = await supabase.auth.signIn(
    {
      provider: "twitter",
    },
    {
      redirectTo:
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : "https://relink.page",
    }
  );
  assertResponseOk(response);
  return response.session;
}

export async function signOut() {
  const response = await supabase.auth.signOut();
  assertResponseOk(response);
}
