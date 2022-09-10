import React from 'react'

export default function Information(props) {

    let numberOfTransactions = props.Data.length;


    return (
        props.Data.length > 0 && <div className="Information">
            <h1>Information</h1>
            <p>Dates: {props.Data[0].date} - {props.Data[numberOfTransactions - 2].date}</p>
            <p>Total Number of Transactions: {numberOfTransactions}</p>
            <p>Total Expenses: {props.total}</p>
        </div>
    );
}