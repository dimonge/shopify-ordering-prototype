module.exports = async function ({ watch, watchAll } = {}) {
  if (!watch && !watchAll) {
    console.log("***** STOPPING MONGODB SERVER *****");
    await global.__MONGOD__.stop();
  }
};
