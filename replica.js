const { ReplSet } = require('mongodb-topology-manager');
run().catch(error => console.error(error));

async function run() {
  console.log(new Date(), 'start');
  const bind_ip = 'localhost';
  // Starts a 3-node replica set on ports 31000, 31001, 31002, replica set
  // name is "rs0".
  const replSet = new ReplSet(
    'mongod',
    [
      {
        options: { port: 31000, dbpath: `${__dirname}/data/db/31000`, bind_ip },
      },
    ],
    { replSet: 'rs0' }
  );

  // Initialize the replica set
  await replSet.purge();
  await replSet.start();
  console.log(new Date(), 'Replica set started...');
}
