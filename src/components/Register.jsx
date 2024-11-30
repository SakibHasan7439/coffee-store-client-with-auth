import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const Register = () => {
    const { createNewUser } = useContext(AuthContext);

    const handleRegister = (e) =>{
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        createNewUser(email, password)
        .then(result =>{
            console.log(result);
            const creationTime = result.user?.metadata?.creationTime;
            const newUser = { name, email, creationTime };
            // save user in database
            fetch('http://localhost:5000/users', {
                method: "POST",
                headers: {
                    "content-type":"application/json"
                },
                body: JSON.stringify(newUser)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
        })
        .catch(err =>{
            console.log("ERROR", err.message);
        })

    }
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="w-[330px] flex flex-col justify-center">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
        </div>
        <div className="card bg-base-100 shrink-0 shadow-2xl">
          <form onSubmit={handleRegister} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="name" name="name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email" name="email"
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
                placeholder="password" name="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
