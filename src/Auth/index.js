import firebase from 'firebase'

import { useGlobalState } from 'State'

const firebaseConfig = {
  apiKey: 'AIzaSyCuxgRJv_tfYENTjAqW6MWpeTYaLlJEXIo',
  authDomain: 'testauditoriumbooking.firebaseapp.com',
  databaseURL: 'https://testauditoriumbooking.firebaseio.com',
  projectId: 'testauditoriumbooking',
  storageBucket: 'testauditoriumbooking.appspot.com',
  messagingSenderId: '287027677291',
  appId: '1:287027677291:web:bc7bc1a8415e470ac4492e',
}

firebase.initializeApp(firebaseConfig)

const loginToFirebase = setGlobalState => {
  const provider = new firebase.auth.GoogleAuthProvider()
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
  firebase.auth().languageCode = 'en'

  firebase
    .auth()
    .signInWithPopup(provider)
    .then(result => {
      const token = result.credential.accessToken
      const user = result.user
      setGlobalState(s => ({
        ...s,
        auth: {
          token,
          user,
          isAuthenticated: true,
        },
      }))
    })
    .catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      alert(errorMessage)
      // The email of the user's account used.
      const email = error.email
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential
      // DO not recursively call itself
      // loginToFirebase(setGlobalState)
    })
}

export const useLogin = () => {
  const [, setGlobalState] = useGlobalState()

  return () => loginToFirebase(setGlobalState)
}

export const useLogout = () => {
  const [, setGlobalState] = useGlobalState()

  return () => {
    setGlobalState(s => ({
      ...s,
      auth: {
        ...s.auth,
        isAuthenticated: false,
      },
    }))
  }
}
