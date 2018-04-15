const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * This template is used for all messages sent to and from the Mijo client.
 */
const MunicipalitySchema = new Schema({
  type: { type: String, required: true },
  geometry: {
    type: { type: String, required: true },
    coordinates: { type: Schema.Types.Mixed, required: true }
  },
  properties: {
    KNKOD: { type: Number, required: true },
    KNNAMN: { type: String, required: true },
    FeatureID: { type: Number, required: true }
  }
});

/**
 * Statics
 */
MunicipalitySchema.statics = {
  /**
   * Get post
   * @param {ObjectId} id - The objectId of post.
   * @returns {Promise<Post, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((post) => {
        if (post) {
          return post;
        }
        const err = new Error('No such Municipality exists!');
        return Promise.reject(err);
      });
  },

  /**
   * List random municipality in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of posts to be skipped.
   * @param {number} limit - Limit number of posts to be returned.
   * @returns {Promise<Post[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

MunicipalitySchema.index({ timestamp: 1 });

const Municipality = mongoose.model('Municipality', MunicipalitySchema);

module.exports = Municipality;
