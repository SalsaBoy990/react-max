import { useRef } from "react";
import Card from "../ui/Card";

import classes from "./NewMeetupForm.module.css";

function NewMeetupForm(props) {
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const addressInputRef = useRef();
  const descriptionInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const title = titleInputRef.current.value;
    const image = imageInputRef.current.value;
    const address = addressInputRef.current.value;
    const description = descriptionInputRef.current.value;

    const meetupData = {
      title: title,
      image: image,
      address: address,
      description: description,
    };

    props.onAddMeetup(meetupData);
  }

  return (
    <>
      <h1>Add New Meetup</h1>
      <Card>
        <form action="" className={classes.form} onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="title">Meetup Title</label>
            <input type="text" required name="title" ref={titleInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="image">Meetup Image</label>
            <input type="url" required name="image" ref={imageInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="address">Address</label>
            <input type="text" required name="address" ref={addressInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              cols="30"
              rows="10"
              ref={descriptionInputRef}
            ></textarea>
          </div>
          <div className={classes.actions}>
            <button>Add Meetup</button>
          </div>
        </form>
      </Card>
    </>
  );
}

export default NewMeetupForm;
