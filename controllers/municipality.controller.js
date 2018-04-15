const Municipality = require('../models/municipality.model');
const MunicipalityService = require('./municipality.service');

function load(params) {
  return Municipality.get(params.id);
}

function getByCoordinates(req, res) {
  let coordinates = req.body;
  if (!coordinates) {
    // default to Upplands Väsby
    // https://mapszoom.com/sv/gps-coordinates.php?town=Upplands-V%C3%A4sby
    // TODO: make a better default
    coordinates = [17.928339999999935, 59.51961];
  }
  MunicipalityService.getMunicipalityByCoordinates(coordinates)
    .then((municipalityPolygon) => {
      const municipalityName = municipalityPolygon.properties.KNNAMN;
      res.json({ municipalityName });
    });
}


function get(req, res) {
  return res.json(req.mijoMessage);
}

function create(req, res) {
  let newMsg = req.body;
  if (!newMsg) {
    newMsg = {
      question: {
        title: 'Do you like me?',
        questionType: {
          multipleChoice: ['Yes', 'No'],
        }
      },
    };
  }
  const mijoMessage = new Municipality(newMsg);
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
  return Municipality.list({ limit, skip })
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
exports.getByCoordinates = getByCoordinates;
