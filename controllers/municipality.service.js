const Municipality = require('../models/municipality.model');

function getMunicipalityByCoordinates(coordinates) {
  // find which municipality polygon the given coordinates are in.
  return Municipality.findOne({ geometry: { $geoIntersects: { $geometry: { type: 'Point', coordinates } } } });
}
exports.getMunicipalityByCoordinates = getMunicipalityByCoordinates;
