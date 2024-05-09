import styles from "./Calculator.module.css";
import { useState } from "react";

const Calculator = () => {
    const [values, setValues] = useState("");
    const [output, setOutput] = useState("");

    const handleClick = (value) => {
        if (value === "=") {
            if (!values) {
                setOutput("Error");
                return;
            }

            try {
                const result = expression(values);
                setOutput(result.toString());
            } catch (error) {
                setOutput("Error");
            }
        } else if (value === "C") {
            setValues("");
            setOutput("");
        } else {
            setValues((prevValues) => prevValues + value);
        }
    };

    const performOperation = (operand1, operator, operand2) => {
        switch (operator) {
            case "+":
                return operand1 + operand2;
            case "-":
                return operand1 - operand2;
            case "*":
                return operand1 * operand2;
            case "/":
                if (operand1 === 0) {
                    setOutput("NaN");
                    return NaN;
                }
                if (operand2 === 0) {
                    setOutput("Infinity");
                    return Infinity;
                }
                return operand1 / operand2;
            default:
                throw new Error("Invalid operator");
        }
    };

    const expression = (input) => {
        let result = 0;
        let operator = "+";
        let currentNumber = "";
        let tempResult = 0;
        let tempOperator = "+";

        for (let i = 0; i < input.length; i++) {
            const char = input.charAt(i);

            if(/[0-9]/.test(char)) {
                currentNumber += char;
            } else if(/[+\-*\/]/.test(char)) {
                tempResult = performOperation(tempResult, tempOperator, Number(currentNumber));
                if (char === "+" || char === "-") {
                    result = performOperation(result, operator, tempResult);
                    operator = char;
                    tempResult = 0;
                    tempOperator = "+";
                } else {
                    tempOperator = char;
                }
                currentNumber = "";
            } else {
                throw new Error("Invalid character in expression");
            }
        }

        tempResult = performOperation(tempResult, tempOperator, Number(currentNumber));
        result = performOperation(result, operator, tempResult);
        return result;
    };

    return (
        <div className={styles.container}>
            <h1>React Calculator</h1>
            <input type="text" value={values} readOnly />
            {output && <div className={styles.output}>{output}</div>}
            <div className={styles.typepad}>
                <button className={styles.button} onClick={() => handleClick("7")}>7</button>
                <button className={styles.button} onClick={() => handleClick("8")}>8</button>
                <button className={styles.button} onClick={() => handleClick("9")}>9</button>
                <button className={styles.button} onClick={() => handleClick("+")}>+</button>
                <button className={styles.button} onClick={() => handleClick("4")}>4</button>
                <button className={styles.button} onClick={() => handleClick("5")}>5</button>
                <button className={styles.button} onClick={() => handleClick("6")}>6</button>
                <button className={styles.button} onClick={() => handleClick("-")}>-</button>
                <button className={styles.button} onClick={() => handleClick("1")}>1</button>
                <button className={styles.button} onClick={() => handleClick("2")}>2</button>
                <button className={styles.button} onClick={() => handleClick("3")}>3</button>
                <button className={styles.button} onClick={() => handleClick("*")}>*</button>
                <button className={styles.button} onClick={() => handleClick("C")}>C</button>
                <button className={styles.button} onClick={() => handleClick("0")}>0</button>
                <button className={styles.button} onClick={() => handleClick("=")}>=</button>
                <button className={styles.button} onClick={() => handleClick("/")}>/</button>
            </div>
        </div>
    );
};

export default Calculator;
