const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  post: {type: String},
  author: {type: String, required: false},
  lounge: {type: String},
});

postSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    post: this.post,
    author: this.author,
    lounge: this.lounge
  };
}

const Post = mongoose.model('Post', postSchema);
module.exports = {Post};
