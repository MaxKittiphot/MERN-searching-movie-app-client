import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Style.css';

const List = () => {
    const [list, setList] = useState([])
    const navigate = useNavigate();

    useEffect(()=>{ 
        // http://localhost:5000/getMovies
        Axios.get("https://movies-search-server.herokuapp.com/"+"getMovies").then((response)=>{
            setList(response.data);
        })
    },[])

    function seeMore(event){
        navigate("/detail/"+event.target.value);
    }

    function remove(event){
        // http://localhost:5000/deleteMovie/
        Axios.delete("https://movies-search-server.herokuapp.com/"+"deleteMovie/"+event.target.value).then(()=>{
            setList(list.filter((movie)=>{
                return movie._id != event.target.value;
            }))
        })
    }
    if(list.length!=0){
        return (
            <div className="watchlist-container">
                {list.map((movie)=>{
                    return (
                        <div className="flex-child-list" key={movie._id}>
                            <div className="list-title">
                                <p>{(movie.title +" "+movie.description.split(" aka")[0]).substring(0,53)}</p>
                            </div>
                            <img src={movie.image} alt={movie.title+" picture."}/>
                            <br/>
                            <button value={movie._id} onClick={seeMore}>More Detail</button>
                            <button value={movie._id} onClick={remove}>Delete</button>
                        </div>
                    )
                })}
            </div>
        );
    }else{
        return (<div></div>)
    }
};

export default List;