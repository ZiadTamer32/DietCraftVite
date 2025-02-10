import supabase from "./supabase";

export async function dietSubmission({ addGuest, email }) {
  try {
    // Check if the email exists in the guests table
    const { data: existingGuest, error: fetchError } = await supabase
      .from("guests")
      .select("email")
      .eq("email", email)
      .single();

    // Handle fetch errors (excluding "no rows found" error)
    if (fetchError && fetchError.code !== "PGRST116") {
      throw new Error("Failed to fetch guest data: " + fetchError.message);
    }

    if (existingGuest) {
      // Update existing guest
      const { error: updateError } = await supabase
        .from("guests")
        .update(addGuest)
        .eq("email", email);

      if (updateError) {
        throw new Error("Failed to update guest: " + updateError.message);
      }
    } else {
      // Insert new guest
      const { error: insertError } = await supabase
        .from("guests")
        .insert([{ ...addGuest, email }]); // Ensure email is included in the insert

      if (insertError) {
        throw new Error("Failed to insert guest: " + insertError.message);
      }
    }
  } catch (error) {
    throw new Error("Error in dietSubmission: " + error.message);
  }
}
