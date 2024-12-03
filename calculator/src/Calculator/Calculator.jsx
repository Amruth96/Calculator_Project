import React, { useReducer } from "react";
import './Cal.css' ;

// Initial state of the calculator
const initialState = {
  display: "0", // Display starts with "0"
  previousValue: null, // Stores the previous number for operations
  operator: null, // Operator for calculation (+, -, *, /)
};

// Reducer function to handle different actions
const calculatorReducer = (state, action) => {
  switch (action.type) {
    case "ADD_DIGIT":
      // Prevent leading zeros and add digits to the display
      if (state.display === "0" && action.payload === "0") {
        return state; // Prevent "00"
      }
      if (state.display === "0") {
        return { ...state, display: action.payload }; // Replace "0" with the first digit
      }
      return { ...state, display: state.display + action.payload }; // Append the digit

    case "CLEAR":
      return initialState; // Reset calculator to the initial state

    case "SET_OPERATOR":
      // Only set operator if the operator is not already set
      if (state.operator !== null) {
        return state; // Avoid changing the operator if already set
      }
      return {
        ...state,
        previousValue: state.display, // Store the current number as previous value
        operator: action.payload, // Set the operator
        display: "0", // Reset display to 0 for next number input
      };

    case "CALCULATE":
      // Perform calculation when "=" button is clicked
      if (state.operator && state.previousValue !== null) {
        let result;
        const prev = parseFloat(state.previousValue);
        const current = parseFloat(state.display);

        switch (state.operator) {
          case "+":
            result = prev + current;
            break;
          case "-":
            result = prev - current;
            break;
          case "*":
            result = prev * current;
            break;
          case "/":
            result = prev / current;
            break;
          default:
            return state;
        }

        // Return the result and reset previousValue and operator
        return { ...state, display: result.toString(), previousValue: null, operator: null };
      }
      return state;

    default:
      return state;
  }
};

const Calculator = () => {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  return (
    <div className="calculator">
      <div className="display">{state.display}</div>
      <div className="buttons">
        {/* Row 1 */}
        <button onClick={() => dispatch({ type: "CLEAR" })}>AC</button>
        <button onClick={() => dispatch({ type: "ADD_DIGIT", payload: "7" })}>7</button>
        <button onClick={() => dispatch({ type: "ADD_DIGIT", payload: "8" })}>8</button>
        <button onClick={() => dispatch({ type: "ADD_DIGIT", payload: "9" })}>9</button>
        <button onClick={() => dispatch({ type: "SET_OPERATOR", payload: "/" })}>/</button>
        {/* Row 2 */}
        <button onClick={() => dispatch({ type: "ADD_DIGIT", payload: "4" })}>4</button>
        <button onClick={() => dispatch({ type: "ADD_DIGIT", payload: "5" })}>5</button>
        <button onClick={() => dispatch({ type: "ADD_DIGIT", payload: "6" })}>6</button>
        <button onClick={() => dispatch({ type: "SET_OPERATOR", payload: "*" })}>*</button>
        {/* Row 3 */}
        <button onClick={() => dispatch({ type: "ADD_DIGIT", payload: "1" })}>1</button>
        <button onClick={() => dispatch({ type: "ADD_DIGIT", payload: "2" })}>2</button>
        <button onClick={() => dispatch({ type: "ADD_DIGIT", payload: "3" })}>3</button>
        <button onClick={() => dispatch({ type: "SET_OPERATOR", payload: "-" })}>-</button>
        {/* Row 4 */}
        <button onClick={() => dispatch({ type: "ADD_DIGIT", payload: "0" })}>0</button>
        <button onClick={() => dispatch({ type: "SET_OPERATOR", payload: "+" })}>+</button>
        <button onClick={() => dispatch({ type: "CALCULATE" })}>=</button>
      </div>
    </div>
  );
};

export default Calculator;
