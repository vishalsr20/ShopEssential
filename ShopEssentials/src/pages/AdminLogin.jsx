import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const AdminLogin = () => {
  const [adminlogin, setAdminlogin] = useState(false);
  const navigate = useNavigate();
  const AdminPassword = "983363";
  const [value, setValue] = useState({
    password: "",
  });

  function ChangeHandler(e) {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  }

  function SubmitHandler() {
    console.log(value);
    if (value.password === AdminPassword) {
      toast.success("Login Successfully");
      setAdminlogin(true);
      navigate("/createproduct");
    } else {
      toast.error("Admin Password is incorrect");
    }
  }

  return (
    <div className="bg-slate-900 h-screen flex justify-center items-center">
      <div className="bg-slate-700 p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-2xl font-semibold text-center text-blue-500 mb-6">
          Admin Login
        </h1>

        <div className="mb-6">
          <input
            type="password"
            placeholder="Enter Admin Password"
            name="password"
            value={value.password}
            onChange={(e) => ChangeHandler(e)}
            className="w-full px-4 py-2 text-lg rounded-md bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={SubmitHandler}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all"
        >
          Submit
        </button>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default AdminLogin;
