import React from "react";
import { View, Image, Text, TouchableOpacity, TextInput } from "react-native";
import Styles from "../Styles.js/StylesMenu";

export default function ButtonDescritores() {
    return (
        <TouchableOpacity style={Styles.descritores}>
        <Text style={Styles.txtDescritores}>Exemplo</Text>
      </TouchableOpacity>
    )
}