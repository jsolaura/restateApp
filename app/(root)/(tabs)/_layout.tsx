import colors from '@/constants/colors';
import icons from '@/constants/icons';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Tabs } from 'expo-router';
import { Image, ImageProps, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface TabIconProps {
  focused: boolean;
  title: string;
  icon: ImageProps;
}

const TabIcon = ({ focused, title, icon }: TabIconProps) => {
  return (
    <View className="flex-1 mt-12 items-center gap-y-4">
      <Image 
        source={icon} 
        tintColor={focused ? colors.primary[300] : colors.black[100]} 
        resizeMode="contain"
        className="size-24"
      />
      <Text className={`${focused 
        ? 'text-primary-300 font-rubik-medium' 
        : 'text-black-200 font-rubik'} 
        text-xs w-full text-center `}>
        {title}
      </Text>
    </View>
  )
}

export default function TabsLayout() {
  return (
    <GestureHandlerRootView className="flex-1">
      <BottomSheetModalProvider>
        <Tabs 
          screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
              backgroundColor: 'white',
              position: 'absolute',
              borderTopWidth: 1,
              borderTopColor: colors.primary[200],
              minHeight: 70,
            },
          }}
        >
          <Tabs.Screen 
            name="index" 
            options={{ 
              title: 'Home',
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <TabIcon focused={focused} title="Home" icon={icons.home} />
              ),
            }} 
          />
          <Tabs.Screen 
            name="explore" 
            options={{ 
              title: 'Explore',
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <TabIcon focused={focused} title="Explore" icon={icons.search} />
              ),
            }} 
          />
          <Tabs.Screen 
            name="profile" 
            options={{ 
              title: 'Profile',
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <TabIcon focused={focused} title="Profile" icon={icons.person} />
              ),
            }} 
          />
        </Tabs>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}