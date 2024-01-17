import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, Platform, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { styles, theme } from '../theme'
import { LinearGradient } from 'expo-linear-gradient'
import Cast from '../components/Cast'
import MovieList from '../components/MovieList'
import Loading from '../components/Loading'
import { fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from '../api/moviesdb'



const {width, height} = Dimensions.get('window')

const ios = Platform.OS === 'ios'


export default function MovieScreen() {

    const {params: item} = useRoute();

    const [isFavorite, setIsFavorite] = useState(false)

    const navigation = useNavigation()

    const [cast, setCast] = useState([])

    const [similarMovies, setSimilarMovies] = useState([])

    const [loading, setLoading] = useState(false)

    const [movie, setMovie] = useState({})


    useEffect(() => {

        setLoading(true);
        getMovieDetails(item.id)
        getMovieCredits(item.id)
        getSimilarMovies(item.id)
    },[item])

    const getMovieDetails = async id => {
        const data = await fetchMovieDetails(id)
        
        if (data) setMovie(data)

        setLoading(false)
    }

    
    const getMovieCredits = async id => {
        const data = await fetchMovieCredits(id)
        // console.log('Movie credits: ', data)
        if (data && data.cast) setCast(data.cast)

    }

    const getSimilarMovies = async id => {
        const data = await fetchSimilarMovies(id)
        // console.log('Movie credits: ', data)
        if (data && data.results) setSimilarMovies(data.results)

    }

    return (
        <ScrollView
            contentContainerStyle={{paddingBottom: 20}}
            className='flex-1 bg-neutral-900'
        >
            {/* Back button and movie poster */}
            <View className='w-full'>
                <SafeAreaView className={`absolute z-20 w-full flex-row justify-between items-center px-3 ${!ios? 'mt-3' : ''}`}>
                    <TouchableOpacity style={styles.background} className='rounded-xl p-1 mx-3' onPress={() => navigation.goBack()}>
                        <ChevronLeftIcon size={28} strokeWidth={2.5}  color='white'/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)} className='mx-3'>
                        <HeartIcon size={35} color={isFavorite ? theme.background : 'white'} />
                    </TouchableOpacity>

                </SafeAreaView>

                {loading ? <Loading /> :
                <View>
                <View>
                    <Image 
                        source={{uri: image500(movie?.poster_path)}}
                        style={{width, height: height * 0.6}}
                    />
                    <LinearGradient 
                        colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23, 1)']}
                        style={{width, height: height * 0.4}}
                        start={{x:0.5, y: 0}}
                        end={{x:0.5,y:1}}
                        className='absolute bottom-0'
                    />
                </View>

                {/* Movie details */}
                <View style={{marginTop: -(height * 0.09)}} className='space-y-3'>
                    <Text className='text-white text-center text-3xl font-bold tracking-wider'>{movie?.title}</Text>
                </View>

                {/* Status, release, duration */}
                {
                    movie?.id?(
                        <Text className='text-neutral-400 font-semibold text-base text-center mt-2'>
                            {movie?.status} · {movie?.release_date?.split('-')[0]} · {movie?.runtime} min
                        </Text>
                    ):null
                }

                {/* Genres */}
                <View className='flex-row justify-center mx-4 space-x-2'>
                    {
                        movie?.genres?.map((genre, index) => {
                            let showDot = index+1 != movie.genres.length
                            return (
                                <Text key={index} className='text-neutral-400 font-semibold text-base text-center'>{genre?.name} {showDot ? `·` : null}</Text>
                            )
                        })
                    }
                </View>

                {/* Description */}
                <Text className='text-neutral-400 mx-4 tracking-wide mt-3'>
                    {
                        movie?.overview
                    }
                </Text>

                {/* Cast */}
                <Cast navigation={navigation} cast={cast} />


                {/* Similar movies */}
                <MovieList title='Similar Movies' seeAll={false} data={similarMovies} />
                </View>
                }
            </View>
        </ScrollView>
    )
}