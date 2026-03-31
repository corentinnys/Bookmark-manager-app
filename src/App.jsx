import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Tags from "./Tags";
import './App.css';

function App() {
  return (
    <section className="container border">
        <div className="row">
            <section className="col-3">
                <Tags />
            </section>
            <section className="col-9"></section>
        </div>

    </section>
  );
}

export default App;