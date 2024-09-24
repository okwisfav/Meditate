import { View, Text, ImageBackground, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { GallaryPreviewData } from '@/constants/models/AffirmationCategory';
import AFFIRMATION_GALLERY from '@/constants/affirmation-gallery';
import AppGradient from '@/components/AppGradient';
import AntDesign from '@expo/vector-icons/AntDesign';
import { ScrollView, GestureHandlerRootView } from 'react-native-gesture-handler';

const AffirmationPractice = () => {
   const { itemId } = useLocalSearchParams();
   const [affirmation, setAffirmation] = useState<GallaryPreviewData>();
   const [sentences, setSentences] = useState<String[]>([]);

   useEffect(() => {
       for (let idx = 0; idx < AFFIRMATION_GALLERY.length; idx++) {
           const affirmationsData = AFFIRMATION_GALLERY[idx].data;
           const affirmationToStart = affirmationsData.find(
               (a) => a.id === Number(itemId)
           );
           
           if (affirmationToStart) {
               setAffirmation(affirmationToStart);

               const affirmationArray = affirmationToStart.text.split(".");
               //Remove the lest element if it's an empty string
               if(affirmationArray[affirmationArray.length -1] === ''){
                affirmationArray.pop();
               }

               setSentences(affirmationArray);

               return;
           }
       }
   }, []);

   return (
       <GestureHandlerRootView style={{ flex: 1 }}>
           <View className='flex-1'>
               <ImageBackground 
                   source={affirmation?.image}  
                   resizeMode='cover' 
                   className='flex-1'
               >
                   <AppGradient colors={["rgba(0,0,0,0.3)","rgba(0,0,0,0.9)"]}>
                       <Pressable onPress={() => router.back()} className='absolute top-16 left-6 z-10'>
                           <AntDesign name="leftcircleo" size={25} color="white" />
                       </Pressable>
                       <ScrollView className='mt-20' 
                           showsVerticalScrollIndicator={false}
                       >
                           <View className='h-full justify-center'>
                               <View className='h-4/5 justify-center'>
                                  {sentences.map((sentences, idx) => (
                                      <Text key={idx} className='text-white text-3xl mb-12 font-bold text-center'>
                                            {sentences}.
                                       </Text>
                                    ))}
                               </View>
                           </View>
                       </ScrollView>
                   </AppGradient>
               </ImageBackground>
           </View>
       </GestureHandlerRootView>
   );
}

export default AffirmationPractice;
