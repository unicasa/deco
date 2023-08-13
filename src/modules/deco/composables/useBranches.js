import { collection } from 'firebase/firestore'
import { useFirestore, useCollection } from 'vuefire'

const useBranches = () => {
  const db = useFirestore()
  const branchCollection = useCollection(collection(db, 'branches'))

  return {
    branchCollection,
    getNameBranch: (id) => {
      const branch = branchCollection.value.find((branch) => branch.id === id)
      return branch?.name || '-'
    }
  }
}

export default useBranches
