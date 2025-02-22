import supabase from "./supabase";

export async function dietSubmission({ addGuest, email }) {
  try {
    // Check if the email exists in the guests table
    const { data: existingGuest, error: fetchError } = await supabase
      .from("guests")
      .select("email")
      .eq("email", email);

    if (fetchError) {
      throw new Error("Failed to fetch guest data: " + fetchError.message);
    }

    console.log("Existing Guest Data:", existingGuest); // Debugging log

    let result;

    if (existingGuest.length > 0) {
      // Check if the guest exists
      // Update existing guest
      const { data: updatedGuest, error: updateError } = await supabase
        .from("guests")
        .update(addGuest)
        .eq("email", email)
        .select();

      if (updateError) {
        throw new Error("Failed to update guest: " + updateError.message);
      }

      console.log("Updated Guest Data:", updatedGuest); // Debugging log
      result = updatedGuest;
    } else {
      // Insert new guest
      const { data: newGuest, error: insertError } = await supabase
        .from("guests")
        .insert([{ ...addGuest, email }])
        .select();

      if (insertError) {
        throw new Error("Failed to insert guest: " + insertError.message);
      }

      console.log("Inserted Guest Data:", newGuest); // Debugging log
      result = newGuest;
    }

    return result;
  } catch (error) {
    console.error("Error in dietSubmission:", error.message);
    throw error;
  }
}

export async function fetchDataByEmail(email) {
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("email", email);

  if (error) {
    console.error("Error fetching data:", error);
  }

  return data;
}
export async function getEmails() {
  const { data, error } = await supabase.from("guests").select("email");

  if (error) {
    console.error("Error fetching data:", error);
  }

  return data;
}

export async function updatePlan(email, addGuest) {
  const { data, error } = await supabase
    .from("guests")
    .update(addGuest)
    .eq("email", email);

  if (error) {
    console.error("Error updating data:", error);
  }

  return data;
}
