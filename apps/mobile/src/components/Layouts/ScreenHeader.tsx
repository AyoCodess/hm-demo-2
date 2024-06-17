import { cn } from "@/lib/utils/cn";
import React from "react";
import { Keyboard,Text,TouchableWithoutFeedback,View } from "react-native";

export default function ScreenHeader({
  title,
  titleColor,
  description,
  titleSize = 'text-2xl'

}: {
  title: string;
  titleColor?: string;
  description?: string;
  titleSize?: string;
}) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
      <View className={cn("p-4 bg-secondary rounded-lg")}>
        <View
          className={cn(
            "flex-col justify-center items-start gap-1 flex"
          )}
        >
          <Text className={cn('text-lead text-2xl font-bold ',
            titleColor ?? titleColor,
            titleSize ?? titleSize
          )}>
            {title}
          </Text>
          {description && (
            <Text className=" text-lead text-lg  ">
              {description}
            </Text>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
