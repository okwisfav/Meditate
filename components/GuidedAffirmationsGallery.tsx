import { View, Text, FlatList, Pressable, Image } from 'react-native'
import { GallaryPreviewData } from '@/constants/models/AffirmationCategory';
import { Link } from 'expo-router';

interface GuidedAffirmationsGalleryProps {
    title: string;
    previews: GallaryPreviewData[];
}

const GuidedAffirmationsGallery = ({
    title,
    previews,
}: GuidedAffirmationsGalleryProps) => {
    return (
        <View className="my-5">
            <View className="mb-2">
                <Text className="text-white font-bold text-xl">{title}</Text>
            </View>
            <View className="space-y-2">
                <FlatList
                    data={previews}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => (
                        <Link href={`/affirmations/${item.id}`} asChild>
                            <Pressable>
                                <View className="h-36 w-32 rounded-md mr-4">
                                    <Image
                                        source={item.image}
                                        resizeMode="cover"
                                        className="w-full h-full"
                                    />
                                    <Text>ProductGallery</Text>
                                </View>
                            </Pressable>
                        </Link>
                    )}
                    horizontal
                />
            </View>
        </View>
    );
};

export default GuidedAffirmationsGallery;