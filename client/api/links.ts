import { parseMutationArgs } from "react-query/types/core/utils";
import { supabase } from "./supabase";
import { Link } from "./types";
import { assertResponseOk } from "./utils";

interface IsAvailableParams {
  slug: string;
}

export async function isAvailable({ slug }: IsAvailableParams) {
  if (!slug) {
    return false;
  }
  const response = await supabase.from("links").select("*").eq("slug", slug);
  assertResponseOk(response);
  return !response.data?.length;
}

interface CreateParams {
  slug: string;
  redirect_url: string;
  title: string;
  description: string;
  image: string;
  card_type: string;
}

export async function create(payload: CreateParams) {
  const response = await supabase
    .from<Link>("links")
    .insert({
      ...payload,
      profile_id: supabase.auth.user()?.id,
    })
    .single();
  assertResponseOk(response);
  return response.data;
}

interface ListParams {
  profile_id?: string;
}

export async function list(params: ListParams = {}) {
  let query = supabase.from<Link>("links").select("*");

  if (params.profile_id) {
    query = query.eq("profile_id", params.profile_id);
  }

  query = query.order("updated_at", { ascending: false });

  const response = await query;
  assertResponseOk(response);
  return response.data;
}

export async function getBySlug(slug: string) {
  const response = await supabase
    .from<Link>("links")
    .select("*")
    .eq("slug", slug)
    .single();
  assertResponseOk(response);
  return response.data;
}
