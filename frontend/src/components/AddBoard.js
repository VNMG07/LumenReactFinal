import React, { useState, useContext, useRef } from "react";
import { UserContext } from "../context/UserProvider";
import { useHistory } from "react-router-dom";

function AddBoard() {
  const { addBoard, users } = useContext(UserContext);

  const [boardName, setBoardName] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");

  let history = useHistory();
  const userErrorRef = useRef();

  const handleInputChange = (e) => {
    setBoardName(e.target.value);
  };

  const handleSelectChange = (e) => {
    setSelectedUserId(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await addBoard(boardName, selectedUserId, userErrorRef);

    if (response !== undefined && response.status === 200) {
      history.push("/allboards");
    }
  };

  return (
    <div className="container">
      <div className="row">
      <h1>Add Board</h1>
        <div
          className="col-4 mt-4 mx-auto alert alert-danger collapse"
          role="alert"
          ref={userErrorRef}
        ></div>
      </div>
      <div className="row">
        <div className="col-4 mt-4 mx-auto">
          <div className="card">
            <div className="card-body">
              <form onSubmit={(e) => onSubmit(e)}>
             
                <div className="form-group">
                  
                  <input
                    placeholder="Board Name"
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    onChange={(e) => handleInputChange(e)}
                  />
                  <select
                    className="form-select form-select-lg mt-4 mb-4"
                    onChange={handleSelectChange}
                  >
                    <option value="">Select a user</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div>
              

                <div className="mt-4 ml-auto">
                  <button className="btn btn-success" type="submit">
                    Add Board
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBoard;
