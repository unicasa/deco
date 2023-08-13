export default {
  name: 'deco',
  component: () => import('../layouts/DecoLayout.vue'),
  meta: { requiresAuth: true },
  children: [
    {
      path: 'articles',
      name: 'articles',
      component: () => import('../views/articles/ArticleDash.vue')
    },
    {
      path: 'articles/new',
      name: 'new-article',
      component: () => import('../views/articles/ArticleForm.vue')
    },
    {
      path: 'transfers',
      name: 'transfers',
      component: () => import('../views/transfers/TransferDash.vue')
    },
    {
      path: 'transfers/new',
      name: 'new-transfer',
      component: () => import('../views/transfers/TransferForm.vue')
    }
  ]
}
