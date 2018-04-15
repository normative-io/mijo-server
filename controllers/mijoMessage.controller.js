// import MijoMessage from '../models/mijoMessage.model';
const MijoMessage = require('../models/mijoMessage.model');

function load(params) {
  return MijoMessage.get(params.id);
}

function get(req, res) {
  return res.json(req.mijoMessage);
}

function create(req, res) {
  let newMsg = req.body;
  if (newMsg) {
    newMsg = {
      question: {
        title: 'testtitle',
        questionType: {
          multipleChoice: ['Yes', 'No'],
        }
      },
    };
  }
  const mijoMessage = new MijoMessage(newMsg);
  return mijoMessage.save().then(mijoMessage => res.json(mijoMessage));
}

function update(params) {
  return load(params).then((mijoMessage) => {
    const tmp = mijoMessage;
    mijoMessage.title = params.data.title;
    mijoMessage.content = params.data.content;
    return mijoMessage.save();
  });
}

function list(req, res) {
  const limit = 50;
  const skip = 0;
  return MijoMessage.list({ limit, skip })
    .then(mijoMessages => res.json(mijoMessages));
}

function remove(params) {
  return load(params).then(mijoMessage => mijoMessage.remove());
}

// export default {
//  load, get, create, update, list, remove
// };
exports.load = load;
exports.get = get;
exports.create = create;
exports.update = update;
exports.list = list;
exports.remove = remove;
