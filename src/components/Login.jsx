import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link } from "react-router-dom";

const Login = () => {
    const { LoginUser } = useContext(AuthContext);

    const handleLogin = (e) =>{
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        LoginUser(email, password)
        .then((userCredential)=>{
            console.log(userCredential.user);
            const lastSignInTime = userCredential?.user?.metadata?.lastSignInTime;
            const loginInfo = {email, lastSignInTime};

            fetch("http://localhost:5000/users", {
              method:"PATCH",
              headers: {
                "content-type": "application/json"
              },
              body: JSON.stringify(loginInfo)
            })
            .then(res => res.json())
            .then(data => {
              console.log(data);
            })

        })
        .catch((err)=>{
            console.log("ERROR", err.message);
        })

    }
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="w-[330px] flex flex-col justify-center">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
        </div>
        <div className="card bg-base-100 shrink-0 shadow-2xl">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                name="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          <p className="text-center py-2">New in this website ? <Link to={"/register"} className="text-blue-500 ">Register now</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
