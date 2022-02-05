import { useState } from 'react';
import './App.css';
import {Routes, Route, useNavigate, Link } from "react-router-dom";
import Home from "./Pages/Home"
import Search from "./Pages/Search"
import Detail from "./Pages/Detail"
import List from "./Pages/List"


function App() {

  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  function searchMovie(event){
    navigate("/search/"+search);
    setSearch("")
    event.preventDefault();
  }

  return (
    <div className="App">
        <div className="flex-container">
          <div className="flex-child">
            <Link className="link" to="/">Home</Link>
            <Link className="link" to="/watchlist">Watchlist</Link>
          </div>
          <div>
            <form onSubmit={searchMovie}>
                <input 
                  className="search-input"
                  type='text' 
                  // placeholder="Search Movies..." 
                  value={search}
                  onChange={(event)=>{setSearch(event.target.value)}}>
                </input>
                <button className="search-button" type="submit">Search</button>
              </form>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/search/:keyword" element={<Search/>}></Route> 
          <Route path="/detail/:id" element={<Detail/>}></Route>
          <Route path="/watchlist" element={<List/>}></Route>
        </Routes>
    </div>
  );
}

export default App;