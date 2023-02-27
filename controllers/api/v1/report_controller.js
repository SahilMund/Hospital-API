const Report = require("../../../models/report");
const Status = require("../../../config/status-enum");

//get/fetch all reports by using status
module.exports.fetchReportsByStatus = async function (req, res) {
  let status = Status[req.params.status];

  // Entered status should not be empty
  if (!status) {
    return res.status(404).json({
      message: "Status should not be empty",
      success: false,
    });
  }

  try {
    let report = await Report.find({ status: status })
      .sort("createdAt")
      .populate("patient doctor");

    //  No record found with the entered status
    if (report.length === 0) {
      return res.status(404).json({
        message: `No Record found for the status - ${status}`,
        success: true,
      });
    }
    return res.status(200).json({
      data: {
        report,
      },
      message:
        "All patient report of the status - " +
        status +
        " is generated successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};
