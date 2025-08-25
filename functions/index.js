const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

/**
 * Cloud Function que é acionada sempre que um novo usuário é criado
 * no Firebase Authentication.
 * Ela cria um documento correspondente na coleção 'users' do Firestore.
 */
exports.createNewUserDocument = functions.auth.user().onCreate((user) => {
  // Pega os dados do usuário recém-criado
  const { uid, email, displayName } = user;

  // Define os dados para o novo documento no Firestore
  const newUserDocument = {
    name: displayName || "Novo Usuário",
    email: email,
    balance: 0,
    totalEarnings: 0,
    totalWithdrawals: 0,
    activeInvestments: 0,
    surveyCompleted: false,
    isAdmin: false,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  // Log para depuração (você pode ver isso nos logs do Firebase)
  console.log(`Criando documento para o novo usuário: ${uid} com o nome: ${displayName}`);

  // Retorna a promessa de escrita no banco de dados
  return admin.firestore().collection("users").doc(uid).set(newUserDocument);
});