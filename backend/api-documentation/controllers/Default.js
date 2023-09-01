'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.apiEventsGET = function apiEventsGET (req, res, next) {
  Default.apiEventsGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.apiEventsIdDELETE = function apiEventsIdDELETE (req, res, next, id) {
  Default.apiEventsIdDELETE(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.apiEventsIdDelete_imageDELETE = function apiEventsIdDelete_imageDELETE (req, res, next, body, id) {
  Default.apiEventsIdDelete_imageDELETE(body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.apiEventsIdGET = function apiEventsIdGET (req, res, next, id) {
  Default.apiEventsIdGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.apiEventsIdPUT = function apiEventsIdPUT (req, res, next, body, id) {
  Default.apiEventsIdPUT(body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.apiEventsIdUpload_imagesPOST = function apiEventsIdUpload_imagesPOST (req, res, next, id) {
  Default.apiEventsIdUpload_imagesPOST(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.apiEventsPOST = function apiEventsPOST (req, res, next, body) {
  Default.apiEventsPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
