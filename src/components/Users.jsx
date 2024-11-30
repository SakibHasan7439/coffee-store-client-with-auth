import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const Users = () => {
  const loadedUsers = useLoaderData();
  const [users, setUsers] = useState(loadedUsers);

  const handleDelete = (_id) =>{
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            fetch(`http://localhost:5000/users/${_id}`, {
                method: "DELETE"
            })
            .then(res => res.json())
            .then(data =>{
                if(data.deletedCount > 0){
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                      });
                }
                const remaining = users.filter(user => user._id != _id);
                setUsers(remaining);
            })
        }
      });

  }
  return (
    <div>
      <h2 className="text-3xl">Users: {users.length}</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Creation Time</th>
              <th>lastSignInTime</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
                users.map((user)=> <tr key={user._id} className="hover">
                <th>2</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.creationTime}</td>
                <td>{user.lastSignInTime}</td>
                <td>
                    <Link>
                        <button className="btn-sm mr-2 px-2 rounded-md bg-orange-500 text-white hover:bg-orange-600">Edit</button>
                    </Link>
                    <button onClick={()=>handleDelete(user._id)} className="btn-sm px-2 rounded-md bg-red-500 text-white hover:bg-red-600">Del</button>
                </td>
              </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
