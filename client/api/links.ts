import { supabase } from "./supabase";
import { assertResponseOk } from "./utils";

interface IsAvailableParams {
  subdomain: string;
  slug: string;
}

export async function isAvailable({ subdomain, slug }: IsAvailableParams) {
  const response = await supabase
    .from("links")
    .select("*")
    .eq("slug", slug)
    .eq("subdomain", subdomain);
  assertResponseOk(response);
  return !response.data?.length;
}
