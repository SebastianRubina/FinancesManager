import React from 'react'
import '../Styles/Transaction.css';

export default function CategoryCard({ Transaction }) {

    const logTransaction = (transaction) => {
        console.log(transaction);
    }

    return (
        <div className={"transaction " + Transaction.category + "-category"} onClick={() => logTransaction(Transaction)}>
            <p className="date">{Transaction.date}</p>
            <p className="name"><strong>{Transaction.name}</strong></p>
            <p className="charge"><strong>$</strong>{Transaction.charge.toFixed(2)}</p>
        </div>
    );
}