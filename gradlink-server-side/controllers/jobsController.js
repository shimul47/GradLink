const db = require("../config/db");
exports.createJob = async (req, res) => {
  try {
    const {
      alumniUserId,
      title,
      company,
      location,
      type,
      salary,
      deadline,
      experience,
      description,
      responsibilities,
      requirements,
      benefits,
      skills,
      isRemote,
      contactEmail,
      applicationLink,
      status,
    } = req.body;

    if (!alumniUserId || !title) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const [result] = await db.query(
      `INSERT INTO jobs 
      (alumniUserId, title, company, location, type, salary, deadline, experience, description, responsibilities, requirements, benifits, skills, isRemote, contactEmail, applicationLink, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        alumniUserId,
        title,
        company || null,
        location || null,
        type || "full-time",
        salary || null,
        deadline || null,
        experience || null,
        description || null,
        responsibilities || null,
        JSON.stringify(requirements || []),
        benefits || null,
        JSON.stringify(skills || []),
        isRemote ? 1 : 0,
        contactEmail || null,
        applicationLink || null,
        status || "active",
      ]
    );

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      jobId: result.insertId,
    });
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Fetch all jobs
exports.getJobs = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM jobs ORDER BY deadline DESC");

    const jobs = rows.map((job) => {
      let parsedRequirements = [];
      let parsedSkills = [];

      try {
        parsedRequirements = job.requirements
          ? JSON.parse(job.requirements)
          : [];
        if (!Array.isArray(parsedRequirements))
          parsedRequirements = [parsedRequirements];
      } catch (err) {
        parsedRequirements = job.requirements ? [job.requirements] : [];
      }

      try {
        parsedSkills = job.skills ? JSON.parse(job.skills) : [];
        if (!Array.isArray(parsedSkills)) parsedSkills = [parsedSkills];
      } catch (err) {
        parsedSkills = job.skills ? [job.skills] : [];
      }

      return {
        ...job,
        requirements: parsedRequirements,
        skills: parsedSkills,
        isRemote: job.isRemote === 1,
      };
    });

    res.json({ success: true, jobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
exports.applyJob = async (req, res) => {
  try {
    const { jobId, applicantId, applicantType, coverLetter } = req.body;

    if (!jobId || !applicantId || !applicantType) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const [result] = await db.query(
      `INSERT INTO job_applications (jobId, applicantId, applicantType, coverLetter) 
       VALUES (?, ?, ?, ?)`,
      [jobId, applicantId, applicantType, coverLetter || null]
    );

    res.status(201).json({
      success: true,
      message: "Application submitted",
      applicationId: result.insertId,
    });
  } catch (error) {
    console.error("Error applying for job:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//for delete
exports.updateJobStatus = async (req, res) => {
  try {
    const jobId = req.params.id;
    const { status } = req.body;

    const [result] = await db.query("UPDATE jobs SET status = ? WHERE id = ?", [
      status,
      jobId,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    res.json({ success: true, message: "Job status updated", status });
  } catch (error) {
    console.error("Error updating job status:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
