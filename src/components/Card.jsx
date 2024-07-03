import { React, useState } from 'react';
import {useNavigate} from "react-router-dom";

export const Card = (props) => {
    const navigate = useNavigate();
    const item = props.item;
    return (
        <>
        <div className="row" style={{display: 'flex', paddingTop: '80px'}}>
            <div style={{width: "80%", textAlign: 'left', paddingLeft: '30px'}}>
                <h2 style={{color: 'rgb(67, 115, 157)'}}>{item.name.toUpperCase()}</h2>
            </div>
            <div style={{width: "20%"}}>
                <a className="coleach" style={{color: 'white', cursor: 'pointer', paddingRight:'10px'}} onClick={() => navigate(`/view/${item.id}`, {state: item.id})}><i className="fa fa-info-circle" aria-hidden="true"></i></a>
                <a className="coleach" style={{color: 'white', cursor: 'pointer'}} onClick={() => navigate(`/edit/${item.id}`, {state: item})}><i className="fa-solid fa-pen"></i></a>
            </div>
        </div>
        <div className="row" style={{display: 'flex', width: "80%", paddingLeft: '30px', paddingBottom: '20px'}}>
            {item.youtubeURL.trim() != "" && 
            <a href={item.youtubeURL} target="_blank"><i className="fa-brands fa-youtube" style={{color: 'white', fontSize: '2.5vw', marginRight: '10px'}}></i></a>
            }
            {item.twitterURL.trim() != "" && 
            <a href={item.twitterURL} target="_blank"><i className="fa-brands fa-x-twitter" style={{color: 'white', fontSize: '2.5vw', marginRight: '10px'}}></i></a>
            }
            {item.instagramURL.trim() != "" && 
            <a href={item.instagramURL} target="_blank"><i className="fa-brands fa-instagram" style={{color: 'white', fontSize: '2.5vw'}}></i></a>
            }
            
        </div>
        <div className="row" style={{display: 'flex', width: "80%", paddingLeft: '30px'}}>
            <p style={{color:"white"}}>{item.description}</p>
        </div>
        </>
    )
    
}


export default Card;