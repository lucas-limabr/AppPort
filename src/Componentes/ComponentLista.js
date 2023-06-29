import React from "react";
import { View, Image, Text, TouchableOpacity, TextInput } from "react-native";
import Styles from "../Styles.js/StylesLista";

export default function Lista(){
    return(
        <TouchableOpacity style={Styles.lista}>
                    <View style={Styles.containerBotao}>
                        <TouchableOpacity>
                           <Text>...</Text>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Text>X</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={Styles.txtLista}> exemplo </Text>
                </TouchableOpacity>
    )
}