import axios from 'axios'

export const getAllPokemons = (setData) => {
    axios
        .get("https://pokeapi.co/api/v2/pokemon?limit=30&offset=0")
        .then((res) => {
            const pokeResult = res.data.results;
            const newRequest = pokeResult.map((poke) => axios.get(poke.url))
            Promise.all(newRequest)
                .then((res) => {
                    const pokeData = res.map((pokemon) => pokemon.data)
                    setData(pokeData)
                })
        })
        .catch((err) => {
            console.log(err)
        })
}

export const getPokeByName = (name, setData) => {
    axios
        .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((res) => {
            setData(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
}