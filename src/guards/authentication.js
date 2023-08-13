import { onAuthStateChanged } from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'

// Check if the user is authenticated if it is not
// it will not allow the user to access the protected modules
export const isAuthenticated = () => {
  const auth = useFirebaseAuth()

  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe() // Stop listening for session changes
      user ? resolve() : reject()
    })
  })
}
