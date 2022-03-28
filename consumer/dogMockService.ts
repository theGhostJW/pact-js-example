import axios from "axios"

type DogParams = {
  url: string,
  port: number
}

export const allDogsRequest = (endpoint: DogParams) => {
  const
    url = endpoint.url,
    port = endpoint.port

  return axios.request({
    method: "GET",
    baseURL: `${url}:${port}`,
    url: "/dogs",
    headers: { Accept: "application/json" },
  })
}

export const dog1Request = (endpoint: DogParams) => {
  const
    url = endpoint.url,
    port = endpoint.port

  return axios.request({
    method: "GET",
    baseURL: `${url}:${port}`,
    url: "/dogs/1",
    headers: { Accept: "application/json" },
  })
}

export const EXPECTED_DOGS_BODY = [
  {
    dog: 1,
  },
  {
    dog: 2,
  }
]

export const EXPECTED_DOG1_BODY = [
  {
    dog: 1
  }
]
