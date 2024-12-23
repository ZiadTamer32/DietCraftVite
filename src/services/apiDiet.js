import supabase from "./supabase";

export async function dietSubmission(email, addGuest) {
  console.log("email : ", email);
  console.log("addGuest : ", addGuest);
  if (email) {
    const { error } = await supabase
      .from("guests")
      .update(addGuest)
      .eq("email", email)
      .select()
      .single();
    if (error) {
      throw new Error("Diet Recommendation could not be generated");
    }
  } else {
    const { error } = await supabase.from("guests").insert([addGuest]);
    if (error) {
      throw new Error("Diet Recommendation could not be generated");
    }
  }
}
