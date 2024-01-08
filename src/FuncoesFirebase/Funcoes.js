import { FIREBASE_AUTH, FIREBASE_APP } from "../../FirebaseConfig";
import { doc, getDoc, getFirestore, where } from "firebase/firestore";
import { addDoc, collection, query, getDocs, deleteDoc  } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";


export const fetchIdList = async (campo, colecao, item) => {
    const db = getFirestore(FIREBASE_APP);
    const collectionRef = collection(db, colecao);
    
  
    try {
      
      const q = query(collectionRef, where(campo, '==', item));
  
      
      const querySnapshot = await getDocs(q);
  
      
      if (!querySnapshot.empty) {
        
        const primeiroDocumento = querySnapshot.docs[0];
        const dados = primeiroDocumento.data();
        const idDoDocumento = primeiroDocumento.id;
  
        // console.log('Dados do documento:', dados);
        console.log('ID do documento:', idDoDocumento);
        return idDoDocumento
      } else {
        console.log('Nenhum documento encontrado com base no título.');
      }
    } catch (error) {
      console.error('Erro ao obter dados do documento:', error);
    }
  };

  export const deleteList = async (codigoLista) => {
    const db = getFirestore(FIREBASE_APP);
  const listaRef = doc(db, "listas", codigoLista);

  try {
    // Deleta o documento correspondente ao código da lista
    await deleteDoc(listaRef);
    console.log(`Lista com código ${codigoLista} deletada com sucesso.`);
  } catch (error) {
    console.error("Erro ao deletar lista:", error);
  }
  };
  
  export const userReference = async () => {
    // Supondo que você esteja usando Firebase Authentication
    const auth = getAuth();
  
    return new Promise((resolve, reject) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // O usuário está autenticado
          const usuarioId = user.uid;
          const usuarioReference = doc(getFirestore(), `users/${usuarioId}`);
          resolve(usuarioReference);
        } else {
          // O usuário não está autenticado
          reject("Usuário não autenticado");
        }
      });
    });

  }
  export const userVerification = async (email) => {
    const db = getFirestore(FIREBASE_APP);
  
    const docRef = collection(db, "users");
    const q = query(docRef, where("email", "==", email));
  
    const querySnapshot = await getDocs(q);
  
    if (querySnapshot.size > 0) {
      const userDoc = querySnapshot.docs[0].data();  
      return userDoc.souProfessor;
    }
  
    // Se não houver documento correspondente, retorne false (ou o valor que fizer sentido para o seu caso)
    return false;
  };
  