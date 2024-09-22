import { FIREBASE_AUTH, FIREBASE_APP } from "../../FirebaseConfig";
import { doc, getDoc, getFirestore, where } from "firebase/firestore";
import {
  addDoc,
  collection,
  query,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { differenceInCalendarDays } from "date-fns";

export const fetchIdList = async (campo, colecao, item, usuario) => {
  const db = getFirestore(FIREBASE_APP);
  const collectionRef = collection(db, colecao);

  const alunoRef = doc(getFirestore(), `/users/${usuario}`);

  try {
    const q = query(
      collectionRef,
      where("aluno", "==", alunoRef),
      where(campo, "==", item)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const primeiroDocumento = querySnapshot.docs[0];
      const dados = primeiroDocumento.data();
      const idDoDocumento = primeiroDocumento.id;

      return idDoDocumento;
    } else {
      console.log("Nenhum documento encontrado com base no título.");
    }
  } catch (error) {
    console.error("Erro ao obter dados do documento:", error);
  }
};

export const fetchQuestionIdByTitle = async (title, collectionName, userId) => {
  const db = getFirestore(FIREBASE_APP);
  try {
    // Cria a consulta para buscar a questão com base no título e no usuário
    const q = query(
      collection(db, collectionName),
      where("nomeLista", "==", title),
      where("criador", "==", userId)
    );

    // Executa a consulta
    const querySnapshot = await getDocs(q);

    // Verifica se há resultados
    if (!querySnapshot.empty) {
      // Retorna o ID da primeira questão encontrada
      const firstQuestion = querySnapshot.docs[0];
      return firstQuestion.id;
    } else {
      console.log("Nenhuma questão encontrada com o título fornecido.");
      return null; // Retorna null se não encontrar nenhuma questão
    }
  } catch (error) {
    console.error("Erro ao buscar o ID da questão:", error);
    return null; // Retorna null em caso de erro
  }
};

export const validateListName = async (newListName, currentUserReference) => {
  if (newListName === '') {
    throw new Error("lista criada não possui nome");
  }

  const listasCollection = collection(getFirestore(), "listas");
  const listasQuery = query(listasCollection, where("criador", "==", currentUserReference));

  const listasSnapshot = await getDocs(listasQuery);

  listasSnapshot.forEach((doc) => {
    const listaData = doc.data();
    if (listaData.nomeLista === newListName) {
      throw new Error("lista de mesmo nome já existente");
    }
  });
}

export const deleteList = async (listId) => {
  const db = getFirestore();

  try {
    const docRef = doc(db, 'listas', listId);

    try {
      await deleteDoc(docRef);
    } catch (error) {
      throw new Error('Erro ao excluir a lista: ' + error);
    }
  } catch (error) {
    console.log(error);
  }
};



export const userReference = async () => {
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
};

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

export const getInfoUser = async (email) => {
  const db = getFirestore(FIREBASE_APP);

  const docRef = collection(db, "users");
  const q = query(docRef, where("email", "==", email));

  const querySnapshot = await getDocs(q);

  if (querySnapshot.size > 0) {
    const userDoc = querySnapshot.docs[0].data();

    return userDoc;
  }

  // Se não houver documento correspondente, retorne false (ou o valor que fizer sentido para o seu caso)
  return false;
};

export const updateDay = async (email) => {
  const db = getFirestore(FIREBASE_APP);

  const dataAtual = new Date();

  try {
    // Consultar o usuário pelo e-mail
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size > 0) {
      const usuario = querySnapshot.docs[0].data();
      const ultimoAcesso = usuario.ultimoAcesso.toDate();

      const diferencaEmDias = differenceInCalendarDays(dataAtual, ultimoAcesso);

      if (diferencaEmDias > 1) {
        const usuarioRef = doc(db, "users", querySnapshot.docs[0].id);
        await updateDoc(usuarioRef, {
          ultimoAcesso: dataAtual,
        });
      }
    }
  } catch (error) {
    console.error("Erro ao atualizar a data:", error);
  }
};
