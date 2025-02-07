import { useParams } from "react-router-dom";
import { useRecipes } from "../../context/RecipesContext";
import Spinner from "../../ui/Spinner";
import InstructionsList from "../../ui/InstructionsList";

function RecipeDetails() {
  const { id } = useParams();
  const { getRecipeById, isLoading } = useRecipes();
  const dessert = getRecipeById(id);

  if (isLoading) return <Spinner />;
  if (!dessert) return <p>Recipe not found</p>;
  console.log(dessert);
  const {
    Name,
    Images = [],
    TotalTime,
    PrepTime,
    CookTime,
    Calories,
    FatContent,
    CarbohydrateContent,
    ProteinContent,
    RecipeInstructions = [],
    RecipeIngredientParts = []
  } = dessert;

  return (
    <div className="grid grid-cols-1 gap-6 p-4 sm:gap-8 sm:p-6 md:p-8 md:grid-cols-2">
      {/* Left Column: Image & Title */}
      <div className="flex flex-col justify-center">
        <img
          src={Images[0]}
          alt={Name}
          className="object-cover w-full h-auto rounded-lg sm:h-72 md:h-80"
        />

        <div className="py-4 my-4">
          <h1 className="mb-2 text-2xl font-bold">{Name}</h1>
          <p className="text-gray-600">
            A simple and delicious dish, perfect for any occasion. This classic
            recipe is quick to prepare and can be customized with your favorite
            ingredients, making it a versatile and satisfying meal.
          </p>
        </div>

        {/* Preparation Time */}
        <div className="p-4 bg-gray-300 rounded-lg">
          <h3 className="font-semibold">Preparation Time</h3>
          <ul className="text-sm text-gray-600">
            {TotalTime && (
              <li className="my-3">
                <strong>Total:</strong> {TotalTime} minutes
              </li>
            )}
            {PrepTime && (
              <li className="my-3">
                <strong>Preparation:</strong> {PrepTime} minutes
              </li>
            )}
            {CookTime && (
              <li className="mt-3">
                <strong>Cooking:</strong> {CookTime} minutes
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Right Column: Ingredients & Instructions */}
      <div className="flex flex-col justify-between gap-6">
        <InstructionsList title="Instructions" data={RecipeInstructions} />
        <InstructionsList title="Ingredients" data={RecipeIngredientParts} />

        {/* Nutrition Facts */}
        <div>
          <h2 className="text-xl font-semibold">Nutrition:</h2>
          <div className="mt-2 text-gray-700">
            <p>
              <strong>Calories:</strong> {Calories} kcal
            </p>
            <p>
              <strong>Carbs:</strong> {CarbohydrateContent} g
            </p>
            <p>
              <strong>Protein:</strong> {ProteinContent} g
            </p>
            <p>
              <strong>Fat:</strong> {FatContent} g
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
