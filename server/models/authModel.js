import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
// For authentication, we need the ANON key, not service role key
// Service role key bypasses RLS and shouldn't be used for user auth
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_KEY;

if (!supabaseAnonKey) {
  console.error('Warning: SUPABASE_ANON_KEY not found in environment variables');
}

// Create Supabase client for authentication
// Use anon key for user authentication (respects RLS policies)
const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Authenticate user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} - User session and data
 */
export async function loginUser(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return {
    user: data.user,
    session: data.session,
  };
}

