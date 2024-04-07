import React, { useState, useEffect } from 'react'
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function StarsList() {
  const [stars, setStars] = useState([])
  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem("token");
    navigate("/");
  }
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/");
    };
    axios.get(`http://localhost:3003/api/stars`, {headers: {Authorization: token}})
      .then(res => {
        console.log(res);
        setStars(res.data);
      })
      .catch(res => {
        console.log(res);
        if (res.data.status == 401) {
          logout();
        }
      })
  }, [])

  return (
    <div className="container">
      <h3>StarsList <button onClick={logout}>Logout</button></h3>
      {stars.length > 0 ? (
        <div>
          {stars.map((star) => (
            <div key={star.id} style={{ marginBottom: '20px' }} className="star">
              <h4>{star.fullName}</h4>
              <p>Born: {star.born}</p>
              <p>{star.bio}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No stars found.</p>
      )}
    </div>
  )
}
