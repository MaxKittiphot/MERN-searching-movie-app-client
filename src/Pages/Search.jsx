import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './Style.css'

const Search = () => {
    const {keyword} = useParams();
    const [results, setResults] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(()=>{
        Axios.get("https://imdb-api.com/en/API/SearchMovie/"+process.env.REACT_APP_IMDB_API_KEY+"/" + keyword).then((response)=>{
            setResults(response.data.results);
        })
    }, [location])

    function seeMore(event){
        navigate("/detail/"+event.target.value);
    }

    function addList(event){
        const body = results[event.target.value];
        Axios.post("https://movies-search-server.herokuapp.com/addMovie", {
            _id: body.id,
            title: body.title,
            image: body.image,
            description: body.description
        })
        .then((response)=>{
            if(response.data._id){
                alert("Successfuly added to your watchlist.")
            }
            if(response.data.code===11000){
                alert("The movie already exists in your watchlist.")
            }
        })
    }

    if(results.length!=0){
        return (
            <div className="watchlist-container"> 
                {results.map((result, index)=>{
                    return (
                        <div className="flex-child-list" key={result.id}>
                            <div className="list-title">
                                <p>{(result.title + " "+ result.description.split(" aka")[0]).substring(0,53)}</p>
                            </div>
                            <div>
                                <img src={result.image} alt={result.title+" picture."}/>
                            </div>
                            <button value={result.id} onClick={seeMore}>More Detail</button>
                            <button value={index} onClick={addList}>Add To Watchlist</button>
                        </div>
                    )
                    })
                }
            </div>
        )
    }else{
        return <div></div>
    }
};
 
export default Search; 