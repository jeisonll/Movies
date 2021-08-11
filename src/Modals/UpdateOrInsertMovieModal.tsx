import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {Movie} from "../types/Movie";

interface Props {
  title: string;
  modal: boolean;
  toggle: () => void;
  movie: Movie;
  onSuccess: (movie: Movie, type: "UPDATE" | "INSERT") => void;
}

export const initialMovie: Movie = {
  name: '',
  description: '',
  year: 0,
  stars: 0,
  director: '',
  image: '',
}

function UpdateOrInsertMovieModal({modal, toggle, movie, onSuccess, title}: Props) {

  const [values, setValues] = useState(initialMovie);

  // aisgna los valores de mi imput a mi setValues
  function handleChange(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) {
    setValues({...values, [e.target.name]: e.target.value});
  }

  //Si la pelicula tiene id es para actualizar este boton
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSuccess(values, movie.id ? "UPDATE" : "INSERT");
  }

// Cuando el modal se abra cambia el valor de movie
  useEffect(() => {
    if (modal) {
      setValues(movie);
      console.log(movie)
    }
  }, [modal, movie])

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
      <ModalBody>
        <form id="updateMovieForm" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="message-text" className="col-form-label">Name:</label>
            <input className="form-control" type="text" name="name" value={values.name || ""}
                   required onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="message-text" className="col-form-label">Director:</label>
            <input className="form-control" type="text" name="director" value={values.director || ""}
                   required onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="message-text" className="col-form-label">Stars:</label>
            <input className="form-control" name="stars" value={values.stars || ""}
                   required onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="message-text" className="col-form-label">Year:</label>
            <input className="form-control" name="year" value={values.year || ""}
                   required onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="message-text" className="col-form-label">Image:</label>
            <input className="form-control" name="image" value={values.image || ""}
                   required onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="message-text" className="col-form-label">Description:</label>
            <textarea className="form-control" name="description" value={values.description || ""}
                      required onChange={handleChange}/>
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <button type="submit"
                form="updateMovieForm"
                className="btn btn-primary">
          Save
        </button>
        {' '}
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  )

}

export default UpdateOrInsertMovieModal;