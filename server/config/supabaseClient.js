// config/supabaseClient.js

import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables from .env
dotenv.config();

// Read values from .env
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Create a single Supabase client instance for the whole server
const supabase = createClient(supabaseUrl, supabaseKey);

// Export it so models/controllers can use it
export default supabase;
