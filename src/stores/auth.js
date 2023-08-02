import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'

const errorMap = {
  'auth/user-not-found': 'Usuario no encontrado, verifique el correo introducido',
  'auth/wrong-password': 'Contraseña incorrecta, verifique el correo o contraseña introducido'
}

export const useAuthStore = defineStore('auth', () => {
  const auth = useFirebaseAuth()
  const router = useRouter()

  // State
  const authUser = ref(null)
  const errorMessage = ref('')

  onMounted(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) return
      authUser.value = user
    })
  })

  const login = async ({ email, password }) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password).then(
        (credential) => credential.user
      )

      authUser.value = user
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

  return {
    login,
    logout,
    errorMessage,
    isAuth: computed(() => Boolean(authUser.value)),
    hasError: computed(() => Boolean(errorMessage.value))
  }
})
