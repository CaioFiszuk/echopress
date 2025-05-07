const News = require("../models/news");

module.exports.createNews = (req, res) => {
  const { title, content, image, category } = req.body;

  if (!title || !content || !image || !category) {
    return res.status(400).send({ message: "Invalid Data" });
  }

  News.create({ title, content, image, category })
    .then((news) => res.send({ data: news }))
    .catch((err) =>
      res.status(500).send({ message: "It was not possible for create news" + err })

    );
};

module.exports.getNews = (req, res) => {
   News.find({})
   .then((news) => res.send({ data: news }))
   .catch((err) =>
    res.status(500).send({ message: "Server Error" })
  );
}

module.exports.deleteNews = (req, res) => {
  const { newsId } = req.params;

  News.findByIdAndDelete(newsId)
    .then((deletedNews) => {
      if (!deletedNews) {
        return res.status(404).send({ message: "That news was not found to be deleted" });
      }
      res.send({ message: "News deleted successfully", data: deletedNews });
    })
    .catch((err) => {
      res.status(500).send({ message: "Server error" });
    });
};


module.exports.updateNews = (req, res) => {
  const { title, content, image, category } = req.body;

  const update = {
    title,
    content,
    image,
    category
  }

  News.findByIdAndUpdate(
    req.params.newsId,
    update,
    {
      new: true,
      runValidators: true,
    }
  )
  .then(news => res.send({ data: news }))
  .catch(err => res.status(500).send('Server error'))
}
