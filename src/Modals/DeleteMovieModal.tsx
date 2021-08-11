import React, {useEffect, useState} from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {deleteMovieService} from "../Services/MovieServices";
import {initialMovie} from "./UpdateOrInsertMovieModal";
import {Movie} from "../types/Movie";

interface Props {
  movie:Movie;
  modal: boolean;
  toggle: () => void;
  onSuccess: (movie:Movie)=>void;

}

function DeleteMovieModal({modal, movie, toggle,onSuccess}:Props){
  const [values,setValues]=useState(initialMovie);


  useEffect(()=>{
    if (modal) {
      setValues(movie);
      console.log(movie.id)
    }
  },[movie,modal])





  const onSubmit = (movie:any) => {
    onSuccess(movie);
  }
  return(
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>
            are you sure want to delete {values.name}?
          </ModalHeader>
          <ModalBody>


          </ModalBody>
          <ModalFooter>
            <button
                    onClick={()=>onSubmit(values.id)}
                    className="btn btn-primary">
              Delete
            </button>
            {' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
  )

}
export default DeleteMovieModal;