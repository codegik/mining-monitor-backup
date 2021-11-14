const log = require('../helper/Log.helper');
const connection = require('./DBConnection');
const assert = require('assert');

var moveAll = function (document) {
  return new Promise((resolve, reject) => {
    connection.getLocal(local => {
      local.collection(document).find({}).toArray((err, results) => {
        if (results.length > 0) {
          log.debug('[' + document + '] Moving ' + results.length + ' itens to backup');
          connection.getBackup(backup => {
            backup.collection(document).insertMany(results, (err, result) => {
              assert.equal(err, null);
              log.debug('[' + document + '] Removing all itens from local');
              connection.getLocal(local => {
                local.collection(document).deleteMany({}, (err, result) => {
                  log.debug('[' + document + '] Done');
                  resolve(true);
                });
              });
            });
          });
        } else {
          log.error('[' + document + '] Zero itens to move to backup');
          resolve(true);
        }
      });
    });
  });
};

var copy = function (document) {
  return new Promise((resolve, reject) => {
    connection.getLocal(local => {
      local.collection(document).find({}).toArray((err, results) => {
        if (results.length > 0) {
          log.debug('[' + document + '] Copying ' + results.length + ' itens to backup');
          connection.getBackup(backup => {
            backup.collection(document).deleteMany({}, (err, result) => {
              backup.collection(document).insertMany(results, (err, result) => {
                assert.equal(err, null);
                log.debug('[' + document + '] Done');
                resolve(true);
              });
            });
          });
        } else {
          log.error('[' + document + '] Zero itens to copied to backup');
          resolve(true);
        }
      });
    });
  });
};

exports.moveAll = moveAll;
exports.copy = copy;