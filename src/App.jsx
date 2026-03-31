import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Tags from "./Tags";
import Cards from "./cards";
import './App.css';
import { useEffect, useState } from 'react';
function App() {
    const [selectedTags, setSelectedTags] = useState([]);
  return (
    <section className="container border">
        <div className="row">
            <section className="col-3">
                <Tags  selectedTags={selectedTags}
                       setSelectedTags={setSelectedTags} />
            </section>
            <section className="col-9">
                <Cards selectedTags={selectedTags}/>
            </section>
        </div>

    </section>
  );
}

export default App;