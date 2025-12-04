import supabase from '../config/supabaseClient.js';

export async function getAllProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
