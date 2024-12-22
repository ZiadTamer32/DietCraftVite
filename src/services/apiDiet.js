// import { supabase } from "./supabase";

export async function dietSubmission(formState) {
  const addGuest = {
    age: +formState.age,
    height: +formState.height,
    weight: +formState.weight,
    numMeals: +formState.meals_per_day,
    bodyFat: +formState.bodyFat,
    gender: formState.gender,
    activity: formState.activity,
    plan: formState.plan,
    dietDuration: formState.duration
  };
  console.log("New Guest : ", addGuest);
  // if (guestId) {
  //   const { error } = await supabase
  //     .from("guests")
  //     .update(addGuest)
  //     .eq("id", guestId)
  //     .select()
  //     .single();
  //   if (error) {
  //     throw new Error("Diet Recommendation could not be generated");
  //   }
  // } else {
  //   const { error } = await supabase.from("guests").insert([addGuest]);
  //   if (error) {
  //     throw new Error("Diet Recommendation could not be generated");
  //   }
  // }
}
