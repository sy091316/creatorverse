import { React, useState, useEffect, useRef } from 'react';
import { supabase } from "../client";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import banner from "../images/banner.jpg"


export const ShowCreator = () => {
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
        width: '25vw'
    }
    const cardContainer = {
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        padding: "60px 100px",
        justifyContent: "center",
        background: 'black',
        zIndex: 1
    }

    const navigate = useNavigate();
    const [allData, setallData] = useState([]);

    useEffect(() => {
        showCreators();
    }, []);

    async function showCreators() {
        const { data, error } = await supabase
            .from('creators')
            .select()
            .order('id');
        if (data) {
            setallData(data);
        }
        if (error) {
            console.error("Error");
            return;
        }
    }


    return (
        <>
            <div className="app" style={divapp}>
                <header className="header" style={header}>
                    <h1 style={{ color: 'white', fontSize: '8vw', fontFamily: 'Helevetica Rounded' }}>CREATORVERSE</h1>
                    <div className="button-head" style={buttonhead}>
                        <button role="button" style={button} onClick={() => window.location.reload()}><b>VIEW ALL CREATORS</b></button>
                        <button role="button" style={button} onClick={() => navigate('/add')}><b>ADD A CREATOR</b></button>
                    </div>
                </header>
                <main style={{ backgroundColor: "black" }}>
                    <section className="displayCard">
                        {allData.length === 0 && (
                            <div>there are no content creators</div>
                        )}
                        <div className="card-container" style={cardContainer}>
                            {allData != 0 &&
                                allData.map((item) => (
                                    <>
                                        <div className="card" key={item.id} style={{
                                            position: 'relative',
                                            backgroundImage: 'url(' + item.imageURL + ')',
                                            padding: '10px', borderRadius: "4px", width: '45%', height: '340px',
                                            border: '2px solid rgb(66, 74, 89)',
                                            maxwidth: '100%', backgroundSize: 'cover'
                                        }}>
                                            <Card item={item} />
                                        </div>
                                    </>
                                ))}
                        </div>
                    </section>
                </main>

            </div>
        </>
    )

}


export default ShowCreator;