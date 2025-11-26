import { initialFilters, propertyTypes } from '@/constants/data';
import icons from '@/constants/icons';
import { Filter } from '@/types';
import { getPrice } from '@/utils/getPrice';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { forwardRef, useState } from 'react';
import { Image, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Counter from '../Counter';
import RangeSlider from '../RangeSlider';
import InfoSection from './InfoSection';

interface FilterBottomSheetProps {
  closeSheet?: () => void;
  onSubmit?: (filters: Filter) => void;
}

const FilterBottomSheet = forwardRef<BottomSheetModal, FilterBottomSheetProps>(({
  closeSheet,
  onSubmit,
}, ref) => {

  const [filters, setFilters] = useState<Filter>(initialFilters);

  const handlePropertyType = (type: string) => {
    if (filters.propertyType.includes(type)) {
      setFilters({ ...filters, propertyType: filters.propertyType.filter((t) => t !== type) });
    } else {
      setFilters({ ...filters, propertyType: [...filters.propertyType, type] });
    }
  }

  const handleCounter = (name: 'bedrooms' | 'bathrooms', value: number, operation: 'increase' | 'decrease') => {
    setFilters({ ...filters, [name]: operation === 'increase' ? value + 1 : value - 1 });
  }

  const handleReset = () => {
    setFilters(initialFilters);
  }

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={['85%']}
      enableDismissOnClose
      enablePanDownToClose
      enableContentPanningGesture={false}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          pressBehavior="close"
        />
      )}
    >
      <BottomSheetView>
        <ScrollView className="flex-1 h-full px-20 pb-80">
          <View className="gap-y-32 ">
            <View className="flex-row items-center justify-between">
              <TouchableOpacity onPress={closeSheet} className="size-32 items-center justify-center rounded-full bg-primary-200">
                <Image source={icons.backArrow} className="size-20" />
              </TouchableOpacity>
              <Text className="text-base font-rubik-medium text-center text-black-300">Filter</Text>
              <TouchableOpacity onPress={handleReset}>
                <Text className="text-base font-rubik-medium text-center text-primary-300">Reset</Text>
              </TouchableOpacity>
            </View>
            <InfoSection title="Price Range">
              <View className="pb-10">
                <RangeSlider 
                  min={1000}
                  max={10000}
                  values={[1, 10000]}
                  onValuesChange={(values: number[]) => 
                    setFilters({ ...filters, priceRange: { min: Number(getPrice(values[0])), max: Number(getPrice(values[1])) } })
                  }
                  isPrice
                />
              </View>
            </InfoSection>
            <InfoSection title="Property Type">
              <View className="flex-row flex-wrap gap-10">
                {propertyTypes.map((type) => (
                  <TouchableOpacity 
                    key={type} 
                    className={`
                      ${filters.propertyType.includes(type) ? 'bg-primary-300' : 'bg-primary-100 border border-primary-200'}
                      flex-row items-center justify-start rounded-full px-16 py-4
                    `}
                    onPress={() => handlePropertyType(type)}
                  >
                    <Text className={`text-sm ${filters.propertyType.includes(type) ? 'text-white font-rubik-medium' : 'text-black-300 font-rubik'}`}>
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </InfoSection>
            <InfoSection title="Home Details">
              <View className="gap-y-16">
                <View className="flex-row items-center justify-between">
                  <Text className="text-base font-rubik-medium text-black-200">Bedrooms</Text>
                  <Counter 
                    onDecrease={() => handleCounter('bedrooms', filters.bedrooms, 'decrease')} 
                    onIncrease={() => handleCounter('bedrooms', filters.bedrooms, 'increase')} 
                    quantity={filters.bedrooms}
                  />
                </View>
                <View className="h-px w-full bg-gray-200" />
                <View className="flex-row items-center justify-between">
                  <Text className="text-base font-rubik-medium text-black-200">Bathrooms</Text>
                  <Counter 
                    onDecrease={() => handleCounter('bathrooms', filters.bathrooms, 'decrease')} 
                    onIncrease={() => handleCounter('bathrooms', filters.bathrooms, 'increase')} 
                    quantity={filters.bathrooms}
                  />
                </View>
              </View>
            </InfoSection>
            <InfoSection title="Building Size">
              <RangeSlider 
                min={500}
                max={10000}
                values={[500, 10000]}
                onValuesChange={(values: number[]) => 
                  setFilters({ ...filters, buildingSize: { min: values[0], max: values[1] } })
                }
              />
            </InfoSection>
            <Pressable 
              onPress={() => onSubmit?.(filters)} 
              className="bg-primary-300 rounded-full py-10 items-center justify-center shadow-lg shadow-black-200/10"
            >
              <Text className="text-white text-base font-rubik-medium">Set Filters</Text>
            </Pressable>
          </View>
        </ScrollView>
      </BottomSheetView>
    </BottomSheetModal>
  )
});

FilterBottomSheet.displayName = 'FilterBottomSheet';

export default FilterBottomSheet;