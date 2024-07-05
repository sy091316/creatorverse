import { React, useState, useEffect} from 'react';
import {supabase} from "../client";
import {useNavigate, useLocation} from "react-router-dom";
import banner from "../images/banner.jpg";



export const ViewCreator = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [allData, setallData] = useState([]);
    //get data from showCreator
    const result = useLocation();
    useEffect(() => {
        viewSpecificCreator();
    }, [])
        
    const divapp = {
        height: '100vh', //for center card content
        width: '100vw',
        padding: 0,
        margin: 0,
        color: 'white', 
    }
    const header = {
        backgroundImage: `url(${banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        width: "100vw", // for center header content
        height: "100vh",
        paddingTop: "8em",
        borderBottom: "2px solid rgb(66, 74, 89)"
    }
    const buttonhead = {
        paddingTop: "0.4em",
        fontSize: '10vw',
        display: 'flex',
        justifyContent: 'center'
    }
    const button = {
        marginLeft: '20px',
        marginRight: '20px',
        backgroundColor: 'rgb(67, 115, 157)',
        width: '25%'
    }
    const modal = {
        position: 'fixed',
        margin: 'auto',
        zIndex: 1,
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        overflow: 'auto',
        boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
        backgroundColor: 'rgba(0,0,0,0.4)',
        width: '100%',
        height: '100%',
    }
    const modalContent = {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        position: 'absolute',
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: 'black',
        paddingTop: '130px',
        border: '4px solid rgb(67, 115, 157)',
        borderRadius: '2px',
        width: '40em',
        height: '30em',
    }

    const link = {
        display: 'flex',
        verticalAlign: 'middle', 
        color: 'white',
        marginBottom:'10px',
        paddingLeft: 0,
        paddingRight: 0,
        backgroundColor:'transparent',
        border: 'none'
    }
 
    async function viewSpecificCreator(){
        const {data, error} = await supabase
        .from('creators')
        .select()
        .eq('id', result.state);
        if (error){
            console.error("error reading view");
        }
        setallData(data);
    }

    async function deleteData(){
        await supabase
        .from('creators')
        .delete()
        .eq('id', result.state);
        navigate('/');
    }

    return (
        <>
        <div className="app" style={divapp}>
            <header className="header" style={header}>
                <h1 style={{color:'white', fontSize:'8vw', fontFamily: 'Helevetica Rounded'}}>CREATORVERSE</h1>
                <div className="button-head" style={buttonhead}>
                    <button role="button" style={button} onClick={() => navigate('/')}><b>VIEW ALL CREATORS</b></button>
                    <button role="button"  style={button} onClick={() => navigate('/add')}><b>ADD A CREATOR</b></button>
                </div>
            </header>
            <main style={{backgroundColor: "black"}}>
            {allData.map((item, idx) =>
                <div className="container" key={idx} style={{paddingTop: '40px'}}> 
                        <div className="container-row" style={{display: 'flex', justifyContent: 'center', marginBottom: '20px'}}>
                            <div className="container-column-img" style={{margin: '30px', border: '2px solid rgb(67, 115, 157)', borderRadius: '3px'}}>
                                <img src={item.imageURL} alt={item.name} style={{width: '400px', height: '400px', maxwidth: '100%', objectFit: 'cover',}}></img>
                            </div>
                            <div className="container-column-text" style={{width: '50%', margin: '30px'}}>
                                <h2 style={{color: 'rgb(67, 115, 157)', textAlign: 'left'}}>{item.name.toUpperCase()}</h2> 
                                <p style={{color: 'white', textAlign: 'left'}}>{item.description}</p>
                                <div className="row" style={{color: 'white', textAlign: 'left', width: '60%', display: 'flex', flexDirection: 'column'}}>
                                    {item.youtubeURL.trim() != "" && 
                                    <a id='social' href={`https://www.youtube.com/${item.youtubeURL}`} target="_blank" style={link}>
                                        <i className="fa-brands fa-youtube" style={{paddingRight: '13px', verticalAlign: 'middle', color: 'white', fontSize: '2.5vw', margin: 'auto 0'}}>
                                        </i>@{item.youtubeURL}
                                    </a>
                                    }
                                    {item.twitterURL.trim() != "" && 
                                    <a id='social' href={`https://www.x.com/${item.twitterURL}`} target="_blank" style={link}>
                                        <i className="fa-brands fa-x-twitter" style={{alignItems: 'right', verticalAlign: 'middle', color: 'white', fontSize: '2.5vw', margin: 'auto 0'}}></i>
                                        <div style={{marginLeft: '14px', color: 'white'}}>@{item.twitterURL}</div>
                                    </a>
                                    }
                                    {item.instagramURL.trim() != "" && 
                                    <a href={`https://www.instagram.com/${item.instagramURL}`} target="_blank" style={link}>
                                        <i className="fa-brands fa-instagram" style={{alignItems: 'right',verticalAlign: 'middle', color: 'white', fontSize: '2.5vw', margin: 'auto 0'}}></i>
                                        <div style={{marginLeft: '20px', color: 'white'}}>@{item.instagramURL}</div>
                                    </a>
                                    }  
                                </div>
                            </div>
                        </div>
                        <div className="container-row" style={{paddingBottom: '300px'}}>
                            <button role="button" style={button} onClick={() => navigate(`/edit/${item.id}`, {state: item})}>EDIT</button>
                            <button role="button" style={{width: '25%', margin: '30px', border: '1px solid rgb(255, 96, 92)', backgroundColor:'rgb(255, 96, 92)'}} onClick={() => setOpen(true)}>DELETE</button>
                        </div>
                </div>
                 )}
            </main>

            <div className="section_modal" style={{ display: open ? 'inline-block' : 'none' }}>
                <div className="modal" style={modal}>
                    <div className="modal-content" style={modalContent}>
                    <h1 style={{color: 'rgb(67, 115, 157)', fontSize: '6vh'}}><i className="fas fa-exclamation-triangle" style={{color: '#eed202'}}></i> WAIT!!!! <i className="fas fa-exclamation-triangle" style={{color: '#eed202'}}></i></h1>
                        <p style={{color: 'white', fontSize: '3vh'}}>Are you sure you want to delete asc???</p>
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <button role="button" style={{width: '40%', margin: '20px', border: '1px solid rgb(67, 115, 157)', backgroundColor:'rgb(67, 115, 157)'}} onClick={() => setOpen(false)}><b>NAH, NEVER MIND</b></button>
                            <button role="button" style={{width: '40%', margin: '10px', border: '1px solid rgb(67, 115, 157)', backgroundColor:'rgb(67, 115, 157)'}} onClick={() => deleteData()}><b>YES! TOTALLY SURE</b></button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        </>
    )

}


export default ViewCreator;