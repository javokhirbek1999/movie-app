import { View, Text, Dimensions, Platform, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/solid'
import { styles, theme } from '../theme'
import { useNavigation, useRoute } from '@react-navigation/native'
import MovieList from '../components/MovieList'
import Loading from '../components/Loading'
import { defaultProfileImage, fetchPersonDetails, fetchPersonMovies, image342 } from '../api/moviesdb'


var {width, height} = Dimensions.get('window')

const ios = Platform.OS === 'ios'


export default function PersonScreen() {

    const navigation = useNavigation()
    
    const {params: item} = useRoute()
    const [isFavorite, setIsFavorite] = useState(false)
    const [person, setPerson] = useState({})
    const [personMovies, setPersonMovies] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setLoading(true)
        getPersonDetails(item.id)
        getPersonMovies(item.id)
        // console.log('ITEM: ',person)
    },[item])

    const getPersonDetails = async id => {
        const data = await fetchPersonDetails(id)
        // console.log('Person details: ', data)
        if (data) setPerson(data)
        setLoading(false)
    }

    const getPersonMovies = async id => {
        const data = await fetchPersonMovies(id)
        // console.log('Person movies: ', data)
        if (data && data.cast) setPersonMovies(data.cast)
        // if (data) setPersonMovies(data)

    }

    return (
        <ScrollView className='flex-1 bg-neutral-800' contentContainerStyle={{paddingBottom: 20}}>

            {/* Back button */}
            <View className='w-full'>

                <SafeAreaView className='flex-1 flex-row justify-between z-20 w-full items-center px-4'>
                    <TouchableOpacity style={styles.background} className='rounded-xl p-1 mx-3' onPress={() => navigation.goBack()}>
                        <ChevronLeftIcon size={28} strokeWidth={2.5} color='white' />
                    </TouchableOpacity>
                    <TouchableOpacity className='mx-3' onPress={() => setIsFavorite(!isFavorite)}>
                        <HeartIcon size={35} color={isFavorite ? theme.background : "white"} />
                    </TouchableOpacity>
                </SafeAreaView>

                {loading ? (<Loading />) : (
                    <View>
                        {/* Person details */}
                <View className='flex-row justify-center'
                    style={{
                        shadowColor: 'gray',
                        shadowRadius: 40,
                        shadowOffset: {width: 0, height: 5},
                        shadowOpacity: 1
                    }}
                    >
                    <View className='flex-row justify-center'>
                        <View className='items-center rounded-full overflow-hidden h-72 w-72 border border-neutral-900'>
                            <Image source={{uri: image342(person?.profile_path) || defaultProfileImage}} style={{height: height*0.43, width: width*0.74}} />
                        </View>
                    </View>

                </View>


                <View className='mt-6'>
                    <Text className='text-3xl text-white font-bold text-center'>{person?.name}</Text>
                    <Text className='text-base text-neutral-500 text-center'>
                        {
                            person?.place_of_birth
                        }
                    </Text>
                </View>

                <View className='mx-1 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full'>
                    <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
                        <Text className='text-white font-semibold'>Gender</Text>
                        <Text className='text-neutral-300 text-sm'>{person?.gender === 2 ? 'Male' : 'Female'}</Text>
                    </View>
                    <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
                        <Text className='text-white font-semibold'>Birthday</Text>
                        <Text className='text-neutral-300 text-sm'>{person?.birthday}</Text>
                    </View>
                    <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
                        <Text className='text-white font-semibold'>Known for</Text>
                        <Text className='text-neutral-300 text-sm'>{person?.known_for_department}</Text>
                    </View>
                    <View className='px-2 items-center'>
                        <Text className='text-white font-semibold'>Popularity</Text>
                        <Text className='text-neutral-300 text-sm'>{person?.popularity}</Text>
                    </View>
                </View>


                <View className='my-6 mx-4 space-y-2'>
                    <Text className='text-white text-lg'>Biography</Text>
                    <Text className='text-neutral-400 tracking-wide'>
                        {
                            person?.biography
                        }
                    </Text>
                </View>                       
                
                {/* Movies */}
                <MovieList title={'Movies'} seeAll={false} data={personMovies} /> 
                    </View>  
                )}
                
            </View>
        </ScrollView>
    )
}