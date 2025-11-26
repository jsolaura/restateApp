import { ReactNode } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface CardSectionProps {
  title: string;
  onPress: () => void;
  children: ReactNode;
  filters?: ReactNode;
}

const CardSection = ({ title, onPress, children, filters }: CardSectionProps) => {
  return (
    <View className="gap-y-20">
      <View className="flex-row items-center justify-between">
        <Text className="text-xl font-rubik-bold text-black-300">{title}</Text>
        <TouchableOpacity onPress={onPress}>
          <Text className="text-base font-rubik-bold text-primary-300">See All</Text>
        </TouchableOpacity>
      </View>
      {filters && filters}
      <View className="flex-row gap-20">
        {children}
      </View>
    </View>
  )
}

export default CardSection