import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const { token } = useParams();
  const [status, setStatus] = useState("Verifying...");
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/auth/verify-email/${token}`
        );
        console.log(res);
        setStatus(res.data.message);

        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (err) {
        console.error(err);
        const msg =
          err.response?.data?.message ||
          "Verification failed or token is invalid.";
        setStatus(msg);
      }
    };
    verify();
  }, [token]);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center text-xl font-medium">{status}</div>
    </div>
  );
};

export default VerifyEmail;
