import { FIREBASE_AUTH, FIREBASE_APP } from "../../FirebaseConfig";
import { doc, getDoc, getFirestore, where } from "firebase/firestore";
import { addDoc, collection, query, getDocs } from "firebase/firestore";


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
      } else {
        console.log('Nenhum documento encontrado com base no título.');
      }
    } catch (error) {
      console.error('Erro ao obter dados do documento:', error);
    }
  };