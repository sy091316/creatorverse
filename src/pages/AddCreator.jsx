import { React, useState } from 'react';
import { supabase } from "../client";
import { useNavigate } from "react-router-dom";
import banner from "../images/banner.jpg"

export const AddCreator = () => {
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

    const navigate = useNavigate();
    const [inputField, setinputField] = useState({
        name: "",
        imageURL: "",
        description: "",
        youtubeURL: "",
        twitterURL: "",
        instagramURL: ""
    })

    const handleChange = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setinputField({
            ...inputField,
            [e.target.name]: value
        })
    }

    async function insertData() {
        const { error } = await supabase
            .from('creators')
            .insert(
                {
                    name: inputField.name,
                    imageURL: inputField.imageURL,
                    description: inputField.description,
                    youtubeURL: inputField.youtubeURL,
                    twitterURL: inputField.twitterURL,
                    instagramURL: inputField.instagramURL
                })
        if (error) {
            console.error("error adding");
        }
        window.location.reload();
    }



    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('a', inputField.name, inputField.imageURL, inputField.description);
        insertData();
        //clear input
        setinputField({
            name: "",
            imageURL: "",
            description: "",
            youtubeURL: "",
            twitterURL: "",
            instagramURL: ""
        })
        navigate('/');
    }

    return (
        <>
            <div className="app" style={divapp}>
                <header className="header" style={header}>
                    <h1 style={{ color: 'white', fontSize: '8vw', fontFamily: 'Helevetica Rounded' }}>CREATORVERSE</h1>
                    <div className="button-head" style={buttonhead}>
                        <button role="button" style={button} onClick={() => navigate('/')}><b>VIEW ALL CREATORS</b></button>
                        <button role="button" style={button} onClick={() => window.location.reload()}><b>ADD A CREATOR</b></button>
                    </div>
                </header>
                <main style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px', backgroundColor: "black" }}>
                    <form className="addCreator" style={{ width: '40%', paddingTop: '50px', margin: '0 auto' }} onSubmit={handleSubmit}>
                        <div id="name">
                            <label style={{ color: 'white', textAlign: 'left' }}>Name</label>
                            <input type="text" id="name" name="name" value={inputField.name} onChange={handleChange} required></input>
                        </div>
                        <div id="imageURL">
                            <label style={{ color: 'white', textAlign: 'left' }}>Image
                                <p style={{ color: 'white', fontSize: '1vw' }}><i>Provide a link to an image of your creator. Be sure to include the http://</i></p></label>
                            <input type="url" id="imageURL" name="imageURL" value={inputField.imageURL} onChange={handleChange}></input>
                        </div>
                        <div id="description">
                            <label style={{ color: 'white', textAlign: 'left' }}>Description
                                <p><i style={{ color: 'white', fontSize: '1vw' }}>Provide a description of the creator. Who are they? What makes them interesting?</i></p>
                            </label>
                            <textarea id="description" name="description" value={inputField.description} onChange={handleChange}></textarea>
                        </div>
                        <div style={{ textAlign: 'left' }}>
                            <h4 style={{ color: 'rgb(67, 115, 157)' }}>SOCIAL MEDIA LINKS</h4>
                            <p style={{ color: 'white', fontSize: '1vw' }}><i>Provide at least one of the creator's social media links.</i></p>
                        </div>
                        <div id="youtube">
                            <label style={{ color: 'white', textAlign: 'left' }}><i className="fa-brands fa-youtube" style={{ marginRight: '10px' }}></i>YouTube
                                <p style={{ color: 'white', fontSize: '1vw' }}><i>The creator's YouTube handle (without the @)</i></p></label>
                            <input type="text" id="youtubeURL" name="youtubeURL" value={inputField.youtubeURL} onChange={handleChange}></input>
                        </div>
                        <div id="twitter">
                            <label style={{ color: 'white', textAlign: 'left' }}><i className="fa-brands fa-x-twitter" style={{ marginRight: '10px' }}></i>X (Twitter)
                                <p style={{ color: 'white', fontSize: '1vw' }}><i>The creator's X handle (without the @)</i></p></label>
                            <input type="text" id="twitterURL" name="twitterURL" value={inputField.twitterURL} onChange={handleChange}></input>
                        </div>
                        <div id="instagram">
                            <label style={{ color: 'white', textAlign: 'left' }}><i className="fa-brands fa-instagram" style={{ marginRight: '10px' }}></i>Instagram
                                <p style={{ color: 'white', fontSize: '1vw' }}><i>The creator's instagram handle (without the @)</i></p></label>
                            <input type="text" id="instagramURL" name="instagramURL" value={inputField.instagramURL} onChange={handleChange}></input>
                        </div>
                        <button type="submit" style={{ backgroundColor: 'rgb(67, 115, 157)' }}>Submit</button>
                    </form>
                </main>

            </div>
        </>
    )

}


export default AddCreator;