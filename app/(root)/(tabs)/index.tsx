import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import NoResults from "@/components/NoResults";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import { useAppwrite } from "@/hooks/useAppwrite";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import seed from "@/lib/seed";
import { Property } from "@/types";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Button, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { user } = useGlobalContext();
  const params = useLocalSearchParams<{ filter?: string, query?: string }>();
  const { data: properties, loading, refetch } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    },
    skip: true,
  })
  const {
    data: latestProperties, 
    loading: latestPropertiesLoading, 
  } = useAppwrite({
    fn: getLatestProperties,
  });

  console.log('params', params);
  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.filter, params.query]);

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);


  return (
    <SafeAreaView className="h-full bg-white">
      <Button title="Test" onPress={seed} />
      <FlatList 
        data={properties}
        keyExtractor={(item) => item.$id}
        contentContainerClassName="pb-128 gap-y-16"
        columnWrapperClassName="gap-20 px-20"
        showsVerticalScrollIndicator={false}
        numColumns={2}
        ListHeaderComponent={(
          <View className="px-20 gap-y-20">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-x-8">
                <Image source={{ uri: user?.avatar }} className="size-48 rounded-full" />
                <View className="items-start justify-center">
                  <Text className="text-xs font-rubik text-black-100">good</Text>
                  <Text className="text-base font-rubik-medium text-black-300">{user?.name}</Text>
                </View>
              </View>
              <Image source={icons.bell} className="size-24" />
            </View>
            <Search onFilterPress={() => router.push('/explore')} />
            <View className="flex-row items-center justify-between">
              <Text className="text-xl font-rubik-bold text-black-300">Featured</Text>
              <TouchableOpacity onPress={() => {}}>
                <Text className="text-base font-rubik-bold text-primary-300">See All</Text>
              </TouchableOpacity>
            </View>
            {latestPropertiesLoading
              ? (
                <ActivityIndicator size="large" className="text-primary-300 mt-20" />
              ) : !latestProperties || latestProperties.length === 0 ? (
                <NoResults />
              ) : (
                <FlatList 
                  data={latestProperties}
                  renderItem={({ item }) => (
                    <FeaturedCard 
                      item={item as unknown as Property} 
                      onPress={() => handleCardPress(item.$id)} 
                    />
                  )}
                  keyExtractor={(item) => item.$id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerClassName="gap-20"
                  bounces={false}
                />
              )
            }
            <View className="flex-row items-center justify-between">
              <Text className="text-xl font-rubik-bold text-black-300">Our Recommendations</Text>
              <TouchableOpacity onPress={() => {}}>
                <Text className="text-base font-rubik-bold text-primary-300">See All</Text>
              </TouchableOpacity>
            </View>
            <Filters />
          </View>
        )}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" className="text-primary-300 mt-20" />
          ): <NoResults />
        }
        renderItem={({ item }) => (
          <Card 
            item={item as unknown as Property} 
            onPress={() => handleCardPress(item.$id)} 
          />
        )}
      />
      
    </SafeAreaView>
  );
}
