export default router => {
  router.beforeEach(async(to, from, next) =>{
    if (to.path.includes("sign")) {
      document.title = '签约助手'
    }else {
      document.title = '众包系统'
    }
    next()
  })
}
