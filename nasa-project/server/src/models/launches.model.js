const launches = require("./launches.mongo");

const DEFAULT_LATEST_LAUNCH = 100;

async function getAllLaunches() {
  try {
    return await launches.find({});
  } catch (e) {
    throw new Error("Error on getting all launches");
  }
}

async function addNewLaunch(launch) {
  try {
    Object.assign(launch, {
      success: true,
      upcoming: true,
      customer: ["ZTM", "Nasa"],
      flightNumber: (await getLatestLaunch()) + 1,
    });

    return await launches.create(launch);
  } catch (error) {
    throw new Error("Error on adding launch ");
  }
}

async function getLatestLaunch() {
  const latestLaunch = await launches.findOne({}).sort("-flightNumber");

  if (!latestLaunch) {
    return DEFAULT_LATEST_LAUNCH;
  }

  return latestLaunch.flightNumber;
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
    throw new Error(`Error abort launch`);
  }
}

module.exports = {
  launches,
  getAllLaunches,
  addNewLaunch,
  abortLaunch,
};
