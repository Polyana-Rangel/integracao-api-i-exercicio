import React, { useState, useEffect } from 'react'
import { Botao, ContainerInputs, ContainerMusicas, InputMusica, Musica } from './styled'
import axios from "axios"



export default function Musicas(props) {
    const [musicas, setMusicas] = useState([])
    const [nome, setNome] = useState("")
    const [artista, setArtista] = useState("")
    const [url, setUrl] = useState("")


    const pegarMusicaPeloID = () => {
        axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`,
            {
                headers: {
                    Authorization: "polyana-rangel-ammal"
                }
            })
            .then((resposta) => {
                console.log(resposta)

                setMusicas(resposta.data.result.tracks)

            })
            .catch((erro) => {
                console.log(erro)

            })

    }

    useEffect(() => {
        pegarMusicaPeloID()
    }, [])


    const addMusica = () => {
        const body = {

            name: nome,
            artist: artista,
            url: url
        }

        axios.post(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`, body, {
            headers: {
                Authorization: "polyana-rangel-ammal"
            }
        })
            .then((resposta) => {

                
                // setMusicas(resposta.data.result.tracks)
                pegarMusicaPeloID()
                // setNome("")
                // setArtista("")
                // setMusicas("")
                

                console.log(resposta)


            })
            .catch((erro) => {
                alert(erro.response.data.message)

            })
    }

    const removeTrackFromPlaylist = (id) => {
        axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks/${id}
        `,
            {
                headers: {
                    Authorization: "polyana-rangel-ammal"
                }
            })
            .then((resposta) => {
                console.log(resposta)
                pegarMusicaPeloID()


            })
            .catch((erro) => {
                console.log(erro)

            })

    }

    return (
        <ContainerMusicas>
            <h2>{props.playlist.name}</h2>
            {musicas.map((musica) => {
                return (
                    <Musica key={musica.id}>
                        <h3>{musica.name} - {musica.artist}</h3>
                        <audio src={musica.url} controls />
                        <button onClick={()=>removeTrackFromPlaylist(musica.id)}>X</button>
                    </Musica>)
            })}
            <ContainerInputs>
                <InputMusica placeholder="artista" value={artista} onChange={(event) => setArtista(event.target.value)} />
                <InputMusica placeholder="musica" value={nome} onChange={(event) => setNome(event.target.value)} />
                <InputMusica placeholder="url" value={url} onChange={(event) => setUrl(event.target.value)} />
                <Botao onClick={addMusica}>Adicionar musica</Botao>
            </ContainerInputs>
        </ContainerMusicas>
    )
}

