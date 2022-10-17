import React from 'react'
import '../Styles/CategoryCard.css';

export default function CategoryCard(props) {

    const setTransactions = (e) => {
        console.clear();
        props.setDisplayedTransactions(props.Data.filter((transaction) => transaction.category === props.categoryName && transaction.charge > 0));
        console.log(props.Data.filter((transaction) => transaction.category === props.categoryName))
    }

    return (
        ((props.Data.length > 0) && (props.categoryName !== "deposits")) && <div className={"CategoryCard " + props.categoryName + "-category"} onClick={setTransactions}>
            <h3>{props.categoryName[0].toUpperCase() + props.categoryName.slice(1).toLowerCase()}</h3>
            <p>${Math.round(props.expenseAmount * 100) / 100}</p>
        </div>
    );
}