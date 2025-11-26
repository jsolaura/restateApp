import icons from '@/constants/icons';
import { Property } from '@/types';
import { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Comment from '../Comment';
import InfoSection from './InfoSection';

interface ReviewSectionProps {
  property: Property;
}

const ReviewSection = ({ property }: ReviewSectionProps) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <InfoSection 
      title={(
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center gap-x-8">
            <Image source={icons.star} className="size-20" />
            <Text className="text-base font-rubik-bold text-black-300">
              {property.rating} ({property.reviews.length} reviews)
            </Text>
          </View>
          {property.reviews.length > 1 && 
            <TouchableOpacity onPress={() => setShowAll(!showAll)}>
              <Text className="text-base font-rubik-bold text-primary-300">
                {showAll ? 'See Less' : 'See All'}
              </Text>
            </TouchableOpacity>
          }
        </View>
      )}
    >
      {showAll ? (
        property.reviews.map((item, index) => (
          <View key={item.$id} className="gap-y-12">
            <Comment 
              avatar={item.avatar} 
              name={item.name} 
              review={item.review} 
              likes={item.likes} 
              createdAt={item.$createdAt} 
            />
            {index !== property.reviews.length - 1 && (
              <View className="bg-primary-100 w-full h-2" />
            )}
          </View>
        ))
      ) : (
        <Comment 
          avatar={property.reviews[0].avatar}
          name={property.reviews[0].name}
          review={property.reviews[0].review}
          likes={property.reviews[0].likes}
          createdAt={property.reviews[0].$createdAt}
        />
      )
      }
      
    </InfoSection>
  )
}

export default ReviewSection