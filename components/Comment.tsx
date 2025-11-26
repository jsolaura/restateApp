import colors from '@/constants/colors';
import icons from '@/constants/icons';
import dayjs from 'dayjs';
import { Image, Text, View } from 'react-native';

interface CommentProps {
  avatar: string;
  name: string;
  review: string;
  likes: number;
  createdAt: string;
}

const Comment = ({ avatar, name, review, likes, createdAt }: CommentProps) => {
  return (
    <View className="gap-y-12">
      <View className="flex-row items-center gap-x-8">
        <Image source={{ uri: avatar }} className="size-40 rounded-full" />
        <Text className="text-base font-rubik-bold text-black-300">
          {name}
        </Text>
      </View>
      <Text className="text-base font-rubik text-black-200">
        {review}
      </Text>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-x-8">
          <Image source={icons.heart} className="size-20" tintColor={colors.primary[300]} />
          <Text className="text-base font-rubik-medium text-black-300">
            {likes}
          </Text>
        </View>
        <Text className="text-base font-rubik text-black-100">
          {dayjs(createdAt).fromNow()}
        </Text>
      </View>
    </View>
  )
}

export default Comment