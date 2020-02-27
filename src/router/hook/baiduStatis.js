export default router => {
  const _hmt = _hmt || [];
  window._hmt = _hmt; // 必须把_hmt挂载到window下，否则找不到
  router.beforeEach((to, from, next) => {
    if (_hmt) {
      console.log(_hmt)
      if (to.path) {
        _hmt.push(['_trackPageview', to.fullPath])
      }
    }
    next();
  })
}
