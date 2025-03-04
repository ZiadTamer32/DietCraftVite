import { data } from "react-router-dom";
import supabase from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data?.user;
}

export async function signUp({ email, password, firstName, lastName }) {
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { firstName, lastName } }
  });
  if (error) {
    console.error("Sign up failed:", error.message);
    return { error: error.message };
  }

  return { data, error: null };
}

export async function signOut() {
  let { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}
