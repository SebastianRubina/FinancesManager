export function sortExpenses(Data, sortedExpenses, setSortedExpenses, groceries, groceriesRefunds, dining, phone, etransfer, shopping, transportation, subscriptions, savings) {

    Data.map(expense => {
      if (nameInCategory(expense.name, groceries)) {
        setSortedExpenses(prevSortedExpenses => ({
          ...prevSortedExpenses,
          groceries: prevSortedExpenses.groceries += expense.charge
        }))
        expense.category = "groceries";
        // console.log(`${expense.date} ${expense.name} - ${expense.charge}`);
      } else if (nameInCategory(expense.name, dining)) {
        setSortedExpenses(prevSortedExpenses => ({
          ...prevSortedExpenses,
          dining: prevSortedExpenses.dining += expense.charge
        }))
        expense.category = "dining";
        // console.log(`${expense.date} ${expense.name} - ${expense.charge}`);
      } else if (nameInCategory(expense.name, phone)) {
        setSortedExpenses(prevSortedExpenses => ({
          ...prevSortedExpenses,
          phone: prevSortedExpenses.phone += expense.charge
        }))
        expense.category = "phone";
      } else if (nameInCategory(expense.name, shopping)) {
        setSortedExpenses(prevSortedExpenses => ({
          ...prevSortedExpenses,
          shopping: prevSortedExpenses.shopping += expense.charge
        }))
        expense.category = "shopping";      
      } else if (nameInCategory(expense.name, transportation)) {
        setSortedExpenses(prevSortedExpenses => ({
          ...prevSortedExpenses,
          transportation: prevSortedExpenses.transportation += expense.charge
        }))
        expense.category = "transportation";
      } else if (nameInCategory(expense.name, subscriptions)) {
        setSortedExpenses(prevSortedExpenses => ({
          ...prevSortedExpenses,
          subscriptions: prevSortedExpenses.subscriptions += expense.charge
        }))
        expense.category = "subscriptions";
      } else if (nameInCategory(expense.name, savings)) {
        setSortedExpenses(prevSortedExpenses => ({
          ...prevSortedExpenses,
          savings: prevSortedExpenses.savings += expense.charge
        }))
        expense.category = "savings";
      } else if (nameInCategory(expense.name, etransfer)) {
        expense.category = "etransfer";
        if (expense.charge === 1000) {
          setSortedExpenses(prevSortedExpenses => ({
            ...prevSortedExpenses,
            rent: prevSortedExpenses.rent += expense.charge
          }))
          expense.category = "rent";
        } else if (expense.charge > 100) {
        setSortedExpenses(prevSortedExpenses => ({
          ...prevSortedExpenses,
          debt: prevSortedExpenses.debt += expense.charge
        })) 
        expense.category = "debt";
        }
      } else {
        setSortedExpenses(prevSortedExpenses => ({
          ...prevSortedExpenses,
          others: prevSortedExpenses.others += expense.charge
        }))
        expense.category = "others";
      }
      if (nameInCategory(expense.name, groceriesRefunds)) {
        setSortedExpenses(prevSortedExpenses => ({
          ...prevSortedExpenses,
          groceries: prevSortedExpenses.groceries -= expense.deposit
        }))
      }
      return sortedExpenses;
    })
  }

export function nameInCategory(name, category) {
    let found = false;
    category.some (element => {
        if (name.toUpperCase().includes(element)) {
        found = true;
        }
        return found;
    })
    return found;
}

export function calculateTotals(Data, setTotal, setIncome) {
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

export function createObject(line) {
    let newObject = {
        "date": line[0],
        "name": line[1],
        "charge": parseFloat(line[2]) > 0 ? parseFloat(line[2]) : 0,
        "deposit": parseFloat(line[3]) > 0 ? parseFloat(line[3]) : 0,
    };
    return newObject;
}