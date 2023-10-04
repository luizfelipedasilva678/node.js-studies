const launches = new Map();

let lastestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  lauchDate: new Date("December 27, 2030"),
  destination: "Kepler-442 b",
  customer: ["ZTM", "Nasa"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
  return Array.from(launches.values());
}

function addNewLaunch(launch) {
  lastestFlightNumber++;
  launches.set(
    lastestFlightNumber,
    Object.assign(launch, {
      success: true,
      upcoming: true,
      customer: ["ZTM", "Nasa"],
      flightNumber: lastestFlightNumber,
    })
  );
}

function deleteLaunch(flightNumber) {
  launches.delete(flightNumber);
  return launch;
}

module.exports = {
  launches,
  getAllLaunches,
  addNewLaunch,
  deleteLaunch,
};
