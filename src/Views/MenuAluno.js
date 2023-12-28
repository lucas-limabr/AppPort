import React from "react";
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from "expo-linear-gradient";
import { View } from 'react-native'
import Styles from '../Styles.js/StylesMenuAluno'


export default function MenuAluno() {

    function ClickButton({ title, num1, num2, num3 }) {  //Função que cria o botão

        return (
            <TouchableOpacity style={Styles.buttom}>
                <View style={Styles.titleStyle}>
                    <Text style={Styles.titleStyleFont}>
                        {title}
                    </Text>
                </View>
                <View>
                    <Text style={Styles.styleFontContent}>
                        Acertos: {num1}
                    </Text>
    
                    <Text style={Styles.styleFontContent}>
                        Erros: {num2}
                    </Text>
    
                    <Text style={Styles.styleFontContent}>
                        {num3}% completa
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    function Button({ title, num1, num2, num3 }) {
        return (
            <View>
                <ClickButton title={title} num1={num1} num2={num2} num3={num3}/>
            </View>
        )
    }

    function ClickButton({title}) {  

        return (
            <TouchableOpacity style={Styles.ButtomAddList}>
                <View>
                    <Text style={Styles.ButtomAddListText}>
                        {title}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    function ButtonAdd({title}) { 
        return (
            <View>
                <ClickButton title={title}/>
            </View>
        )
    }

  return (

    <LinearGradient colors={['#D5D4FB', '#9B98FC']} style={Styles.gradient} >

      <View style={Styles.containerTitle}>
        <ButtonAdd title='+' />
      </View>

      <View style={Styles.container}>
        <Button title='Lista 1' num1='1' num2='1' num3='100' />
        <Button title='Lista 2' num1='1' num2='1' num3='100' />
        <Button title='Lista 3' num1='1' num2='1' num3='100' />
      </View>
      <StatusBar style="auto" />
    </LinearGradient>

  );
}