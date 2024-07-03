import { React, useState, useEffect} from 'react';
import {supabase} from "../client";
import {useNavigate, useLocation} from "react-router-dom";
import banner from "../images/banner.jpg"



export const ViewCreator = () => {
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
        display: 'block',
        position: 'fixed',
        zIndex: 1,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        overflow: 'auto',
        backgroundColor: 'rgba(0,0,0,0.4)' 
    }
    const modalContent = {
        backgroundColor: 'black',
        margin: '80px auto',
        padding: '20px',
        border: '4px solid rgb(67, 115, 157)',
        borderRadius: '2px',
        width: '40em',
        height: '30em',
    }

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [allData, setallData] = useState([]);
    //get data from showCreator
    const result = useLocation();
    useEffect(() => {
        viewSpecificCreator();
    }, [])
        
    
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
                <h1 style={{color:'white', fontSize:'8vw'}}>CREATORVERSE</h1>
                <div className="button-head" style={buttonhead}>
                    <button role="button" style={button} onClick={() => navigate('/')}>VIEW ALL CREATORS</button>
                    <button role="button"  style={button} onClick={() => navigate('/add')}>ADD A CREATOR</button>
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
                                <div className="row" style={{color: 'white', textAlign: 'left'}}>
                                    {item.youtubeURL.trim() != "" && 
                                    <a href={item.youtubeURL} target="_blank" style={{display: 'flex', verticalAlign: 'middle', color: 'white'}}>
                                        <i className="fa-brands fa-youtube" style={{verticalAlign: 'middle', color: 'white', fontSize: '2.5vw', marginRight: '10px'}}>
                                        </i>
                                        <div style={{margin: 'auto 0', color: 'white'}}>{item.youtubeURL}</div>
                                    </a>
                                    }
                                    {item.twitterURL.trim() != "" && 
                                    <a href={item.twitterURL} target="_blank" style={{display: 'flex', verticalAlign: 'middle', color: 'white'}}>
                                        <i className="fa-brands fa-x-twitter" style={{textAlign: 'center', color: 'white', fontSize: '2.5vw', marginRight: '10px'}}></i>
                                        <div style={{margin: 'auto 0', color: 'white'}}>{item.twitterURL}</div>
                                    </a>
                                    }
                                    {item.instagramURL.trim() != "" && 
                                    <a href={item.instagramURL} target="_blank" style={{display: 'flex', verticalAlign: 'middle', color: 'white'}}>
                                        <i className="fa-brands fa-instagram" style={{color: 'white', fontSize: '2.5vw', marginRight: '10px'}}></i>
                                        <div style={{margin: 'auto 0', color: 'white'}}>{item.instagramURL}</div>
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
                        <h1 style={{color: 'rgb(67, 115, 157)', fontSize: '7vh', marginTop: '2em'}}>WAIT!!!!</h1>
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