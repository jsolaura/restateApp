import colors from '@/constants/colors';
import icons from '@/constants/icons';
import images from '@/constants/images';
import { Property } from '@/types';
import { getPrice } from '@/utils/getPrice';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  onPress: () => void;
  item: Property;
}

export const FeaturedCard = ({ 
  onPress,
  item
}: Props) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      className="items-start w-[15rem] h-[20rem] relative"
    >
      <Image
        source={{ uri: item.image }}
        className="size-full rounded-2xl"
      />
      <Image
        source={images.cardGradient}
        className="size-full rounded-2xl absolute bottom-0"
      />
      <Star 
        rating={item.rating}
        px="px-12"
        py="py-6"
        gapX="gap-x-4"
        iconSize="size-14"
        position="top-12 right-12"
      />
      <View className="items-start absolute bottom-12 inset-x-12 gap-12">
        <View>
          <Text className="text-xl font-rubik-extrabold text-white" numberOfLines={1}>
            {item.name}
          </Text>
          <Text className="text-base font-rubik text-white">
            {item.address}
          </Text>
        </View>
        <View className="flex-row items-center justify-between w-full">
          <Text className="text-xl font-rubik-extrabold text-white">
            ₩ {getPrice(item.price)}
          </Text>
          <Image source={icons.heart} className="size-20" />
        </View>
      </View>
    </TouchableOpacity>
  )
}

export const Card = ({
  onPress,
  item
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-1 w-full px-12 py-16 rounded-lg bg-white shadow-lg shadow-black-100/70 relative"
    >
      <Star 
        rating={item.rating}
        px="px-8"
        py="py-4"
        gapX="gap-x-2"
        iconSize="size-10"
        zIndex={true}
        position="top-20 right-20"
      />
      <Image 
        source={{ uri: item.image }}
        className="w-full h-[10rem] rounded-lg"
      />
      <View className="mt-8">
        <Text className="text-base font-rubik-bold text-black-300" numberOfLines={1}>
          {item.name}
        </Text>
        <Text className="text-xs font-rubik text-black-200">
          {item.address}
        </Text>
        <View className="flex-row items-center justify-between mt-2">
          <Text className="text-base font-rubik-bold text-primary-300">
            ₩ {getPrice(item.price)}
          </Text>
          <Image 
            source={icons.heart} 
            className="w-[1.25rem] h-[1.25rem]" 
            tintColor={colors.black[300]}
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}

const Star = ({
  rating,
  px,
  py,
  gapX,
  iconSize,
  position,
  zIndex = false,
}: {
  rating: number;
  px: 'px-12' | 'px-8';
  py: 'py-6' | 'py-4';
  gapX: 'gap-x-4' | 'gap-x-2';
  iconSize: 'size-14' | 'size-10';
  position: 'top-12 right-12' | 'top-20 right-20';
  zIndex?: boolean;
}) => (
  <View className={`${px} ${py} ${gapX} ${zIndex ? 'z-50' : ''} ${position} flex-row items-center bg-white/90 rounded-full absolute`}>
    <Image 
      source={icons.star} 
      className={iconSize} 
    />
    <Text className="text-xs font-rubik-bold text-primary-300">{rating}</Text>
  </View>
)