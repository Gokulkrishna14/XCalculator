import styles from "./Calculator.module.css";
import Button from "../Buttons/Button";
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
                if(operand2 == 0){
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
                <Button text="7" onClick={() => handleClick("7")} />
                <Button text="8" onClick={() => handleClick("8")} />
                <Button text="9" onClick={() => handleClick("9")} />
                <Button text="+" onClick={() => handleClick("+")} />
                <Button text="4" onClick={() => handleClick("4")} />
                <Button text="5" onClick={() => handleClick("5")} />
                <Button text="6" onClick={() => handleClick("6")} />
                <Button text="-" onClick={() => handleClick("-")} />
                <Button text="1" onClick={() => handleClick("1")} />
                <Button text="2" onClick={() => handleClick("2")} />
                <Button text="3" onClick={() => handleClick("3")} />
                <Button text="*" onClick={() => handleClick("*")} />
                <Button text="C" onClick={() => handleClick("C")} />
                <Button text="0" onClick={() => handleClick("0")} />
                <Button text="=" onClick={() => handleClick("=")} />
                <Button text="/" onClick={() => handleClick("/")} />
            </div>
        </div>
    );
};

export default Calculator;
