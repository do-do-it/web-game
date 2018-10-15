const router = (router) => {
  router.all('/demo', (req, res) => {
    res.send('Hello demo!')
  })
}

module.exports = router
