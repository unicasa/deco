import { collection } from 'firebase/firestore'
import { useFirestore, useCollection } from 'vuefire'

const useTransfers = () => {
  const db = useFirestore()
  const transferCollection = useCollection(collection(db, 'transfers'))

  return {
    transferCollection
  }
}

export default useTransfers
