import React, { useEffect } from "react";
import { createContext, useState } from "react";
// Uma API que permite armazenar dados de forma persistente no dispositivo do usuário
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext()

function UserProvider({ children }) {

    //Armazena os dados do usuário atual para o contexto da aplicação (em formato objeto)
    const [usuario, setUsuario] = useState(null)

    //Guarda as informações do usuário obtidas do AsyncStorage (em formato JSON)
    const [usuarioString, setUsuarioString] = useState(null)

    //executado uma única vez quando a tela inicial do app é carregada
    useEffect(() => {
        //verifica se existe um usuário logado no app. Retorna um json com suas informções ou null (caso não tenha usuário logado)  
        AsyncStorage.getItem('@portuguito2023').then(usuarioString => {
            //atualizo o estado
            setUsuarioString(usuarioString)
        })
    }, [])

    //havendo alteração no estado de usuarioString, esta funão é chamada
    useEffect(() => {
        if (usuarioString) {
            try {
                //tenta converter json em objeto javascript e armazena em uma constante
                const usuario = JSON.parse(usuarioString)
                //atualizo o estado passando o objeto
                setUsuario(usuario)
            } catch (error) {
                console.error(error)
            }
        }
    }, [usuarioString])

    return (
        //value que eu quero que seja passado para os componentes descendentes
        <UserContext.Provider value={{ usuario }}>
            {/* usuario é passado para todos os filhos de UserProvider*/}
            {children}
        </UserContext.Provider>
    )
}

const UserConsumer = UserContext.Consumer

export { UserProvider, UserConsumer }