import { View, Text, Dimensions, SafeAreaView, TextInput, ScrollView, TouchableWithoutFeedback, Image } from 'react-native'
import React, { useCallback, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { XMarkIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import Loading from '../components/Loading'
import { image185, searchMovies } from '../api/moviesdb'


const {width, height} = Dimensions.get('window')

export default function SearchScreen() {

    const navigation = useNavigation()

    const [results, setResults] = useState([1,2,3,4])

    const [loading, setLoading] = useState(false)

    const handleSearch = value => {
        if(value && value.length > 2) {
            setLoading(true)
            searchMovies({
                query: value,
                include_adult: 'false',
                language: 'en-US',
                page: '1'
            }).then((data) => {
                setLoading(false)
                if (data && data.results) setResults(data.results)
            })
        } else {
            setLoading(false)
            setResults([])
        }
    }

    

    return (
        <SafeAreaView className='bg-neutral-800 flex-1'>
            <View className='mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full'>
                <TextInput 
                    onChangeText={handleSearch}
                    placeholder='Search Movie'
                    placeholderTextColor={'lightgray'}
                    className='pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider'
                />

                <TouchableOpacity 
                    onPress={() => navigation.navigate('Home')}
                    className='rounded-full p-3 m-1 bg-neutral-500'
                >
                    <XMarkIcon size={25} color='white' />
                </TouchableOpacity>
            </View>

            {/* Search results */}

            {loading ? (<Loading />) : (
                <View>
                    {
                results.length > 0 ? (

                    <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 15}}
                className='space-y-3 space-x-8 mr-2'
            >
                <Text className='text-white font-semibold ml-1'>Results ({results.length})</Text>

                <View className='flex-row justify-between flex-wrap'>
                    {
                        results.map((item,index) => {
                            return (
                                <TouchableWithoutFeedback
                                    key={index}
                                    onPress={() => navigation.push("Movie", item)}
                                >
                                    <View className='space-y-2 mb-4'>
                                        <Image 
                                            className='rounded-3xl'
                                            source={{uri: image185(item?.poster_path) || 'https://cdn-icons-png.flaticon.com/512/6134/6134065.png'}}
                                            style={{width: width*0.4, height: height * 0.3}}
                                        />
                                        <Text className='text-neutral-300 ml-1'>
                                            {item?.title}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            )
                        })
                    }
                </View>

            </ScrollView>

                ):null
            }
                </View>
            )}            

        </SafeAreaView>
    )
}