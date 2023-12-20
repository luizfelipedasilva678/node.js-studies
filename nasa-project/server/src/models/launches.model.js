const axios = require("axios");
const launches = require("./launches.mongo");

const DEFAULT_LATEST_LAUNCH = 100;

const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query";

async function populateLaunches() {
  const { data: responseData } = await axios.post(SPACEX_API_URL, {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: "rocket",
          select: {
            name: 1,
          },
        },
        {
          path: "payloads",
          select: {
            customers: 1,
          },
        },
      ],
    },
  });

  const launchDocs = responseData.docs;

  for (const launchDoc of launchDocs) {
    const payloads = launchDoc["payloads"];
    const customers = payloads.flatMap((payload) => {
      return payload["customers"];
    });

    const launch = {
      flightNumber: launchDoc["flight_number"],
      mission: launchDoc["name"],
      rocket: launchDoc["rocket"]["name"],
      launchDate: launchDoc["date_local"],
      upcoming: launchDoc["upcoming"],
      success: launchDoc["success"],
      customers,
    };

    await addNewLaunch(launch);
  }
}

async function loadLaunchesData() {
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocket: "Falcon 1",
    mission: "FalconSat",
  });

  if (firstLaunch) {
    console.log("Launch data already loaded!");
  } else {
    populateLaunches();
  }
}

async function findLaunch(filter) {
  return await launches.findOne(filter);
}

async function getAllLaunches(skip, limit) {
  try {
    return await launches.find({}).skip(skip).limit(limit);
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
  getAllLaunches,
  addNewLaunch,
  abortLaunch,
  loadLaunchesData,
};
