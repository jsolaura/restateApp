import { ReactNode } from 'react';
import { Text, View } from 'react-native';

interface InfoSectionProps {
  title?: string | ReactNode;
  children: ReactNode;
}

const InfoSection = ({ title, children }: InfoSectionProps) => {
  return (
    <View className="gap-y-16">
      {typeof title === 'string' ? (
        <Text className="text-xl font-rubik-bold">{title}</Text>
      ) : title}
      
      {children}
    </View>
  )
}

export default InfoSection