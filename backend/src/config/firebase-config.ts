import admin from "firebase-admin"
import dotenv from "dotenv"
dotenv.config()
const serviceAccount = `${process.env.FIREBASE_PRIVATE_SERVICE_ACCOUNT}`;

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(serviceAccount))
});

export {
    admin
}
