import colors from '@/constants/colors';
import icons from '@/constants/icons';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface CounterProps {
  onDecrease: () => void;
  onIncrease: () => void;
  quantity: number;
}

const Counter = ({
  onDecrease,
  onIncrease,
  quantity,
}: CounterProps) => {
  return (
    <View className="flex-row items-center gap-x-16">
      <TouchableOpacity
        onPress={() => onDecrease?.()}
        className="size-20 items-center justify-center rounded-full bg-primary-100"
        disabled={quantity === 1}
      >
        <Image
          source={icons.minus}
          className="size-1/2"
          resizeMode="contain"
          tintColor={colors.primary[300]}
        />
      </TouchableOpacity>

      <Text className="text-black-300 text-base font-rubik-medium">
        {quantity}
      </Text>

      <TouchableOpacity
        onPress={() => onIncrease?.()}
        className="size-20 items-center justify-center rounded-full bg-primary-100"
      >
        <Image
          source={icons.plus}
          className="size-1/2"
          resizeMode="contain"
          tintColor={colors.primary[300]}
        />
      </TouchableOpacity>
    </View>
  )
}

export default Counter