import colors from '@/constants/colors';
import { settings } from '@/constants/data';
import icons from '@/constants/icons';
import { logout } from '@/lib/appwrite';
import { useGlobalContext } from '@/lib/global-provider';
import { Alert, Image, ImageProps, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SettingsItemProps {
  title: string;
  icon: ImageProps;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
}

const SettingsItem = ({ 
  title, 
  icon, 
  onPress, 
  textStyle, 
  showArrow = true
}: SettingsItemProps) => {
  return (
    <TouchableOpacity onPress={onPress} className="flex-row items-center justify-between py-12">
      <View className="flex-row items-center gap-12">
        <Image source={icon} className="size-24" />
        <Text className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}>{title}</Text>
      </View>
      {showArrow && <Image source={icons.rightArrow} className="size-24" />}
    </TouchableOpacity>
  )
}

export default function Profile() {
  const { user, refetch } = useGlobalContext();
  
  const handleLogout = async() => {
    const result = await logout();
    if(result) {
      Alert.alert('Logout successful', 'You have been logged out');
      refetch();
    } else {
      Alert.alert('Logout failed', 'Please try again');
    }
  }

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-128 px-28 gap-y-20"
      >
        <View className="flex-row items-center justify-between">
          <Text className="text-xl font-rubik-bold">Profile</Text>
          <Image source={icons.bell} className="size-20" />
        </View>
        <View className="flex-row justify-center">
          <View className="items-center relative gap-y-8 mt-20">
            <Image 
              source={{ uri: user?.avatar }} 
              className="size-176 relative rounded-full" 
            />
            <TouchableOpacity onPress={() => {}} className="absolute bottom-44 right-8">
              <Image source={icons.edit} className="size-36" tintColor={colors.primary[300]} />
            </TouchableOpacity>
            <Text className="text-2xl font-rubik-bold">{user?.name ?? 'Guest'}</Text>
          </View>
        </View>
        <View className="mt-20">
          <SettingsItem 
            title="My Bookings" 
            icon={icons.calendar} 
            onPress={() => {}} 
          />
          <SettingsItem 
            title="Payments" 
            icon={icons.wallet} 
            onPress={() => {}} 
          />
        </View>
        <View className="pt-20 border-t border-primary-200">
          {settings.slice(2).map((item, index) => (
            <SettingsItem 
              key={index}
              {...item}
            />
          ))}
        </View>
        <View className="pt-20 border-t border-primary-200">
          <SettingsItem 
            icon={icons.logout} 
            title="Logout" 
            onPress={handleLogout} 
            textStyle="text-danger"
            showArrow={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}