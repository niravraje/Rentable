import { Radio } from "@material-ui/core";
import React, { useState } from "react";
import JSONDATAx from "../Data2.json";

function Complains({ id }) {
  const data = JSONDATAx;

  const [itemid, setItemid] = useState(2);
  const initalData = data.filter((value) => {
    return value.id == itemid;
  });
  const [item, setItem] = useState(initalData[0]);
  console.log(item.id);

  return (
    <div
      className="card container mt-S"
      style={{ marginTop: "100px", width: "500px" }}
    >
      <form>
        <p className="h4 text-center mb-4">Complains</p>
        <label htmlFor="defaultFormContactNameEx" className="grey-text">
          Product
        </label>
        <input
          type="text"
          id="defaultFormContactNameEx"
          className="form-control"
          value={item.description}
          disabled="disable"
        />
        <br />
        <label htmlFor="defaultFormContactNameEx" className="grey-text">
          Refund
        </label>
        <select
          type="text"
          id="defaultFormContactNameEx"
          className="form-select"
          required
        >
          <option value="Select" selected>
            --- Select ---
          </option>
          <option value="yes">YES</option>
          <option value="No">NO</option>
        </select>
        <br />
        <label
          htmlFor="defaultFormContactMessageEx"
          className="grey-text"
          required
        >
          Reason
        </label>
        <textarea
          type="text"
          id="defaultFormContactMessageEx"
          className="form-control"
          rows="8"
        />
        <div className="text-center mt-4">
          <button
            type="submit"
            className="btn btn-dark btn-primary w-49 float: left"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Complains;
