import { Card } from "@/components/Cards";
import Filters from "@/components/Filters";
import NoResults from "@/components/NoResults";
import FilterBottomSheet from "@/components/property/FilterBottomSheet";
import Search from "@/components/Search";
import { initialFilters } from "@/constants/data";
import icons from "@/constants/icons";
import { useAppwrite } from "@/hooks/useAppwrite";
import { getProperties } from "@/lib/appwrite";
import { Filter, Property } from "@/types";
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Explore() {

  const params = useLocalSearchParams<{ filter?: string, query?: string }>();
  const [appliedFilters, setAppliedFilters] = useState<Partial<Filter> | undefined>(undefined);
  
  const { data: properties, loading, refetch } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 20,
      filters: appliedFilters,
    },
    skip: true,
  })
  
  const sheetRef = useRef<BottomSheetModal>(null);
  const openSheet = () => {
    sheetRef.current?.present();
  }
  const closeSheet = () => {
    sheetRef.current?.dismiss();
  }

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 20,
      filters: appliedFilters,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.filter, params.query, appliedFilters]);

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  const handleSubmit = (filters: Filter) => {
    if(JSON.stringify(initialFilters) === JSON.stringify(filters)) {
      setAppliedFilters(undefined);
    } else {
      setAppliedFilters(filters);
    }
    router.setParams({ filter: 'All', query: '' });
    closeSheet();
  }

  return (
    <>
      <SafeAreaView className="h-full bg-white">
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
                <TouchableOpacity 
                  onPress={() => router.back()} 
                  className="flex-row bg-primary-200 rounded-full size-40 items-center justify-center"
                >
                  <Image source={icons.backArrow} className="size-20" />
                </TouchableOpacity>
                <Text className="text-base font-rubik-medium text-center text-black-300">
                  Search for Your Ideal Home
                </Text>
                <TouchableOpacity>
                  <Image source={icons.bell} className="size-20" />
                </TouchableOpacity>
              </View>
              <Search onFilterPress={openSheet} isActive={!!appliedFilters} />
              <Filters />
              <Text className="text-xl font-rubik-bold text-black-300">
                Found {properties?.length} {!params.filter || params.filter === 'All' ? 'properties' : params.filter}
              </Text>
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
      <FilterBottomSheet 
        ref={sheetRef} 
        closeSheet={closeSheet}
        onSubmit={handleSubmit}
      />
    </>
  );
}
