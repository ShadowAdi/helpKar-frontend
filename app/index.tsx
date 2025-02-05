import RenderItem from "@/components/RenderItem";
import { SliderData } from "@/constants/Slide";
import { Colors } from "@/Styles/GlobalColors";
import { useRouter } from "expo-router";
import { Image, Text, View } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";

export default function Index() {
  const router = useRouter();

  return (
    <AppIntroSlider
      data={SliderData}
      renderItem={RenderItem}
      onDone={() => {
        router.push("/AuthChoiceScreen");
      }}
      dotStyle={{
        backgroundColor: Colors.whiteColor,
        opacity: 0.2,
      }}
      showNextButton={false}
      renderDoneButton={() => (
        <Image
          style={{ objectFit: "contain", height: 28, width: 28 }}
          source={require("../assets/images/arrow.webp")}
        />
      )}
      style={{ width: "100%", flex: 1, height: "100%" }}
    />
  );
}
