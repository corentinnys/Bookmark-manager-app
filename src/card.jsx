import React from "react";
import { useEffect, useState } from 'react';


function Card(card,index) {

    return (
        <div className="card border-info m-3 col-4" style={{ maxWidth: "18rem" }}>
            <div className="card-header d-flex justify-content-start gap-2 align-items-center">
                <img src={card.card.favicon} alt="icon" style={{height: "40px", width: "40px"}}/>
                {card.card.title}
            </div>
            <div className="card-body">
                <p className="card-text">
                    {card.card.description}
                </p>
                {card.card.tags.map((tag, index) => (
                    <span key={index} className="badge bg-secondary me-1">
                    {tag}
                </span>
                ))}
            </div>
        </div>
    );

}

export default Card;