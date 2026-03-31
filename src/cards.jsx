import React from "react";
import { useEffect, useState } from 'react';
import Card from "./card";

function Cards({ selectedTags }) {
    const [data, setData] = useState(null);
    const [bookmarks, setBookmarks] = useState([]);
    useEffect(() => {
        fetch('/data.json')
            .then(res => res.json())
            .then(data => {

                setData(data);
                setBookmarks(data.bookmarks);
            });
    }, []);

    const filtered = selectedTags.length === 0
        ? bookmarks
        : bookmarks.filter(b =>
            selectedTags.every(tag => b.tags.includes(tag))
        );

return (
<div className="row">
    {data? (
                filtered.map((card, index) => (

             <Card key={index} card={card} />
            ))
        ) : (
            <p>Chargement...</p>
        )}
</div>
)



}

export default Cards;