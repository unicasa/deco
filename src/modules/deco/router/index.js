export default {
  name: 'deco',
  component: () => import('../layouts/DecoLayout.vue'),
  meta: { requiresAuth: true },
  children: []
}
