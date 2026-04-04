import React from "react";
import { useEffect, useState } from 'react';

function Tags({ selectedTags, setSelectedTags }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('/tag.json')
            .then(res => res.json())
            .then(data => {

                setData(data);
            });
    }, []);

    const handleChange = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };
    return (
      <>
            <h1 className="heading-1">Bookmark Manager</h1>
            <div className="list-group">

                <a href="#" className="list-group-item list-group-item-action d-flex justify-content-start ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path stroke="#051513" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M6.667 14.167h6.666M9.181 2.303 3.53 6.7c-.377.294-.566.441-.702.625-.12.163-.21.347-.265.542-.062.22-.062.46-.062.938v6.03c0 .933 0 1.4.182 1.756.16.314.414.569.728.728.357.182.823.182 1.757.182h9.666c.934 0 1.4 0 1.757-.182.314-.16.569-.414.728-.728.182-.357.182-.823.182-1.757V8.804c0-.478 0-.718-.062-.938a1.7 1.7 0 0 0-.265-.542c-.136-.184-.325-.33-.702-.625l-5.652-4.396c-.293-.227-.44-.341-.601-.385a.83.83 0 0 0-.436 0c-.161.044-.308.158-.6.385"/></svg>
                    Home
                </a>
                <a href="#" className="list-group-item list-group-item-action d-flex justify-content-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path stroke="#051513" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M3.334 6.664a2 2 0 0 1-.325-.03 1.67 1.67 0 0 1-1.31-1.309c-.032-.16-.032-.354-.032-.742 0-.387 0-.58.032-.741a1.67 1.67 0 0 1 1.31-1.31c.16-.032.354-.032.741-.032h12.5c.387 0 .581 0 .742.032a1.67 1.67 0 0 1 1.31 1.31c.032.16.032.354.032.741 0 .388 0 .581-.032.742a1.67 1.67 0 0 1-1.31 1.31 2 2 0 0 1-.325.029m-8.333 4.17h3.333M3.334 6.666h13.333V13.5c0 1.4 0 2.1-.273 2.635a2.5 2.5 0 0 1-1.092 1.092c-.535.273-1.235.273-2.635.273H7.334c-1.4 0-2.1 0-2.635-.273a2.5 2.5 0 0 1-1.093-1.092c-.272-.535-.272-1.235-.272-2.635z"/></svg>
                    Arcchive
                </a>

            </div>
            <h2 className="fs-5">Tags</h2>
            {data ? (
                data.map((tag, index) => (
                    <div className="form-check mt-2 mb-2" key={index}>
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" onChange={() => handleChange(tag)}/>
                        <label className="form-check-label" htmlFor="flexCheckChecked">
                            {tag}
                        </label>
                    </div>
                ))
            ) : (
                <p>Chargement...</p>
            )}
      </>

    );
}

export default Tags;