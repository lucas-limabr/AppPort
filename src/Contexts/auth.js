import React, { useEffect } from "react";
import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext()

function UserProvider({ children }) {

    const [usuario, setUsuario] = useState(null)

    const [usuarioString, setUsuarioString] = useState(null)

    useEffect(() => {
        AsyncStorage.getItem('@portuguito2023').then(usuarioString => {
            setUsuarioString(usuarioString)
        })
    }, [])

    useEffect(() => {
        if (usuarioString) {
            try {
                const usuario = JSON.parse(usuarioString)
                setUsuario(usuario)
            } catch (error) {
                console.error(error)
            }
        }
    }, [usuarioString])


    return (
        <UserContext.Provider value={{ usuario }}>
            {children}
        </UserContext.Provider>
    )

}

const UserConsumer = UserContext.Consumer

export { UserProvider, UserConsumer }