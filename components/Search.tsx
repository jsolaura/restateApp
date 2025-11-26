import colors from '@/constants/colors';
import icons from '@/constants/icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';
import { useDebouncedCallback } from 'use-debounce';

interface SearchProps {
  onFilterPress?: () => void;
  isActive?: boolean;
}

const Search = ({ onFilterPress, isActive = false }: SearchProps) => {
  const params = useLocalSearchParams<{ query?: string }>();
  const [search, setSearch] = useState(params.query || '');

  const debounceSearch = useDebouncedCallback((text: string) => 
    router.setParams({ query: text }), 500);

  const handleSearch = (text: string) => {
    setSearch(text);
    debounceSearch(text);
  }

  return (
    <View className="flex-row items-center justify-between w-full px-16 py-8 rounded-lg bg-accent-100 border border-primary-100">
      <View className="flex-1 flex-row items-center justify-start z-50 gap-x-8">
        <Image source={icons.search} className="size-20" />
        <TextInput 
          value={search}
          onChangeText={handleSearch}
          placeholder="Search for a property"
          className="text-sm font-rubik text-black-300 flex-1"
        />
      </View>
      <TouchableOpacity onPress={onFilterPress}>
        <Image source={icons.filter} className="size-20" tintColor={isActive ? colors.primary[300] : colors.black[300]} />
      </TouchableOpacity>
    </View>
  )
}

export default Search