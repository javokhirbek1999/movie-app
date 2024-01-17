import axios from "axios";
import { API_KEY } from "../constants";


// Endpoints
const API_BASE_URL = 'https://api.themoviedb.org/3'

const trendingMoviesEndpoint = `${API_BASE_URL}/trending/movie/day?api_key=${API_KEY}`
const upcomingMovieEndpoint = `${API_BASE_URL}/movie/upcoming?api_key=${API_KEY}`
const topRatedMoviesEndpoint = `${API_BASE_URL}/movie/top_rated?api_key=${API_KEY}`


// Dynamic endpoints
const movieDetailsEndpoint = id => `${API_BASE_URL}/movie/${id}?api_key=${API_KEY}`
const movieCreditsEndpoint = id => `${API_BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`
const similarMoviesEndpoint = id => `${API_BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`
const searchMoviesEndpoint =  `${API_BASE_URL}/search/movie?api_key=${API_KEY}`


const personDetailsEndpoint = id => `${API_BASE_URL}/person/${id}?api_key=${API_KEY}`
const personMoviesEndpoint = id => `${API_BASE_URL}/person/${id}/movie_credits?api_key=${API_KEY}`

export const image500 = path => path ? `https://image.tmdb.org/t/p/w500${path}` : null
export const image342 = path => path ? `https://image.tmdb.org/t/p/w342${path}` : null
export const image185 = path => path ? `https://image.tmdb.org/t/p/w185${path}` : null


export const defaultProfileImage = 'https://as2.ftcdn.net/v2/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg'



const apiCall = async (endpoint, params) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params ? params : {}
    }


    try {
        const response = await axios.request(options)
        return response.data
    } catch (error) {
        console.log('Error', error)
        return {}
    }
}

export const fetchTrendingMovies = () => {
    return apiCall(trendingMoviesEndpoint)
}

export const fetchUpcomingMovies = () => {
    return apiCall(upcomingMovieEndpoint)
}

export const fetchTopRatedMovies = () => {
    return apiCall(topRatedMoviesEndpoint)
}

export const fetchMovieDetails = id => {
    return apiCall(movieDetailsEndpoint(id))
}

export const fetchMovieCredits = id => {
    return apiCall(movieCreditsEndpoint(id))
}

export const fetchSimilarMovies = id => {
    return apiCall(similarMoviesEndpoint(id))
}

export const fetchPersonDetails = id => {
    return apiCall(personDetailsEndpoint(id))
}

export const fetchPersonMovies = id => {
    return apiCall(personMoviesEndpoint(id))
}

export const searchMovies = params => {
    return apiCall(searchMoviesEndpoint, params)
}