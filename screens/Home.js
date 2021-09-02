import {
  Animated,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  COLORS,
  FONTS,
  SIZES,
  constants,
  dummyData,
  icons,
  images,
} from "../constants/";
import { CustomButton, HeaderBar } from "../components/";

import React from "react";
import { connect } from "react-redux";

const promoTabs = constants.promoTabs.map((promoTab) => ({
  ...promoTab,
  ref: React.createRef(),
}));

const TabIndicator = ({ measureLayout, scrollX }) => {
  const inputRange = promoTabs.map((_, i) => i * SIZES.width);

  const tabIndicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map((measure) => measure.width),
  });

  return (
    <Animated.View
      style={{
        position: "absolute",
        height: "100%",
        width: tabIndicatorWidth,
        left: 0,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.primary,
      }}
    />
  );
};

const Tabs = ({ appTheme, scrollX }) => {
  const [measureLayout, setMeasureLayout] = React.useState([]);
  const containerRef = React.useRef();

  React.useEffect(() => {
    let ml = [];
    promoTabs.forEach((promo) => {
      promo.ref.current.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          console.log(x, y, width, height);
          ml.push({
            x,
            y,
            width,
            height,
          });

          if (ml.length === promoTabs.length) {
            setMeasureLayout(ml);
          }
        }
      );
    });
  }, [containerRef.current]);

  return (
    <View
      ref={containerRef}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: SIZES.padding,
        backgroundColor: appTheme.tabBackgroundColor,
        borderRadius: SIZES.radius,
      }}
    >
      {/* Tab Indicator */}
      {measureLayout.length > 0 && (
        <TabIndicator measureLayout={measureLayout} scrollX={scrollX} />
      )}

      {promoTabs.map((item, index) => {
        return (
          <TouchableOpacity
            key={`PromoTab-${index}`}
            onPress={() => console.log(item)}
          >
            <View
              ref={item.ref}
              style={{
                paddingHorizontal: 15,
                alignItems: "center",
                justifyContent: "center",
                height: 40,
              }}
            >
              <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const Home = ({ navigation, appTheme }) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const renderAvailableRewards = () => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          height: 100,
        }}
        onPress={() => navigation.navigate("Rewards")}
      >
        {/* Rewards Cup */}
        <View
          style={{
            width: 100,
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLORS.pink,
            borderTopLeftRadius: 15,
            borderBottomLeftRadius: 15,
          }}
        >
          <ImageBackground
            source={icons.reward_cup}
            resizeMode="contain"
            style={{
              width: 85,
              height: 85,
              marginLeft: 3,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.transparentBlack,
              }}
            >
              <Text style={{ color: COLORS.white, ...FONTS.h4 }}>200</Text>
            </View>
          </ImageBackground>
        </View>
        <View
          style={{
            height: 100,
            marginLeft: -10,
            backgroundColor: COLORS.lightPink,
            borderRadius: 15,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: COLORS.primary, ...FONTS.h2, fontSize: 20 }}>
            Available Rewards
          </Text>
          <View
            style={{
              marginTop: 5,
              padding: SIZES.base,
              backgroundColor: COLORS.primary,
              borderRadius: SIZES.radius * 2,
            }}
          >
            <Text style={{ color: COLORS.white, ...FONTS.body3 }}>
              150 points - $2.50 off
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderPromoDeals = () => {
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <Tabs appTheme={appTheme} scrollX={scrollX} />
        <Animated.FlatList
          data={dummyData.promos}
          horizontal
          pagingEnabled
          scrollEventThrottle="16"
          snapToAlignment="center"
          keyExtractor={(item) => `${item.id}`}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  width: SIZES.width,
                  paddingTop: SIZES.padding,
                }}
              >
                {/* Image */}
                <Image
                  source={images.strawberryBackground}
                  resizeMode="contain"
                  style={{ width: "100%" }}
                />

                {/* Name */}
                <Text style={{ color: COLORS.red, ...FONTS.h1, fontSize: 27 }}>
                  {item.name}
                </Text>

                {/* Description */}
                <Text
                  style={{
                    color: appTheme.textColor,
                    marginTop: 3,
                    ...FONTS.body4,
                  }}
                >
                  {item.description}
                </Text>

                {/* Calories */}
                <Text
                  style={{
                    color: appTheme.textColor,
                    marginTop: 3,
                    ...FONTS.body4,
                  }}
                >
                  {item.calories}
                </Text>
                {/* Button */}
                <CustomButton
                  label="Order Now"
                  isPrimaryButton={true}
                  containerStyle={{
                    marginTop: 10,
                    paddingHorizontal: SIZES.padding,
                    paddingVertical: SIZES.base,
                    borderRadius: SIZES.radius * 2,
                  }}
                  lableStyle={{
                    ...FONTS.h3,
                  }}
                  onPress={() => navigation.navigate("Location")}
                />
              </View>
            );
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderBar />

      <ScrollView
        style={{
          flex: 1,
          marginTop: -25,
          borderTopLeftRadius: SIZES.radius * 2,
          borderTopRightRadius: SIZES.radius * 2,
          backgroundColor: appTheme.backgroundColor,
        }}
        contentContainerStyle={{
          paddingBottom: 150,
        }}
      >
        {renderAvailableRewards()}
        {renderPromoDeals()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = (state) => {
  return {
    appTheme: state.appTheme,
    error: state.error,
  };
};

export default connect(mapStateToProps)(Home);
