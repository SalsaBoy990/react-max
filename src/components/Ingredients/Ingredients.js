import React, { useEffect, useReducer, useCallback, useMemo } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";
import ErrorModal from "../UI/ErrorModal";

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case "SET":
      return action.ingredients;
    case "ADD":
      return [...currentIngredients, action.ingredient];
    case "DELETE":
      return currentIngredients.filter(
        (ingredient) => ingredient.id !== action.id
      );
    default:
      throw new Error("error");
  }
};

const httpReducer = (httpState, action) => {
  switch (action.type) {
    case "SEND":
      return { loading: true, error: null };
    case "RESPONSE":
      return { ...httpState, loading: false };
    case "ERROR":
      return { loading: false, error: action.errorMessage };
    case "CLEAR":
      return { loading: false, error: null };
    default:
      throw new Error("error");
  }
};

const Ingredients = () => {
  const [ingredients, dispatch] = useReducer(ingredientReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    loading: false,
    error: null,
  });

  useEffect(() => {
    console.log("Rendering ingredient", ingredients);
  }, [ingredients]);

  const addIngredientHandler = useCallback((ingredient) => {
    dispatchHttp({ type: "SEND" });

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
        dispatchHttp({ type: "RESPONSE" });
        return response.json();
      })
      .then((responseData) => {
        dispatch({
          type: "ADD",
          ingredient: {
            id: responseData.name,
            ...ingredient,
          },
        });
      });
  }, []);

  const removeIngredientHandler = useCallback((ingredientId) => {
    dispatchHttp({ type: "SEND" });

    const part = "ingredients";
    fetch(
      `https://react-get-started-cf552-default-rtdb.europe-west1.firebasedatabase.app/${part}/${ingredientId}.json`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        dispatchHttp({ type: "RESPONSE" });

        dispatch({
          type: "DELETE",
          id: ingredientId,
        });
      })
      .catch((error) => {
        dispatchHttp({ type: "ERROR", errorMessage: "Something went wrong!" });
      });
  }, []);

  // caches function, survives re-render cycles -> re-use old function
  // so, onLoadIngredients will not change in Search, triggering an infinite loop
  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    dispatch({ type: "SET", ingredients: filteredIngredients });
  }, []);

  const onCloseHandler = useCallback(() => {
    dispatchHttp({ type: "CLEAR" });
  }, []);

  const ingredientList = useMemo(() => {
    return (
      <IngredientList
        ingredients={ingredients}
        onRemoveItem={removeIngredientHandler}
      ></IngredientList>
    );
  }, [ingredients, removeIngredientHandler]);

  return (
    <div className="App">
      {httpState.error && (
        <ErrorModal onClose={onCloseHandler}>{httpState.error}</ErrorModal>
      )}
      <IngredientForm
        addIngredientHandler={addIngredientHandler}
        loading={httpState.loading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        {/* Need to add list here! */}
        {ingredientList}
      </section>
    </div>
  );
};

export default Ingredients;
