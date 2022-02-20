const admin = require('firebase-admin')

var serviceAccount = require("./pppp-59919-firebase-adminsdk-z1ftu-d5e560d572.json");

let config = {
    credential: admin.credential.cert(
{
  "type": process.env.FIREBASE_ACC_TYPE : "service_account",
   projectId: process.env.FIREBASE_PROJECT_ID : 'pppp-59919',
  "private_key_id": process.env.FIREBASE_ACC_PK_ID : "d5e560d572feaaf52a9ab932ae6d68088ebf225a",
  "private_key": process.env.FIREBASE_ACC_PK : "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCvFZ2F6seEgXF5\n6G2dtyaQeN+4mUFhtPBVy1SaRwXtHK/LOlvK39AlyoHMGTxpIVMw/PJzA+ccEtyg\n/io7bBckP7RNQLNNC2GUZ0iMZbVQbG1M5d5j9NpOl6Ca4XUbC9UBhxmvzX3L3lmZ\nJz6Vgz/njthR8vVDn9uO1iX1XaaksMirPUoxEvq2eLqKseFZtWv+GszcmBmbQyL3\nQ3E/qRHH9NAm7OCaH2e63484Ywfx38sttvxmtEU3aBDfbrrIKMyRbtRQSF/A7OQ9\nzQKr5zBQV2mSP4622AEkow7gVmQjbdU3rYvCUnc5PYKQ3ZIrJFqnia3C6vAzYZ0m\n4Aao1iIFAgMBAAECggEAHgOX1yz2CoRRMmuSnQKYcRRTj9bv4yLMP3zlkjQCM1Fj\nXnSw5zCig1P5l8Ysub39f6yhGG/vFrwyB8RCc6DWP7/O9h5VDmxYzEK/aFgIMtL/\nkrrmOp7vLKFoJhznwRzwZTxmfiF9Qu1pUSyt2R4gnp65fSToADF/hzc1VyB4kIs3\nyo+V23Qh4FsqGYvpqu7QxsoyqX+ohx6PX7i7GR2RynI7T9sXeA564KKuplsGt5BK\naTVpGsuqEzeetXkbgtORBBQSR5o8J4G1gVKTvVAQk6HFyeZ8iIEqCJHYgQczcYO3\nR3bTaQfOJOeNf9a7cQTo0lFSsziY2084nKgi6Bn+OQKBgQDqK0pA59MGwTh/+SDn\nQQ/JqFGNaGO3ezcacrNklfWZ1KeUmfU+X9kQzRQqPJ31jd01dygx0Q3T9dChHW1q\nGkBsiTWeRkEdn2J5CxM1efW31a4HaCoJi1JGOGL5LI4W10IWWO2K/SCNiGwCSrqJ\nAQcuS8RSENxqXTvzB8qB817ieQKBgQC/aDP31iZoVCH5n1icGxAQmKdNiA5Cz26o\nqnoZTS222h3QWBlps9X+FPf/hTDbExQC5mtIbe1hKn44Jq4JaRi50Z0gjxnRVpuV\nFajo4J91gy54MHJUtYqDs0UXJXn2ee2Zqsnw1Z58fNInFai8DKkBg8lMwg0+t2mB\n3E1/XxQ47QKBgQDAhXDZ5f7ISelixXb4ybPqLnlGEjIRcrr+AplctDGlFIHmmaFY\nc8LpnkHa69VOQiFBSMMCGgcNYcbx/1iqaATZdwFfLBFzAkwaijFzwN51EreunUQa\nbrHoy4kLpUb4nmdWKiy6HZw64JM0Wy37X54AwQgaFISy6g5Uo+4pYuZ6uQKBgQCu\nSVkAtAvW9bzWCoVp566SHh5BF8E8jpsJk+mH/mHA3Q1Gt+G0AR+6syc6kPHymYWg\nOmW31vjOgB3cTUQtp3fvQ3HawtLUbhNPBiD+pAIuw5tdr2d7wK52y5b+w44xo8Z5\nJS2qUSl120aUdkFlsfV2PqTectgSonm82HfsogvM5QKBgQDP1S1j+S9pFyi+al4L\nQlQUXTbOZ5MWa5GYlv4ENdiTzPTJ+y/VNTzm93yHHkc8J9Mj4X8CpM3eBRGYDNOD\nTJL7SZ3oefLSt3P0N8x0aXLwGStZVN6E2MUh2hUvy5JWPJGS1XMQ7GDtMqWm56nc\n6HCA+vbMJ6qoZKFs/7oijAGzcw==\n-----END PRIVATE KEY-----\n",
  "client_email": process.env.FIREBASE_ACC_CLIENT_EMAIL : "firebase-adminsdk-z1ftu@pppp-59919.iam.gserviceaccount.com",
  "client_id": process.env.FIREBASE_ACC_CLIENT_ID : "107824171384433006623",
  "auth_uri": process.env.FIREBASE_ACC_AUTH_URI : "https://accounts.google.com/o/oauth2/auth",
  "token_uri": process.env.FIREBASE_ACC_TOKEN_URI : "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": process.env.FIREBASE_ACC_AUTH_CERT_URL : "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": process.env.FIREBASE_ACC_CLIENT_CERT_URL : "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-z1ftu%40pppp-59919.iam.gserviceaccount.com"
}
),
    apiKey: process.env.API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN : "pppp-59919.firebaseapp.com",
    databaseURL: process.env.FIREBASE_DB_URL : "https://pppp-59919.firebaseio.com",
    storageBucket: process.env.STORAGE_BUCKER : "gs://pppp-59919.appspot.com",
    messagingSenderId: process.env.FIREBASE_MSG_SENDER_ID : "912050282042",
    projectId: process.env.FIREBASE_PROJECT_ID : 'pppp-59919',
    appId: process.env.FIREBASE_APP_ID : '1:912050282042:android:371b110d2d4cd643249f03'
};

admin.initializeApp(config);

const bucket = admin.storage().bucket()
//const database = admin.database();

const storage = admin.storage();

module.exports = { 
    //database, 
    bucket, 
    storage
    //ref 
}
