import { useIngredients } from "../context/IngredientsContext";

function HomePage() {
  const { data } = useIngredients();
  console.log(data);
  return (
    <main className="w-full">
      <div className="p-6">Hi</div>
    </main>
  );
}

export default HomePage;
