import { View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image, Dimensions } from 'react-native'
import React from 'react'
import { styles } from '../theme'
import { useNavigation } from '@react-navigation/native'
import { iamge185, image185, image342 } from '../api/moviesdb'



const {width, height} = Dimensions.get('window')

export default function MovieList({title, data, seeAll}) {

    const navigation = useNavigation();

    return (
        <View className='mb-8 space-y-4'>
        <View className='mx-4 flex-row justify-between items-center'>
            <Text className='text-white text-xl'>{title}</Text>

            { seeAll && 
                <TouchableOpacity>
                    <Text style={styles.text} className='text-lg'>See All</Text>
                </TouchableOpacity>
            }
        </View>
        {/* Movie row */}
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 15}}
        >
            {
                data.map((item, index) => {
                    return (
                        <TouchableWithoutFeedback
                            key={index}
                            onPress={() => navigation.navigate('Movie', item)}
                        >
                            <View className='space-y-1 mr-4'>
                                <Image 
                                    source={{uri: image185(item.poster_path)}}
                                    className="rounded-3xl"
                                    style={{width: width * 0.3, height: height*0.22}}
                                />
                                <Text className='text-neutral-300 ml-1'>
                                    {item.title.length > 14 ? `${item.title.slice(0,14)}...` : item.title}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    )
                })
            }
        </ScrollView>
        </View>
    )
}