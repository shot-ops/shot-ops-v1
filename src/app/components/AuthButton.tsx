"use client";

import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "../utils/supabase/server";

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) setUser(user);
    };
    fetchUser();
  }, []);

  const handleLogin = async () => {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) console.error("Login error:", error.message);
  };

  const handleLogout = async () => {
    const supabase = await createClient();
    await supabase.auth.signOut();
    setUser(null);
  };

  return user ? (
    <div>
      <p>Welcome, {user.email}!</p>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-600 text-white rounded"
      >
        Sign Out
      </button>
    </div>
  ) : (
    <button
      onClick={handleLogin}
      className="px-4 py-2 bg-blue-600 text-white rounded"
    >
      Sign in with Google
    </button>
  );
}
