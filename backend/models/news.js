const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return new RegExp(
          "^(https?:\\/\\/)?" +
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
          "((\\d{1,3}\\.){3}\\d{1,3}))" +
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
          "(\\?[;&a-z\\d%_.~+=-]*)?" +
          "(\\#[-a-z\\d_]*)?$",
          "i"
        ).test(v);
      },
      message: props => `${props.value} não é uma URL válida!`
    }
  },
  category: {
    type: [String],
    enum: ['politica', 'esporte', 'saude', 'tecnologia', 'economia', 'entretenimento'],
    required: true,
    validate: {
      validator: (arr) => arr.length > 0,
      message: 'Pelo menos uma categoria é obrigatória.'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('news', newsSchema);