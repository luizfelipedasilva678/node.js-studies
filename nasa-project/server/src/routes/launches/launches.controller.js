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
    return res.status(400).json({
      error: "Missing required launch property",
    });
  }

  launch.launchDate = new Date(launch.launchDate);

  if (launch.launchDate.toString() === "Invalid Date") {
    return res.status(400).json({
      error: "Invalid launch date",
    });
  }

  launchesModel.addNewLaunch(launch);
  return res.status(201).json(launch);
}

function deleteLaunch(req, res) {
  const { flightNumber } = req.params;
  const launch = launchesModel.deleteLaunch(Number(flightNumber));

  if (!launch)
    return res.status(404).json({
      error: "Launch not found",
    });

  return res.status(200).json(launch);
}

module.exports = {
  getAllLaunches,
  addNewLaunch,
  deleteLaunch,
};
