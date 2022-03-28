import axios from "axios"


export const fetchMovies = async (url: string) =>
  await axios
    .get(`${url}/movies`)
    .then((res) => res.data)
    .catch((err) => err.response)


export const fetchSingleMovie = async (url: string, id: number) =>
  await axios
    .get(`${url}/movie/${id}`)
    .then((res) => res.data)
    .catch((err) => err.response)


export const addNewMovie = async (url: string, movieName: string, movieYear: number) => {
  const data = {
    name: movieName,
    year: movieYear,
  }
  return await axios
    .post(`${url}/movies`, data)
    .then((res) => res.data)
    .catch((err) => err.response.data.message)
}

export const deleteMovie = async (url: string, id: number) =>
  await axios
    .delete(`${url}/movie/${id}`)
    .then(res => res.data.message)
    .catch(err => err.response.data.message)
