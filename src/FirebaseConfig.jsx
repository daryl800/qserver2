import firebase from 'firebase'
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCJcKHsm9yfeCIZcQtwIgz7j8j0v_lJUFQ",
    authDomain: "queuesapp-415d3.firebaseapp.com",
    databaseURL: "https://queuesapp-415d3.firebaseio.com",
    projectId: "queuesapp-415d3",
    storageBucket: "queuesapp-415d3.appspot.com",
    messagingSenderId: "1023683818860",
    appId: "1:1023683818860:web:fbdb633ee95a930c"
    };

const firebaseApp=firebase.initializeApp(firebaseConfig);
const db=firebaseApp.firestore();

export default db;