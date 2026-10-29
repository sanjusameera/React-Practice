import { useState } from "react";

function Profile() {
    const [user, setUser] = useState({
        name: "John Doe",
        age: 31,
        city: "LA",
    });

    // Change user age directly
    //   const handleAgeChange = (e) => {
    //     user.age = e.target.value;
    //     console.log(user);
    //   };

    // const handleAgeChange = (e) => {
    //     setUser({
    //         age: e.target.value,
    //     });
    // };

    const handleAgeChange = (e) => {
        setUser((prevUser) => {
            const updatedUser = { ...prevUser, age: e.target.value };
            console.log('Previous State:', prevUser);
            console.log('Updated State:', updatedUser);
            return updatedUser;
        });
    };

    return (
        <div>
            <h1>User Profile</h1>
            <p>Name: {user.name}</p>
            <p>Age: {user.age}</p>
            <p>City: {user.city}</p>

            <h2>Update User Age </h2>
            <input type="number" value={user.age} onChange={handleAgeChange} />
        </div>
    );
}

export default Profile;