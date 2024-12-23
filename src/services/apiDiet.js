import supabase from "./supabase";

async function getEmail() {
  let { data: guests, error } = await supabase.from("guests").select("email");
  if (error) {
    throw new Error("You have an Error");
  }
  return guests;
}

export async function dietSubmission({ addGuest, email }) {
  const emails = await getEmail();
  const isEmail = emails.find((e) => e.email === email);

  console.log("Supabase : ", addGuest);
  console.log(isEmail?.email);
  if (isEmail?.email) {
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
      console.log(error);
      throw new Error("Diet Recommendation could not be generated");
    }
  }
}
