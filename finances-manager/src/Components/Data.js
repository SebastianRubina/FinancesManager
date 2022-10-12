export const resetData = (setTotal, setIncome, setSortedExpenses) => {
    Data = [];
    setTotal(0);
    setIncome(0);
    setSortedExpenses({
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
}

export let Data = [];
