const log = require('./helper/Log.helper');
const documentRepository = require('./repository/Document.repository');

var promises = [];

// documents to move to backup
['IndicatorHistory', 'S9minerHistory'].map(document => {
  log.debug('[' + document + '] backup started');
  promises.push(documentRepository.moveAll(document));
});

// documents to copy to backup
['Place', 'Config', 'Warehouse'].map(document => {
  log.debug('[' + document + '] backup started');
  promises.push(documentRepository.copy(document));
});

Promise.all(promises).then(() => {
  log.debug('Finished!');
  process.exit();
});