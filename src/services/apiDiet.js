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

    let result;

    if (existingGuest) {
      // Update existing guest
      const { data: updatedGuest, error: updateError } = await supabase
        .from("guests")
        .update(addGuest)
        .eq("email", email)
        .select(); // Use `.select()` to return the updated record

      if (updateError) {
        throw new Error("Failed to update guest: " + updateError.message);
      }

      result = updatedGuest; // Return the updated guest data
    } else {
      // Insert new guest
      const { data: newGuest, error: insertError } = await supabase
        .from("guests")
        .insert([{ ...addGuest, email }])
        .select(); // Use `.select()` to return the inserted record

      if (insertError) {
        throw new Error("Failed to insert guest: " + insertError.message);
      }

      result = newGuest; // Return the new guest data
    }

    // Return the result to the caller
    return result;
  } catch (error) {
    throw new Error("Error in dietSubmission: " + error.message);
  }
}

export async function fetchMealsByEmail(email) {
  const { data, error } = await supabase
    .from("guests")
    .select("numMeals")
    .eq("email", email);

  if (error) {
    console.error("Error fetching data:", error);
  }

  return data;
}
