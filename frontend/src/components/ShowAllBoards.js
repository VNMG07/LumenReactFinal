import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { useHistory } from "react-router-dom";
import DeleteBoard from "./DeleteBoard";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import Table from 'react-bootstrap/Table'

function ShowAllBoards() {
  const { boards, logout } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idOpenModal, setIdOpenModal] = useState();
  let history = useHistory();

  const openModal = (id) => {
    setIsModalOpen(true);
    setIdOpenModal(id);
  };

  const closedModal = () => {
    setIsModalOpen(false);
  };

  const logoutUser = async () => {
    const response = await logout();
    if (response !== undefined && response.status === 200) {
      history.push("/login");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="d-flex justify-content-end">
          <Button 
           startIcon={<PowerSettingsNewIcon />}
           variant="contained"
           className="btn btn-dark" 
           onClick={() => logoutUser()}>
            Logout
          </Button>
        </div>
      </div>
      <div className="row">
        <Table striped bordered hover variant="dark" >
          <thead>
            <tr>
              <th scope="col">Board Id</th>
              <th scope="col">Board Name</th>
              <th scope="col">User assigned to board</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {boards &&
              boards.map((board) => (
                <tr key={board.id}>
                  <td>{board.id}</td>
                  <td>{board.name}</td>
                  <td>{board.user.name}</td>
                  <td>
                    <Link to={`/edit/board/${board.id}`}>
                      <Button 
                      variant="contained"
                      color="primary"
                      className="btn btn-success"
                      startIcon={<EditIcon />}
                      >  
                     Edit
                     </Button>
                    </Link>
                    
                    <Button
                      variant="contained"
                      color="secondary"
                      className="btn btn-danger"
                      startIcon={<DeleteIcon />}
                      onClick={() => openModal(board.id)}
                    >
                      Delete
                    </Button>
                    
                    <DeleteBoard
                      isModalOpen={isModalOpen}
                      closedModal={closedModal}
                      board={board}
                      idOpenModal={idOpenModal}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default ShowAllBoards;
