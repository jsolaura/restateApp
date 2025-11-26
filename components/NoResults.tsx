import images from '@/constants/images'
import { Image, Text, View } from 'react-native'

const NoResults = () => {
  return (
    <View className="items-center my-20 gap-y-20">
      <Image 
        source={images.noResult} 
        className="w-[91%] h-[20rem]" 
        resizeMode="contain"
      />
      <View className="gap-y-4 items-center">
        <Text className="text-2xl font-rubik-bold text-black-300">No Results</Text>
        <Text className="text-base text-black-100">
          We could not find any results
        </Text>
      </View>
    </View>
  )
}

export default NoResults