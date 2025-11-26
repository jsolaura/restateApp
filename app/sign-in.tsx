import icons from '@/constants/icons';
import images from '@/constants/images';
import { login } from '@/lib/appwrite';
import { useGlobalContext } from '@/lib/global-provider';
import { Redirect } from 'expo-router';
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignIn() {
  const { isLoggedIn, loading, refetch } = useGlobalContext();

  if(!loading && isLoggedIn) return <Redirect href="/" />;

  const handleLogin = async () => {
    const result = await login();
    if(result) {
      console.log('Login successful');
      refetch();
    } else {
      Alert.alert('Login failed', 'Please try again');
    }

  }
  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView contentContainerClassName="h-full">
        <Image
          source={images.onboarding}
          className="w-full h-4/6"
          resizeMode="contain"
        />
        <View className="px-20">
          <Text className="text-base text-center uppercase font-rubik text-black-200">
            Welcome to Restate
          </Text>
          <Text className="text-2xl font-rubik-bold text-center text-black-300 mt-8">
            Let&apos;s Get You Closer to {"\n"}
            <Text className="text-primary-300">
              Your Ideal Home
            </Text>
          </Text>
          <Text className="text-lg text-center font-rubik text-black-200 mt-32">
            Login to Restate with Google
          </Text>
          <TouchableOpacity
            className="bg-white shadow-md shadow-zinc-300 rounded-full p-16 mt-20"
            onPress={handleLogin}
          >
            <View className="flex-row justify-center items-center gap-8">
              <Image
                source={icons.google}
                className="w-20 h-20"
                resizeMode="contain"
              />
              <Text className="text-lg font-rubik-bold text-black-300">Continue with Google</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}