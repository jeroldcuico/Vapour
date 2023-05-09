import { useEffect, useState } from "react"
import axios from 'axios'
import { API_KEY, API_LINK } from "../constants/API";

export default function StoreList({ gameid }) {
    const [gameStore, setgameStore] = useState([])
    const [gameName, setgameName] = useState([])

    const FetchData = () => {
        const url = `${API_LINK}/games/${gameid}/stores?${API_KEY}`
        axios
            .get(url)
            .then((res) => {
                setgameStore(res.data.results);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        FetchData()

        axios
            .get(`${API_LINK}/stores?${API_KEY}`)
            .then((res) => {
                setgameName(res.data.results);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    const combinedAPI = gameStore.map((item, id) => {
        const find = gameName.find(item2 => item2.id === item.store_id)
        return find ? { ...item, ...find } : item
    });
    return (
        <>{
            combinedAPI.map((item, id) => (
                <div key={id} className="btn-group my-2" role="group" aria-label="Basic example">
                    <a type="button" target="_blank" href={item.url} className="btn btn-sm btn-dark mx-1 border" >{item.name}</a>
                </div>
            ))
        }
        </>
    )
}
