import React from "react";
import { useParams } from "react-router-dom";
import Card from "./Card";

const Merci = () => {
  let { name } = useParams();

  const handleChange = (event) => {
    document.getElementById("name").innerHTML = event.target.value;
  };
  return (
    <Card>
      <div>
        <div>
          <h3>
            Merci <label id="name">{name}</label>!
          </h3>
        </div>
        <div>
          {" "}
          <input
            className="form-control mt-5"
            type="text"
            placeholder="Enter name"
            required
            onChange={handleChange}
          />
        </div>
      </div>
    </Card>
  );
};
export default Merci;
