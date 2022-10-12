import React from 'react'
import '../Styles/CategoryCard.css';

export default function CategoryCard(props) {

    const logTransactions = () => {
        console.clear();
        console.log("CLICKED");
        let categorizedTransactionArray = props.Data.filter((transaction) => transaction.category === props.categoryName);
        for (let transaction of categorizedTransactionArray) console.log(`${transaction.date} ${transaction.name} - ${transaction.charge}`);
    }

    return (
        ((props.Data.length > 0) && (props.categoryName !== "deposits")) && <div className={"CategoryCard " + props.categoryName + "--card"} onClick={logTransactions}>
            <h3>{props.categoryName[0].toUpperCase() + props.categoryName.slice(1).toLowerCase()}</h3>
            <p>${Math.round(props.expenseAmount * 100) / 100}</p>
        </div>
    );
}