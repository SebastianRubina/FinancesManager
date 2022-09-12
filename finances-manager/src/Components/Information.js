import React from 'react'

export default function Information(props) {

    let numberOfTransactions = props.Data.length;


    return (
        props.Data.length > 0 && <div className="Information">
            <h2>Statement Information</h2>
            <p><strong>Dates: </strong><br />{props.Data[0].date} - {props.Data[numberOfTransactions - 2].date}</p>
            <p><strong>Total number of Transactions: </strong><br />{numberOfTransactions}</p>
            <p><strong>Total Expenses: </strong><br />{props.total}</p>
        </div>
    );
}