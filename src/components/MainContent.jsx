import './MainContent.css'
import { useState,useEffect } from 'react'

export default function MainContent () {

    const [meme,setMeme] = useState({
        topText:"One does not simply",
        bottomText:"Walk into Mordor",
        imgUrl:"http://i.imgflip.com/1bij.jpg"
    })

    const [allMemes,setallMemes] = useState([])


    useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes")
        .then (resolve=>resolve.json())
        .then(incomingData=>setallMemes(incomingData.data.memes))
    },[])

    function handleChange(event) {
        const {value,name} = event.currentTarget
        setMeme(prev => ({
            ...prev,
            [name]:value
        }))
    }

    function handleClick () {
        const randomMeme = allMemes[Math.floor(Math.random() * allMemes.length)].url;

        setMeme(prev=>({
            ...prev,
            imgUrl:randomMeme
        }))
    }


    return (
        <>
            <main>
                <div className="form">
                    <label>Top Text
                        <input
                            type="text"
                            placeholder="One does not simply"
                            onChange={handleChange}
                            name='topText'
                            value={meme.topText}
                        />
                    </label>

                    <label>Bottom Text
                        <input
                            type="text"
                            placeholder="Walk into Mordor"
                            onChange={handleChange}
                            name='bottomText'
                            value={meme.bottomText}
                        />
                    </label>
                    <button onClick={handleClick}>Get a new meme image 🖼</button>
                </div>
                <div className="meme">
                    <img src={meme.imgUrl} />
                    <span className="top">{meme.topText}</span>
                    <span className="bottom">{meme.bottomText}</span>
                </div>
            </main>
        </>
    )
}