import { COLORS, FONTS, SIZES, icons } from '../constants/'
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import React from 'react'

const HeaderBar = () => {
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
            <View style={{flex:1, paddingLeft: SIZES.padding}}>
                <Text style={{color:COLORS.white, ...FONTS.h2}}>Long,</Text>
                <Text style={{color:COLORS.white, ...FONTS.h2}}>Welcome Back!</Text>
            </View>

            <TouchableOpacity
                style={{
                    flexDirection:"row",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    marginHorizontal: SIZES.padding,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: COLORS.lightPurple
                }}
            >
                {/* Sun */}
                <View style={{width:40, height:40, alignItems:"center", justifyContent: "center"}}>
                    <Image
                        source={icons.sunny}
                        style={{
                            width: 30,
                            height: 30,
                            tintColor: COLORS.white
                        }}
                    />
                </View>

                {/* Moon */}
                <View style={{width:40, height:40, alignItems:"center", justifyContent: "center", ...styles.selectedNightModeStyle}}>
                    <Image
                        source={icons.night}
                        style={{
                            width: 30,
                            height: 30,
                            tintColor: COLORS.white
                        }}
                    />
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles= StyleSheet.create({
    selectedNightModeStyle:{
        borderRadius:20,
        backgroundColor:COLORS.black
    },
    selectedLightModeStyle:{
        borderRadius:20,
        backgroundColor:COLORS.yellow
    }

})

export default HeaderBar
