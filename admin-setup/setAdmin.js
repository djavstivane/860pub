const admin = require('firebase-admin');

// Aponta para a sua chave de administrador
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Pegue o email do usuário da linha de comando
const email = process.argv[2];

if (!email) {
  console.log("ERRO: Forneça um email. Exemplo: node setAdmin.js seu-email@exemplo.com");
  process.exit(1);
}

(async () => {
  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    console.log(`Sucesso! ${email} agora é um administrador.`);
    process.exit(0);
  } catch (error) {
    console.error("Erro ao definir o administrador:", error.message);
    process.exit(1);
  }
})();