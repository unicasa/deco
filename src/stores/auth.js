import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { useFirebaseAuth } from 'vuefire'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'

const errorMap = {
  'auth/user-not-found': 'Usuario no encontrado, verifique el correo introducido',
  'auth/wrong-password': 'Contraseña incorrecta, verifique el correo o contraseña introducido'
}

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const auth = useFirebaseAuth()

  // State
  const authUser = ref(null)
  const errorMessage = ref('')

  const login = async ({ email, password }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)

      authUser.value = userCredential.user
      router.push({ name: 'deco' })
    } catch (error) {
      const errorLog = new Error(`${errorMap[error.code]} (${error.code})`)
      console.error(errorLog)

      authUser.value = null
      errorMessage.value = errorMap[error.code]

      let timeout
      timeout = window.setTimeout(() => {
        window.clearTimeout(timeout)
        errorMessage.value = ''
      }, 5000)
    }
  }

  const logout = () => {
    signOut(auth)
      .then(() => {
        authUser.value = null
        router.push({ name: 'login' })
      })
      .catch((error) => {
        const errorLog = new Error(`Se ha producido un error al intentar cerrar sesión. ${error}`)
        console.error(errorLog)
      })
  }

  const checkAuthStatus = () => {
    onAuthStateChanged(auth, (user) => {
      user ? (authUser.value = user) : (authUser.value = null)
    })
  }

  // Validate the session user
  onMounted(() => checkAuthStatus())

  return {
    login,
    logout,
    authUser,
    errorMessage,
    isAuth: computed(() => Boolean(authUser.value)),
    hasError: computed(() => Boolean(errorMessage.value))
  }
})
