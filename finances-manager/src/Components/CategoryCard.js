import React from 'react'
import '../Styles/CategoryCard.css';

export default function CategoryCard(props) {
    return (
        ((props.Data.length > 0) && (props.categoryName !== "deposits")) && <div className={"CategoryCard " + props.categoryName + "--card"}>
            <h3>{props.categoryName[0].toUpperCase() + props.categoryName.slice(1).toLowerCase()}</h3>
            <p>${Math.round(props.expenseAmount * 100) / 100}</p>
        </div>
    );
}