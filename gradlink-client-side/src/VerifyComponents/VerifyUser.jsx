import { useState, useEffect } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { use } from "react";
import { useNavigate } from "react-router";

const VerifyUser = () => {
  const { user } = use(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    studentId: "",
    officialEmail: "",
    department: "",
    batchYear: "",
    graduationYear: "",
    company: "",
    userType: "",
    agreed: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // new state

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreed) return alert("Please confirm your information.");
    if (!formData.userType) return alert("Please select user type.");

    setIsSubmitting(true);

    try {
      const response = await axiosPublic.post("/verify-user", {
        userId: user.uid,
        userType: formData.userType,
        fullName: formData.fullName,
        studentId: formData.studentId,
        officialEmail: formData.officialEmail,
        department: formData.department,
        batchYear: formData.batchYear,
        graduationYear: formData.graduationYear,
        company: formData.company,
      });

      alert(response.data.message);
      setIsSubmitted(true); // mark form as submitted
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-screen-md mx-auto p-6">
      <h2 className="text-2xl text-white mb-6">Verify Your Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          className="input input-bordered w-full"
          value={formData.userType}
          onChange={(e) =>
            setFormData({ ...formData, userType: e.target.value })
          }
          required
          disabled={isSubmitted} // disable after submission
        >
          <option value="">Select User Type</option>
          <option value="student">Student</option>
          <option value="alumni">Alumni</option>
        </select>

        <input
          type="text"
          placeholder="Full Name"
          className="input input-bordered w-full"
          value={formData.fullName}
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
          required
          disabled={isSubmitted}
        />

        <input
          type="text"
          placeholder={
            formData.userType === "student" ? "Student ID" : "Alumni ID"
          }
          className="input input-bordered w-full"
          value={formData.studentId}
          onChange={(e) =>
            setFormData({ ...formData, studentId: e.target.value })
          }
          required
          disabled={isSubmitted}
        />

        <input
          type="email"
          placeholder="Official Email"
          className="input input-bordered w-full"
          value={formData.officialEmail}
          onChange={(e) =>
            setFormData({ ...formData, officialEmail: e.target.value })
          }
          required
          disabled={isSubmitted}
        />

        <input
          type="text"
          placeholder="Department"
          className="input input-bordered w-full"
          value={formData.department}
          onChange={(e) =>
            setFormData({ ...formData, department: e.target.value })
          }
          required
          disabled={isSubmitted}
        />

        {formData.userType === "student" && (
          <input
            type="number"
            placeholder="Batch Year"
            className="input input-bordered w-full"
            value={formData.batchYear}
            onChange={(e) =>
              setFormData({ ...formData, batchYear: e.target.value })
            }
            required
            disabled={isSubmitted}
          />
        )}

        {formData.userType === "alumni" && (
          <>
            <input
              type="number"
              placeholder="Graduation Year"
              className="input input-bordered w-full"
              value={formData.graduationYear}
              onChange={(e) =>
                setFormData({ ...formData, graduationYear: e.target.value })
              }
              required
              disabled={isSubmitted}
            />
            <input
              type="text"
              placeholder="Current Company (optional)"
              className="input input-bordered w-full"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
              disabled={isSubmitted}
            />
          </>
        )}

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.agreed}
            onChange={(e) =>
              setFormData({ ...formData, agreed: e.target.checked })
            }
            required
            disabled={isSubmitted}
          />
          I confirm the information is correct.
        </label>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isSubmitting || isSubmitted} // disable after submission
        >
          {isSubmitting
            ? "Submitting..."
            : isSubmitted
            ? "Submitted"
            : "Verify Account"}
        </button>
      </form>
    </div>
  );
};

export default VerifyUser;
