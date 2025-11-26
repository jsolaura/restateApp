import { useGlobalContext } from '@/lib/global-provider';
import { Redirect, Slot } from 'expo-router';
import { ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AppLayout() {
  const { isLoggedIn, loading, user } = useGlobalContext();
  console.log('user', JSON.stringify(user, null, 2));
  

  if(loading) {
    return (
      <SafeAreaView
        className="bg-white flex-1 justify-center items-center"
      >
        <ActivityIndicator size="large" className="text-primary-300" />
      </SafeAreaView>
    )
  }
  if(!isLoggedIn) {
    return <Redirect href="/sign-in" />;
  }
  return (
    <Slot />
  )
}