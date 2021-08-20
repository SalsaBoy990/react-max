import { useHistory } from "react-router-dom";
import NewMeetupForm from "../components/meetups/NewMeetupForm";

function NewMeetupPage(props) {
  const history = useHistory();

  function onAddMeetupHandler(meetupData) {
    const url =
      "https://react-get-started-cf552-default-rtdb.europe-west1.firebasedatabase.app/";
    fetch(url + "meetups.json", {
      method: "POST",
      body: JSON.stringify(meetupData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      history.replace("/");
    });
  }

  return (
    <div>
      <NewMeetupForm onAddMeetup={onAddMeetupHandler}></NewMeetupForm>
    </div>
  );
}

export default NewMeetupPage;
