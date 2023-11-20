const launches = require("./launches.mongo");

async function getAllLaunches() {
  try {
    return await launches.find({});
  } catch (e) {
    console.log("Error on getting all launches");
  }
}

async function addNewLaunch(launch) {
  try {
    Object.assign(launch, {
      success: true,
      upcoming: true,
      customer: ["ZTM", "Nasa"],
      flightNumber: (await getAllLaunches()).length + 1,
    });

    return await launches.create(launch);
  } catch (error) {
    console.log(`Error adding new launch ${error}`);
  }
}

async function abortLaunch(flightNumber) {
  try {
    return launches.findOneAndUpdate(
      { flightNumber },
      {
        upcoming: false,
        success: false,
      }
    );
  } catch (error) {
    console.log(`Error abort new launch ${error}`);
  }
}

module.exports = {
  launches,
  getAllLaunches,
  addNewLaunch,
  abortLaunch,
};
