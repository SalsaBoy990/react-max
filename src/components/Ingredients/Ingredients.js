import React, { useEffect, useState, useCallback } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";
import ErrorModal from "../UI/ErrorModal";

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    fetch(
      "https://react-get-started-cf552-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json"
    )
      .then((response) => response.json())
      .then((responseData) => {
        const loadedIngredients = [];
        for (const key in responseData) {
          loadedIngredients.push({
            id: key,
            title: responseData[key].title,
            amount: responseData[key].amount,
          });
        }

        setIngredients(loadedIngredients);
      });
  }, []); // like componentDidMount

  useEffect(() => {
    console.log("Rendering ingredient", ingredients);
  }, [ingredients]);

  const addIngredientHandler = (ingredient) => {
    setIsLoading(true);

    const part = "ingredients.json";
    fetch(
      "https://react-get-started-cf552-default-rtdb.europe-west1.firebasedatabase.app/" +
        part,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ingredient),
      }
    )
      .then((response) => {
        setIsLoading(false);
        return response.json();
      })
      .then((responseData) => {
        setIngredients((prevIngredients) => [
          ...prevIngredients,
          {
            id: responseData.name,
            ...ingredient,
          },
        ]);
      });
  };

  const removeIngredientHandler = (ingredientId) => {
    setIsLoading(true);

    const part = "ingredients";
    fetch(
      `https://react-get-started-cf552-default-rtdb.europe-west1.firebasedatabase.app/${part}/${ingredientId}.jso`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        setIsLoading(false);
        setIngredients((prevIngredients) => {
          /*const newIngredients = [...prevIngredients];
        const index = newIngredients.findIndex((ig) => ig.id === ingredientId);
        newIngredients.splice(index, 1);
        return newIngredients;*/
          return prevIngredients.filter(
            (ingredient) => ingredient.id !== ingredientId
          );
        });
      })
      .catch((error) => {
        setIsLoading(false);
        setError("Something went wrong!");
      });
  };

  // caches function, survives re-render cycles -> re-use old function
  // so, onLoadIngredients will not change in Search, triggering an infinite loop
  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    setIngredients(filteredIngredients);
  }, []);

  const onCloseHandler = () => {
    setIsLoading(false);
    setError(null);
  };

  return (
    <div className="App">
      {error && <ErrorModal onClose={onCloseHandler}>{error}</ErrorModal>}
      <IngredientForm
        addIngredientHandler={addIngredientHandler}
        loading={isLoading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        {/* Need to add list here! */}
        <IngredientList
          ingredients={ingredients}
          onRemoveItem={removeIngredientHandler}
        ></IngredientList>
      </section>
    </div>
  );
};

export default Ingredients;
