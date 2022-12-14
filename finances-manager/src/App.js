import './App.css';
import './Styles/Reset.css';
import { Data, resetData } from './Components/Data';
import { groceries, groceriesRefunds, dining, phone, etransfer, shopping, transportation, subscriptions, savings } from './Components/Categories';
import { sortExpenses, calculateTotals, createObject } from './Components/Functions';
import Information from './Components/Information';
import CategoryCard from './Components/CategoryCard';
import Transaction from './Components/Transaction';
import React, { useState } from 'react';
import { useEffect } from 'react';

function App() {


  const [selectedFile, setSelectedFile] = useState();
  const fileReader = new FileReader();

  const [total, setTotal] = useState(0);
  const [income, setIncome] = useState(0);

  const [displayedTransactions, setDisplayedTransactions] = useState([]);

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
    resetData(setTotal, setIncome, setSortedExpenses);
    const startSubmission = () => new Promise ((resolve, reject) => {
      try {
      fileReader.readAsText(selectedFile);
      } catch(err) {
        reject("No File Selected");
      }
      resolve();
    });

    startSubmission()
    .then(() => new Promise ((resolve, reject) => fileReader.onload = () => {
      const lines = fileReader.result.split('\n').map((line) => line.split(','));
      for (const line of lines) {
        let newLine;
          newLine = createObject(line);
          Data.push(newLine);
      }
      resolve();
    }))
    .then(() => {
      Data.pop()
    })
    .then(() => {
      sortExpenses(Data, sortedExpenses, setSortedExpenses, groceries, groceriesRefunds, dining, 
                   phone, etransfer, shopping, transportation, subscriptions, savings);
    })
    .then(() => {
      calculateTotals(Data, setTotal, setIncome)
      setDisplayedTransactions(() => Data.filter((transaction) => transaction.charge > 0 && transaction.category));
    })
    .catch((err) => {
      console.log("ERROR: " + err);
    });
  }

  useEffect(() => {
    console.log("Changes");
  }, [displayedTransactions])

  function changeHandler(event) {
    setSelectedFile(event.target.files[0]);
  }

  const categoryCards = Object.keys(sortedExpenses).map((item, i) => (
    <CategoryCard key={item} categoryName={item} expenseAmount={sortedExpenses[item]} Data={Data} setDisplayedTransactions={setDisplayedTransactions}/>
  ))

  const transactions = displayedTransactions.map(transaction => (
    <Transaction key={Math.random()} Transaction={transaction} />
  ))

  return (
    <div className="App">
      <h1>Finance Manager</h1>
      
      <div className="main-content">
        <div className="main-left">
          <div className="upload--form">
            <label className="input--text" htmlFor="file--input">Click Here to Upload a TD Statement (.csv)
              <input type="file" accept=".csv" name="file--input" id="file--input" 
                onChange={changeHandler}/>
            </label>
            {selectedFile && <p className='file--name'><strong>File Selected:</strong><br />{selectedFile.name}</p>}
            <button className="submit--button" onClick={handleSubmit}>Submit</button>
          </div>

          <Information
            Data={Data} 
            total={total} 
            deposits={income}
          />
        </div>
        <div className="main-divider"></div>
        <div className="main-right">
          <div className="category--cards--container">
            {categoryCards}
          </div>
          <div className="transaction-container">
            {transactions}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
