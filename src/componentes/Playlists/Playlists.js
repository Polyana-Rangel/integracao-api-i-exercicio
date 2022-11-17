import React, { useState, useEffect } from "react";
import Musicas from "../Musicas/Musicas";
import axios from "axios"



function Playlists(props) {
    const [playlists, setPlaylists] = useState([])

    const pegarPlaylists = () => {
        axios.get("https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists", {
            headers: {
                Authorization: "polyana-rangel-ammal"
            }
        })
            .then((resposta) => {
                setPlaylists(resposta.data.result.list)
                console.log(resposta)

            })
            .catch((erro) => {
                alert(erro)
                console.log(erro)


            })

    }

    useEffect(() => {
        pegarPlaylists()
    }, [])

    


    return (
        <div>
            {playlists.map((playlist) => {
                return <Musicas key={playlist.id} playlist={playlist} id={playlist.id}
                />
            })}

        </div>
    );
}

export default Playlists;
