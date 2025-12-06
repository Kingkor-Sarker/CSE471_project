import supabase from '../config/supabaseClient.js';

/**
 * Get user profile by ID
 * @param {string} userId - User ID
 * @returns {Promise<Object>} - Profile data
 */
export async function getProfileById(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null; // Profile not found
    }
    throw new Error(error.message);
  }

  return data;
}

/**
 * Update user profile
 * @param {string} userId - User ID
 * @param {Object} profileData - Profile data to update
 * @returns {Promise<Object>} - Updated profile data
 */
export async function updateProfile(userId, profileData) {
  // First check if profile exists
  const existingProfile = await getProfileById(userId);

  let result;

  if (!existingProfile) {
    // Create new profile if it doesn't exist
    const { data, error } = await supabase
      .from('profiles')
      .insert({
        id: userId,
        ...profileData,
      })
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    result = data;
  } else {
    // Update existing profile
    const { data, error } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    result = data;
  }

  return result;
}

