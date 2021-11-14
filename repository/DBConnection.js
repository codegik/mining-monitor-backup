const env = require('../environment');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

var localDbConn = null;
var backupDbConn = null;

var getLocal = function (callback) {
  if (localDbConn) {
    callback(localDbConn);
  } else {
    MongoClient.connect(env.local_database_url, (err, db) => {
      assert.equal(null, err);
      localDbConn = db;
      db.on('close', () => {
        localDbConn = null;
      });
      callback(localDbConn);
    });
  }
};

var getBackup = function (callback) {
  if (backupDbConn) {
    callback(backupDbConn);
  } else {
    MongoClient.connect(env.backup_database_url, (err, db) => {
      assert.equal(null, err);
      backupDbConn = db;
      db.on('close', () => {
        backupDbConn = null;
      });
      callback(backupDbConn);
    });
  }
};

exports.getBackup = getBackup;
exports.getLocal = getLocal;