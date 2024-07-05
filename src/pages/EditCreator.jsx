import { React, useState } from 'react';
import {supabase} from "../client";
import {useNavigate, useLocation} from "react-router-dom";
import banner from "../images/banner.jpg"

export const EditCreator = () => {
    const [openEditModal, setEditModalOpen] = useState(false);
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

    const navigate = useNavigate();
    const result = useLocation();
    // set default value as data input
    const [inputField, setinputField] = useState(
        {
            name: result.state.name,
            imageURL: result.state.imageURL,
            description: result.state.description,
            youtubeURL: result.state.youtubeURL,
            twitterURL: result.state.twitterURL,
            instagramURL: result.state.instagramURL
        }
    )

    async function updateData() {
        const {data, error} = await supabase
        .from('creators')
        .update({
            name: inputField.name,
            imageURL: inputField.imageURL,
            description: inputField.description,
            youtubeURL: inputField.youtubeURL,
            twitterURL: inputField.twitterURL,
            instagramURL: inputField.instagramURL
        })
        .eq('id', result.state.id);
        if (error) {
            console.err("error update");
        }
        window.location.reload();
    }

    async function deleteData(){
        await supabase
        .from('creators')
        .delete()
        .eq('id', result.state.id);
        navigate('/');
    }

    const handleSubmit = (e) => {
        e.preventDefault(e);
        updateData();
        navigate('/');
    }

    const handleChange = (e) => {
        e.preventDefault();
        setinputField({
            ...inputField,
            [e.target.name]: e.target.value
        })
    }
    
    return (
        <>
        <div className="app" style={divapp}>
            <header className="header" style={header}>
                <h1 style={{color:'white', fontSize:'8vw', fontFamily: 'Helevetica Rounded'}}>CREATORVERSE</h1>
                <div className="button-head" style={buttonhead}>
                    <button role="button"  style={button} onClick={() => navigate('/')}><b>VIEW ALL CREATORS</b></button>
                    <button role="button"  style={button} onClick={() => navigate('/add')}><b>ADD A CREATOR</b></button>
                </div>
            </header>
            <main style={{display: 'flex', marginBottom: '10px', backgroundColor: "black"}}>
                <form className="addCreator" style={{width: '40%', paddingTop: '50px', margin: '0 auto'}} onSubmit={handleSubmit}>
                    <div id="name">
                        <label style={{color: 'white', textAlign: 'left'}}>Name</label>
                        <input type="text" id="name" name="name" value={inputField.name} onChange={handleChange} required></input>
                    </div>
                    <div id="imageURL">
                        <label style={{color: 'white', textAlign: 'left'}}>Image
                            <p style={{color: 'white', fontSize: '1vw'}}><i>Provide a link to an image of your creator. Be sure to include the http://</i></p></label>
                        <input type="url" id="imageURL" name="imageURL" value={inputField.imageURL} onChange={handleChange}></input>
                    </div>
                    <div id="description">
                        <label style={{color: 'white', textAlign: 'left'}}>Description
                            <p><i style={{color: 'white', fontSize: '1vw'}}>Provide a description of the creator. Who are they? What makes them interesting?</i></p>
                        </label>
                        <textarea id="description" name="description" value={inputField.description} onChange={handleChange}></textarea>
                    </div>
                    <div style={{textAlign: 'left'}}>
                    <h4 style={{color: 'rgb(67, 115, 157)'}}>SOCIAL MEDIA LINKS</h4>
                    <p style={{color: 'white' , fontSize: '1vw'}}><i>Provide at least one of the creator's social media links.</i></p>
                    </div>
                    <div id="youtube">
                        <label style={{color: 'white', textAlign: 'left'}}><i className="fa-brands fa-youtube" style={{marginRight: '10px'}}></i>YouTube
                        <p style={{color: 'white', fontSize: '1vw'}}><i>The creator's YouTube handle (without the @)</i></p></label>
                        <input type="text" id="youtubeURL" name="youtubeURL" value={inputField.youtubeURL} onChange={handleChange}></input>
                    </div>
                    <div id="twitter">
                        <label style={{color: 'white', textAlign: 'left'}}><i className="fa-brands fa-x-twitter" style={{marginRight: '10px'}}></i>X (Twitter)
                        <p style={{color: 'white', fontSize: '1vw'}}><i>The creator's X handle (without the @)</i></p></label>
                        <input type="text" id="twitterURL" name="twitterURL" value={inputField.twitterURL} onChange={handleChange}></input>
                    </div>
                    <div id="instagram">
                        <label style={{color: 'white', textAlign: 'left'}}><i className="fa-brands fa-instagram" style={{marginRight: '10px'}}></i>Instagram
                        <p style={{color: 'white', fontSize: '1vw'}}><i>The creator's instagram handle (without the @)</i></p></label>
                        <input type="text" id="instagramURL" name="instagramURL" value={inputField.instagramURL} onChange={handleChange}></input>
                    </div>
                    <div className="submitDelete" style={{display: 'flex', marginTop: '10px'}}>
                        <button className="submit" type="submit" style={{width: '50%',marginRight: '20px',backgroundColor: 'rgb(67, 115, 157)'}}>Submit</button>
                        <button className="delete" type="button" style={{width: '50%',border: '1px solid rgb(255, 96, 92)', 
                            backgroundColor:'rgb(255, 96, 92)'}} onClick={() => setEditModalOpen(true)}>Delete</button>
                    </div>
                </form>
            </main>
        </div>

        <div className="section_modal" style={{ display: openEditModal ? 'block' : 'none'}}>
            <div className="modal" style={modal}>
                <div className="modal-content" style={modalContent}>
                    <h1 style={{color: 'rgb(67, 115, 157)', fontSize: '6vh'}}><i className="fas fa-exclamation-triangle" style={{color: '#eed202'}}></i> WAIT!!!! <i className="fas fa-exclamation-triangle" style={{color: '#eed202'}}></i></h1>
                    <p style={{color: 'white', fontSize: '3vh'}}>Are you sure you want to delete asc???</p>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <button role="button" style={{width: '40%', margin: '20px', border: '1px solid rgb(67, 115, 157)', backgroundColor:'rgb(67, 115, 157)'}} onClick={() => setEditModalOpen(false)}><b>NAH, NEVER MIND</b></button>
                        <button role="button" style={{width: '40%', margin: '10px', border: '1px solid rgb(67, 115, 157)', backgroundColor:'rgb(67, 115, 157)'}} onClick={() => deleteData()}><b>YES! TOTALLY SURE</b></button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )

    
}


export default EditCreator;