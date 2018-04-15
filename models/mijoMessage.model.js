const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * This template is used for all messages sent to and from the Mijo client.
 */
const MijoMessageSchema = new Schema({
  /**
   * This template is used for all question messages sent to and from the Mijo client.
   */
  question: {
    // should be required
    title: { type: String },
    /**
     * This template is used for the different types of questions.
     */
    questionType: {
      multipleChoice: { type: [String] },
      scale: { type: [Number] },
      checkBoxes: { type: [String] },
    },
    soundFile: { type: String },
  },
  /**
   * This template is used for the answers to questions.
   */
  answer: {
    yesAnswer: { type: Boolean },
    textAnswerArray: { type: [String] },
    scaleAnswer: { type: Number },
  },
  /**
   * This template is used for the commands sent to the client for the kid to execute.
   */
  command: {
    // should be required
    title: { type: String },
    soundFile: { type: String },
  },
  /**
   * This template is used for the responses the kid makes after seeing a command from Moji.
   */
  response: {
    // should be required
    title: { type: String },
    soundFile: { type: String },
  },
  timestamp: { type: Date, required: true, default: new Date() },
});

/**
 * Statics
 */
MijoMessageSchema.statics = {
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
        const err = new Error('No such MijoMessage exists!');
        return Promise.reject(err);
      });
  },

  /**
   * List posts in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of posts to be skipped.
   * @param {number} limit - Limit number of posts to be returned.
   * @returns {Promise<Post[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ timestamp: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

MijoMessageSchema.index({ timestamp: -1 });

/**
 * @typedef MijoMessage
 */
// export default mongoose.model('MijoMessage', MijoMessageSchema);
const MijoMessage = mongoose.model('MijoMessage', MijoMessageSchema);

module.exports = MijoMessage;
