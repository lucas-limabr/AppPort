import React from "react";
import { TouchableOpacity } from "react-native";
import {Modal, View, Text, Switch, ScrollView} from 'react-native'
import { useState } from "react";
import Styles from '../Styles.js/StylesTermoDeUso'




export default function Custom(visible) {
    
    
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);  
    
    

    
    
    return(
        <Modal animationType='slide' transparent={true} visible={visible}>
            <View style={Styles.container}>
                

                    <View style={Styles.center}>

                        <View style={Styles.telaDoTermo}>
                        <ScrollView>
                            <Text style={Styles.termoDeUso}>What is Lorem Ipsum?
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

                                    Why do we use it?
                                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                                    </Text>
                        </ScrollView>
                        </View>
                    </View>

                    <View style={Styles.switch}>

                        <Switch trackColor={{false: '#767577', true: '#FF8D94'}}
                                thumbColor={isEnabled ? '#FF8D94' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled} 
                                />
                        <Text style={Styles.textoSwitch}>Li e aceito os termos</Text>
                    </View>
                    <View style={Styles.containerBotao}>

                    <TouchableOpacity style={Styles.botao}>
                        <Text style={Styles.textoBotao}>Continuar</Text>
                    </TouchableOpacity>
                    </View>
                
            </View>
        </Modal>
    )
}


