import { Filter } from "@/types";
import * as Linking from 'expo-linking';
import { openAuthSessionAsync } from 'expo-web-browser';
import { Account, Avatars, Client, Databases, OAuthProvider, Query } from "react-native-appwrite";

export const appwriteConfig = {
  platform: 'com.jsolaura.restate',
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  galleriesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID,
  reviewsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
  agentsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID,
  propertiesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID,
};

export const client = new Client();
client
  .setEndpoint(appwriteConfig.endpoint!)
  .setProject(appwriteConfig.projectId!)
  .setPlatform(appwriteConfig.platform!);


export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);

export async function login() {
  try {
    const redirectUri = Linking.createURL("/");

    const response = await account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUri
    );
    if (!response) throw new Error("Create OAuth2 token failed");

    const browserResult = await openAuthSessionAsync(
      response.toString(),
      redirectUri
    );
    if (browserResult.type !== "success")
      throw new Error("Create OAuth2 token failed");

    const url = new URL(browserResult.url);
    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();
    if (!secret || !userId) throw new Error("Create OAuth2 token failed");

    const session = await account.createSession(userId, secret);
    if (!session) throw new Error("Failed to create session");

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function logout() {
  try {
    await account.deleteSession('current');
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getCurrentUser() {
  try {
    const result = await account.get();
    if (result.$id) {
      const userAvatar = avatar.getInitialsURL(result.name);

      return {
        ...result,
        avatar: userAvatar.toString(),
      };
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getLatestProperties() {
  try {
    const result = await databases.listDocuments(
      appwriteConfig.databaseId!,
      appwriteConfig.propertiesCollectionId!,
      [Query.orderDesc('$createdAt'), Query.limit(5)]
    );
    return result.documents;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getProperties({ 
  filter, 
  query, 
  limit = 5,
  filters
}: { 
  filter?: string, 
  query: string, 
  limit?: number,
  filters?: Partial<Filter>
}) {
  try {
    const buildQuery = [Query.orderDesc('$createdAt')];

    // 기존 filter 파라미터 (단일 타입)
    if(filter && filter !== 'All') {
      buildQuery.push(Query.equal('type', filter));
    }

    // FilterBottomSheet의 필터 옵션들
    // 모든 필터 조건은 AND로 결합됩니다 (모든 조건을 만족하는 결과만 반환)
    if (filters) {
      // 가격 범위 필터 (AND: min <= price <= max)
      if (filters.priceRange) {
        if (filters.priceRange.min > 0) {
          buildQuery.push(Query.greaterThanEqual('price', filters.priceRange.min));
        }
        if (filters.priceRange.max > 0 && filters.priceRange.max < Infinity) {
          buildQuery.push(Query.lessThanEqual('price', filters.priceRange.max));
        }
      }

      // 프로퍼티 타입 필터 (OR: 선택한 타입 중 하나라도 일치하면 됨)
      if (filters.propertyType && filters.propertyType.length > 0) {
        if (filters.propertyType.length === 1) {
          // 단일 타입인 경우
          buildQuery.push(Query.equal('type', filters.propertyType[0]));
        } else {
          // 여러 타입 중 하나라도 일치하면 됨 (OR 조건)
          const typeQueries = filters.propertyType.map(type => Query.equal('type', type));
          buildQuery.push(Query.or(typeQueries));
        }
      }

      // 침실 수 필터 (AND: 정확히 일치)
      if (filters.bedrooms && filters.bedrooms >= 1) {
        buildQuery.push(Query.equal('bedrooms', filters.bedrooms));
      }

      // 욕실 수 필터 (AND: 정확히 일치)
      if (filters.bathrooms && filters.bathrooms >= 1) {
        buildQuery.push(Query.equal('bathrooms', filters.bathrooms));
      }

      // 건물 크기 필터 (AND: min <= area <= max)
      if (filters.buildingSize) {
        if (filters.buildingSize.min > 0) {
          buildQuery.push(Query.greaterThanEqual('area', filters.buildingSize.min));
        }
        if (filters.buildingSize.max > 0 && filters.buildingSize.max < Infinity) {
          buildQuery.push(Query.lessThanEqual('area', filters.buildingSize.max));
        }
      }
    }

    // 검색어 필터
    if(query) {
      buildQuery.push(
        Query.or([
          Query.search('name', query),
          Query.search('address', query),
          Query.search('type', query),
        ])
      );
    }

    if(limit) {
      buildQuery.push(Query.limit(limit));
    }

    const result = await databases.listDocuments(
      appwriteConfig.databaseId!,
      appwriteConfig.propertiesCollectionId!,
      buildQuery,
    );
    
    return result.documents;

  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getPropertyById({ id }: { id: string }) {
  try {
    const result = await databases.getDocument(
      appwriteConfig.databaseId!,
      appwriteConfig.propertiesCollectionId!,
      id,
      [Query.select([
        '*', 
        'reviews.*', 
        'galleries.*',
        'agents.*',
      ])]
    );
    console.log('result', JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}