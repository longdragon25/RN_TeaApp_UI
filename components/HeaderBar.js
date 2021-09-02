import { COLORS, FONTS, SIZES, icons } from "../constants/";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import React from "react";
import { connect } from "react-redux";
import { toggleTheme } from "../stores/themeActions";

const HeaderBar = ({ appTheme, dispatch }) => {
  const toggleThemeHandler = () => {
    console.log(appTheme.name);
    if (appTheme.name == "light") {
      dispatch(toggleTheme("dark"));
    } else {
      dispatch(toggleTheme("light"));
    }
  };

  return (
    <SafeAreaView
      style={{
        height: 135,
        backgroundColor: COLORS.purple,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View style={{ flex: 1, paddingLeft: SIZES.padding }}>
        <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Long,</Text>
        <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Welcome Back!</Text>
      </View>

      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          marginHorizontal: SIZES.padding,
          height: 40,
          borderRadius: 20,
          backgroundColor: COLORS.lightPurple,
        }}
        onPress={() => toggleThemeHandler()}
      >
        {/* Sun */}
        <View
          style={{
            width: 40,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
            ...(appTheme.name == "light" ? styles.selectedLightModeStyle : {}),
          }}
        >
          <Image
            source={icons.sunny}
            style={{
              width: 30,
              height: 30,
              tintColor: COLORS.white,
            }}
          />
        </View>

        {/* Moon */}
        <View
          style={{
            width: 40,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
            ...(appTheme.name == "dark" ? styles.selectedNightModeStyle : {}),
          }}
        >
          <Image
            source={icons.night}
            style={{
              width: 30,
              height: 30,
              tintColor: COLORS.white,
            }}
          />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  selectedNightModeStyle: {
    borderRadius: 20,
    backgroundColor: COLORS.black,
  },
  selectedLightModeStyle: {
    borderRadius: 20,
    backgroundColor: COLORS.yellow,
  },
});

const mapStateToProps = (state) => {
  return {
    appTheme: state.appTheme,
    error: state.error,
  };
};

export default connect(mapStateToProps)(HeaderBar);
