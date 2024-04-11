// import { useAuth } from "../contexts/AuthContext";
import supabase from "../config/supabaseClient";

// const { user, setUser, isAuthenticated, setIsAuthenticated } = useAuth();

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
}

export async function signup({ email, password }) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) {
    return null;
  } else {
    const { data, error } = await supabase.auth.getUser();
    console.log(data);
    if (error) {
      throw new Error(error.message);
    }
    return data?.user;
  }
}
