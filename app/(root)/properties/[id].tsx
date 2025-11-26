import InfoSection from '@/components/property/InfoSection';
import ReviewSection from '@/components/property/ReviewSection';
import colors from '@/constants/colors';
import { facilities } from '@/constants/data';
import icons from '@/constants/icons';
import images from '@/constants/images';
import { useAppwrite } from '@/hooks/useAppwrite';
import { getPropertyById } from '@/lib/appwrite';
import { Property as PropertyType } from '@/types';
import { getPrice } from '@/utils/getPrice';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { router, useLocalSearchParams } from 'expo-router';
import { Dimensions, FlatList, Image, Platform, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

dayjs.extend(relativeTime);

export default function Property() {
  const insets = useSafeAreaInsets();

  const { id } = useLocalSearchParams();
  const { data: property } = useAppwrite({
    fn: getPropertyById,
    params: {
      id: id! as string,
    },
  });
  const windowHeight = Dimensions.get('window').height;

  console.log('property', JSON.stringify(property, null, 2));
  if(!property) return null;

  const renderPropertyInfo = [
    { icon: icons.bed, value: `${property.bedrooms} Beds` },
    { icon: icons.bath, value: `${property.bathrooms} Bath` },
    { icon: icons.area, value: `${property.area} sqft` },
  ]
  return (
    <View className="flex-1 bg-white relative">
      <View 
        className="z-50 fixed px-20 left-0 right-0"
        style={{ top: Platform.OS === 'ios' ? 70 : 40 }}
      >
        <View className="flex-row items-center justify-between w-full">
          <TouchableOpacity onPress={() => router.back()}>
            <Image source={icons.backArrow} className="size-24" />
          </TouchableOpacity>
          <View className="flex-row items-center justify-center gap-x-16">
            <Image source={icons.heart} className="size-24" tintColor={colors.black[300]} />
            <Image source={icons.chat} className="size-24" tintColor={colors.black[300]} />
          </View>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-12 bg-white"
        style={{ marginTop: -insets.top }} // <-- 핵심
      >
        <View style={{ height: windowHeight / 2 }}>
          <Image
            source={{ uri: property?.image }}
            className="size-full"
            resizeMode="cover"
          />
          <Image
            source={images.whiteGradient}
            className="w-full z-40 absolute top-0"
          />
        </View>
        <View className="px-20 py-24 gap-y-30 bg-white">
          <View className="gap-y-16">
            <Text className="text-2xl font-rubik-extrabold">{property.name}</Text>
            <View className="flex-row items-center gap-x-10">
              <View className="px-12 py-4 bg-primary-200 rounded-full">
                <Text className="text-base font-rubik-medium text-primary-300">
                  {property.type}
                </Text>
              </View>
              <View className="flex-row items-center"></View>
                <Image source={icons.star} className="size-10" />
                <Text className="text-base font-rubik-medium text-black-200">
                  {property.rating} ({property.reviews.length} reviews)
                </Text>
              </View>
            <View className="flex-row items-center justify-between">
              {renderPropertyInfo.map((item, index) => (
                <View key={index} className="flex-row items-center gap-x-8">
                  <View className="items-center justify-center bg-primary-200 rounded-full size-40">
                    <Image source={item.icon} className="size-16" tintColor={colors.primary[300]} />
                  </View>
                  <Text className="text-base font-rubik-medium text-black-300">
                    {item.value}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          <View className="bg-primary-100 w-full h-2" />
          <InfoSection title="Agent">
            <View className="flex-row items-center">
              <View className="flex-row items-center gap-x-16 flex-1">
                <Image 
                  source={{ uri: property.agents.avatar }} 
                  className="size-60 rounded-full" 
                  resizeMode="cover"
                />
                <View className="gap-y-2">
                  <Text className="text-lg font-rubik-bold text-black-300">
                    {property.agents.name}
                  </Text>
                  <Text className="text-base font-rubik-medium text-black-200">
                    {property.agents.email}
                  </Text>
                </View>
              </View>
              <View className="flex-row gap-x-16">
                <Image source={icons.chat} className="size-24" tintColor={colors.primary[300]} />
                <Image source={icons.phone} className="size-24" tintColor={colors.primary[300]} />
              </View>
            </View>
          </InfoSection>
          <InfoSection title="Overview">
            <Text className="text-base font-rubik text-black-200">
              {property.description}
            </Text>
          </InfoSection>
          <InfoSection title="Facilities">
            <View className="flex-row items-center justify-start gap-x-10">
              {property.facilities.map((facility: string, index: number) => {
                const facilityIcon = facilities.find((f) => f.title === facility)?.icon;
                return (
                  <View key={index} className="items-center gap-y-8 w-80">
                    <View className="items-center justify-center bg-primary-200 rounded-full size-40">
                      <Image source={facilityIcon} className="size-28" tintColor={colors.primary[300]} />
                    </View>
                    <Text className="text-base font-rubik text-black-300" numberOfLines={1}>
                      {facility}
                    </Text>
                  </View>
                )
              })}
            </View>
          </InfoSection>
          <InfoSection title="Gallery">
            <FlatList
              data={property.galleries}
              renderItem={({ item, index }) => (
                <Image source={{ uri: item.image }} className="size-118 rounded-lg" resizeMode="cover" />
              )}
              keyExtractor={(item) => item.$id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerClassName="gap-x-16"
            />
          </InfoSection>
          <InfoSection title="Location">
            <View className="gap-y-16">
              <View className="flex-row gap-x-8">
                <Image source={icons.location} className="size-20" tintColor={colors.primary[300]} />
                <Text className="text-base font-rubik-medium text-black-200">
                  {property.address}
                </Text>
              </View>
              {/* TODO: Add map here */}
            </View>
          </InfoSection>
          <ReviewSection property={property as unknown as PropertyType} />
        </View>
      </ScrollView> 
      <View className="fixed bottom-0 w-full flex-row items-center justify-between pt-20 pb-40 px-20 rounded-t-3xl border border-b-0 border-gray-200">
        <View className="flex-1 gap-y-4">
          <Text className="text-sm font-rubik-medium text-black-200 uppercase tracking-widest">
            price
          </Text>
          <Text className="text-2xl font-rubik-bold text-primary-300">
            ₩ {getPrice(property.price)}
          </Text>
        </View>
        <Pressable 
          onPress={() => {}}
          className="bg-primary-300 rounded-full px-20 py-12 items-center"
        >
          <Text className="text-base font-rubik-bold text-white">
            Booking Now
          </Text>
        </Pressable>
      </View>
    </View>
  );
}