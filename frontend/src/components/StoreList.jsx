import { useEffect, useState } from "react"
import axios from 'axios'

export default function StoreList({ gameid }) {
    const [gameStore, setgameStore] = useState([])
    const [gameName, setgameName] = useState([])

    const FetchData = () => {
        const url = `https://api.rawg.io/api/games/${gameid}/stores?key=3f4a034d7b034f7bbea4371034a6e66d`
        axios
            .get(url)
            .then((res) => {
                console.log(res.data);
                setgameStore(res.data.results);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        FetchData()

        axios
            .get('http://localhost:8000/api/stores')
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
                <div key={id} className="btn-group" role="group" aria-label="Basic example">
                    <a type="button" target="_blank" href={item.url} className="btn btn-sm btn-dark mx-1 border" >{item.name}</a>
                </div>
            ))
        }
        </>
    )
}
