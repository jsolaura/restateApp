import { categories } from '@/constants/data';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const Filters = () => {
  const params = useLocalSearchParams<{ filter?: string }>();
  const [selectedCategory, setSelectedCategory] = useState(params.filter || 'All');

  useEffect(() => {
    setSelectedCategory(params.filter || 'All');
  }, [params.filter])

  const handleCategory = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory('All');
      router.setParams({ filter: 'All' });
      return;
    }
    
    setSelectedCategory(category);
    router.setParams({ filter: category, query: '' });
  }

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
    >
      <View className="flex-row gap-x-8">
        {categories.map((item) => (
          <TouchableOpacity 
            key={item.category} 
            onPress={() => handleCategory(item.category)}
            className={`
              ${selectedCategory === item.category 
                ? 'bg-primary-300' 
                : 'bg-primary-100 border border-primary-200'} 
                items-start rounded-full px-16 py-8`}
          >
            <Text 
              className={`
                ${selectedCategory === item.category 
                  ? 'text-white font-rubik-bold mt-2' 
                  : 'text-black-300 font-rubik'} 
                text-sm`}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  )
}

export default Filters