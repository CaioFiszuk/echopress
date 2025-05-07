const router = require('express').Router();
const auth = require('../middlewares/auth');
const { createNews, getNews, deleteNews, updateNews } = require('../controllers/news');

router.get('/', getNews);

router.use(auth);
router.post('/', createNews);
router.delete('/:newsId', deleteNews);
router.patch('/:newsId', updateNews);

module.exports = router;