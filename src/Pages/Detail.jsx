import  Axios  from 'axios';
import React, { useEffect, useState } from 'react';
import {useParams} from "react-router-dom";
import './Detail.css'
const moment = require('moment');

const Detail = (props) => {
    const {id} = useParams();
    const [detail, setDetail] = useState({});

    useEffect(()=>{
        Axios.get("https://imdb-api.com/en/API/Title/"+process.env.REACT_APP_IMDB_API_KEY+"/"+id).then((response) => {
            setDetail(response.data)
            console.log(URL);
          });
    }, [])

    function addList(){
        // http://localhost:5000/addMovie
        Axios.post("https://movies-search-server.herokuapp.com/addMovie", {
            _id: id,
            title: detail.title,
            image: detail.image,
            description: detail.year
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
    if(Object.keys(detail).length!=0){
        return (
            <div className="detail-container">
                <h1 className="head">{detail.fullTitle}</h1>
                <div className="detail-image">
                    <img src={detail.image} alt={detail.title+" picture."} height="350"/>
                </div>
                <div className='description'>
                    <p>{"Plot: " + detail.plot}</p>
                    <p>{"IMDb Rating: "+detail.imDbRating+"/10"}</p>
                    <p>{"Runtime: "+detail.runtimeMins+ " min"}</p>
                    <p>{"Release date: "+ moment(detail.releaseDate,"YYYY-MM-DD").format("DD-MM-YYYY")}</p>
                    <p>{"Director: "+detail.directors}</p>
                    <p>{"Top cast: "+detail.stars}</p>
                    <p>{"Genre: "+detail.genres}</p>
                    <p>{"Languages: "+detail.languages}</p>
                    <div className='bot-text'>
                        <a className="full" href={"https://www.imdb.com/title/"+detail.id}>More Detail</a>
                        <br/>
                        <button className="bot-button"onClick={addList}>Add to watchlist</button>
                    </div>
    
                </div>
    
            </div>
        );
    }else{
        return <div></div>
    }
};

export default Detail;