import { supabase } from "./supabase";
import { assertResponseOk } from "./utils";

interface IsAvailableParams {
  subdomain: string;
  slug: string;
}

export async function isAvailable({ subdomain, slug }: IsAvailableParams) {
  if (!subdomain || !slug) {
    return false;
  }
  const response = await supabase
    .from("links")
    .select("*")
    .eq("subdomain", subdomain)
    .eq("slug", slug);
  assertResponseOk(response);
  return !response.data?.length;
}

interface CreateParams {
  subdomain: string;
  slug: string;
  redirect_url: string;
  title: string;
  description: string;
  image: string;
  card_type: string;
}

export async function create(payload: CreateParams) {
  const response = await supabase
    .from("links")
    .insert({
      ...payload,
      profile_id: supabase.auth.user()?.id,
    })
    .single();
  assertResponseOk(response);
  return !response.data;
}
