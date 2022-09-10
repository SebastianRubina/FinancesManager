import './App.css';
import { Data } from './Components/Data';
import Information from './Components/Information';
import CategoryCard from './Components/CategoryCard';
import React, { useState } from 'react';

function App() {

  const [selectedFile, setSelectedFile] = useState();
  const fileReader = new FileReader();

  const [total, setTotal] = useState(0);
  const [income, setIncome] = useState(0);

  const [sortedExpenses, setSortedExpenses] = useState({
    "groceries": 0,
    "rent": 0,
    "debt": 0,
    "dining": 0,
    "subscriptions": 0,
    "transportation": 0,
    "shopping": 0,
    "phone": 0,
    "deposits": 0,
    "savings": 0,
    "others": 0,
  })

  function handleSubmit(event) {
    event.preventDefault();
    fileReader.readAsText(selectedFile);
    fileReader.onload = () => {
      const lines = fileReader.result.split('\n').map((line) => line.split(','));
      for (const line of lines) {
          let newLine = createObject(line);
          Data.push(newLine);
      }
    }
    Data.pop();
    sortExpenses(Data);
    calculateTotals();
  }

  function changeHandler(event) {
      setSelectedFile(event.target.files[0]);
  }

  function createObject(line) {
      let newObject = {
          "date": line[0],
          "name": line[1],
          "charge": parseFloat(line[2]) > 0 ? parseFloat(line[2]) : 0,
          "deposit": parseFloat(line[3]) > 0 ? parseFloat(line[3]) : 0,
      };
      return newObject;
  }

  function sortExpenses(Data) {

    const groceries = ["INSTA", "WALMART", "JIAN HING", "DOLLARAMA", "SHOPPERS"];
    const dining = ["DOMINO", "FANTUAN", "UBER", "DD", "DOORDASH", "SKIPTHEDISHES"]
    const phone = ["FIDO"]
    const etransfer = ["E-TFR"]
    const shopping = ["AMAZON", "ETSY", "ALIEXPRESS", "AMZN", "IKEA", "G2A", "STEAM", "EPIC"]
    const transportation = ["PRESTO"]
    const subscriptions = ["SPOTIFY", "APPLE", "MICROSOFT", "SCRIMBA"]

    Data.map(expense => {
      if (nameInCategory(expense.name, groceries)) {
        setSortedExpenses(prevSortedExpenses => ({
          ...prevSortedExpenses,
          groceries: prevSortedExpenses.groceries += expense.charge
        }))
      } else if (nameInCategory(expense.name, dining)) {
        setSortedExpenses(prevSortedExpenses => ({
          ...prevSortedExpenses,
          dining: prevSortedExpenses.dining += expense.charge
        }))
      } else if (nameInCategory(expense.name, phone)) {
        setSortedExpenses(prevSortedExpenses => ({
          ...prevSortedExpenses,
          phone: prevSortedExpenses.phone += expense.charge
        }))
      } else if (nameInCategory(expense.name, shopping)) {
        setSortedExpenses(prevSortedExpenses => ({
          ...prevSortedExpenses,
          shopping: prevSortedExpenses.shopping += expense.charge
        }))      
      } else if (nameInCategory(expense.name, transportation)) {
        setSortedExpenses(prevSortedExpenses => ({
          ...prevSortedExpenses,
          transportation: prevSortedExpenses.transportation += expense.charge
        }))
      } else if (nameInCategory(expense.name, subscriptions)) {
        setSortedExpenses(prevSortedExpenses => ({
          ...prevSortedExpenses,
          subscriptions: prevSortedExpenses.subscriptions += expense.charge
        }))
      } else if (expense.name === "SSV TO:  03296162066") {
        setSortedExpenses(prevSortedExpenses => ({
          ...prevSortedExpenses,
          savings: prevSortedExpenses.savings += expense.charge
        }))
      } else if (nameInCategory(expense.name, etransfer)) {
        if (expense.charge === 1000) {
          setSortedExpenses(prevSortedExpenses => ({
            ...prevSortedExpenses,
            rent: prevSortedExpenses.rent += expense.charge
          }))
        } else if (expense.charge > 100) {
        setSortedExpenses(prevSortedExpenses => ({
          ...prevSortedExpenses,
          debt: prevSortedExpenses.debt += expense.charge
        })) 
        }
      } else {
        setSortedExpenses(prevSortedExpenses => ({
          ...prevSortedExpenses,
          others: prevSortedExpenses.others += expense.charge
        }))
      }
      return sortedExpenses;
    })
  }

  function nameInCategory(name, category) {
    let found = false;
    category.some (element => {
      if (name.includes(element)) {
        found = true;
      }
      return found;
    })
    return found;
  }

  function calculateTotals() {
    let tempTotal = 0;
    let tempDeposits = 0;
    for (let line of Data) {
      if (parseFloat(line.charge) > 0) tempTotal += parseFloat(line.charge);
      if (parseFloat(line.deposit) > 0) tempDeposits += parseFloat(line.deposit);
    }
    tempTotal = Math.round(tempTotal * 100) /100;
    tempDeposits = Math.round(tempDeposits * 100) / 100;
    
    setTotal(tempTotal);
    setIncome(tempDeposits);
  } 

  const categoryCards = Object.keys(sortedExpenses).map((item, i) => (
    <CategoryCard categoryName={item} expenseAmount={sortedExpenses[item]}/>
  ))

  return (
    <div className="App">
      <h1>File Input</h1>

      <label htmlFor="file--input">Upload a CSV</label>
      <input type="file" accept=".csv" name="file--input" id="file--input" 
          onChange={changeHandler}/>
      <button onClick={handleSubmit}>Submit</button>

      <Information
        Data={Data} 
        total={total} 
        deposits={income}
      />
      <button onClick={() => console.log(sortedExpenses)}>Console Log</button>
      <div className="category--cards--container">
        {categoryCards}
      </div>
    </div>
  );
}

export default App;
