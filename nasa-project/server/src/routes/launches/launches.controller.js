const launchesModel = require("../../models/launches.model");
const { getPagination } = require("../../services/query");

async function getAllLaunches(req, res) {
  try {
    const { limit, skip } = getPagination(req.query);
    return res
      .status(200)
      .json(await launchesModel.getAllLaunches(skip, limit));
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
}

function addNewLaunch(req, res) {
  try {
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
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
}

async function abortLaunch(req, res) {
  try {
    const { flightNumber } = req.params;
    const launch = await launchesModel.abortLaunch(Number(flightNumber));

    if (!launch)
      return res.status(404).json({
        error: "Launch not found",
      });

    return res.status(200).json(launch);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
}

module.exports = {
  getAllLaunches,
  addNewLaunch,
  abortLaunch,
};
