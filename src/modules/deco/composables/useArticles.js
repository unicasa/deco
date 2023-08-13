import { collection } from 'firebase/firestore'
import { useFirestore, useCollection } from 'vuefire'

const useArticles = () => {
  const db = useFirestore()
  const articleCollection = useCollection(collection(db, 'articles'))

  return {
    articleCollection,
    getNameArticle: (id) => {
      const article = articleCollection.value.find((article) => article.id === id)
      return article?.name || '-'
    },
    getArticlesByBranch: (branchId) => {
      return articleCollection.value.filter((article) => article.branch === branchId)
    }
  }
}

export default useArticles
