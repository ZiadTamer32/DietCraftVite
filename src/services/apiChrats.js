import supabase from "./supabase";

export async function getFakeData() {
  let { data: fakeDataAsApi, error } = await supabase
    .from("fakeData")
    .select("*");
  if (error) {
    console.error("Error fetching data:", error);
  }
  return fakeDataAsApi;
}
