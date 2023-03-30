import "./App.css";
import ExpenseForm from "./componenets/ExpenseForm";
import ExpenseList from "./componenets/ExpenseList";
import uuid from "react-uuid";
import { useEffect, useState } from "react";

const initialExpenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];

function App() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState("");
  const [edit, setEdit] = useState(false); //edit
  const [id, setId] = useState(0); // edit item
  const [alert, setAlert] = useState({ show: false, value: "" });

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const handleCharge = (e) => {
    setCharge(e.target.value);
  };

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      if (edit) {
        let tempExpense = expenses.map((item) => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(tempExpense);
        setAlert({ show: true, value: "Item edited successfully." });
        setTimeout(() => {
          setAlert({ show: false, value: "" });
        }, 3000);
        setEdit(false);
      } else {
        const singleExpense = { id: uuid(), charge, amount };
        setExpenses([...expenses, singleExpense]);
        setAlert({ show: true, value: "Item added successfully." });
        setTimeout(() => {
          setAlert({ show: false, value: "" });
        }, 3000);
      }
      setCharge("");
      setAmount("");
    } else {
      //handleALert called
      setAlert({ show: true, value: "Please enter valid inputs." });
      setTimeout(() => {
        setAlert({ show: false, value: "" });
      }, 3000);
    }
  };

  //Clear  all items
  const clearItems = () => {
    setExpenses([]);
    setAlert({ show: true, value: "All Items deleted successfully." });
    setTimeout(() => {
      setAlert({ show: false, value: "" });
    }, 3000);
  };

  //Delete single item, edit single item
  const handleDelete = (id) => {
    let tempExpenses = expenses.filter((item) => item.id !== id);
    setExpenses(tempExpenses);
    setAlert({ show: true, value: "Item deleted successfully." });
    setTimeout(() => {
      setAlert({ show: false, value: "" });
    }, 3000);
  };

  //Delete single item, edit single item
  const handleEdit = (id) => {
    let expense = expenses.find((item) => item.id === id);
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  };

  return (
    <div className="main-container">
      <div className="container-one">
        {alert.show && <h4 className="alert">{alert.value}</h4>}
        <h1>Expense Calculator</h1>
        <main className="container-two">
          <ExpenseForm
            charge={charge}
            amount={amount}
            handleAmount={handleAmount}
            handleCharge={handleCharge}
            handleOnSubmit={handleOnSubmit}
            edit={edit}
          />
          <ExpenseList
            expenses={expenses}
            clearItems={clearItems}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </main>
        <h2>
          Toal spends :{" "}
          <span className="total">
            $
            {expenses.reduce((acc, curr) => {
              return (acc += parseInt(curr.amount));
            }, 0)}
          </span>
        </h2>
      </div>
    </div>
  );
}

export default App;
