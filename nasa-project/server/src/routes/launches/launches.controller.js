const launchesModel = require("../../models/launches.model");

function getAllLaunches(req, res) {
  return res.status(200).json(launchesModel.getAllLaunches());
}

function addNewLaunch(req, res) {
  const launch = req.body;

  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.destination
  ) {
    return res.status(404).json({
      error: "Missing required launch property",
    });
  }

  launch.launchDate = new Date(launch.launchDate);

  if (launch.launchDate.toString() === "Invalid Date") {
    return res.status(404).json({
      error: "Invalid launch date",
    });
  }

  launchesModel.addNewLaunch(launch);
  return res.status(201).json(launch);
}

module.exports = {
  getAllLaunches,
  addNewLaunch,
};
