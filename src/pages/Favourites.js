import { useContext } from "react";
import FavoritesContext from "../store/favourites-context";
import MeetupList from "../components/meetups/MeetupList";

function FavouritesPage() {
  const favoritesCtx = useContext(FavoritesContext);

  const favoritedMeetups = favoritesCtx.favorites;

  let content;

  if (favoritesCtx.totalFavorites === 0) {
    content = <p>Your favorite meetups list is currently empty.</p>;
  } else {
    content = <MeetupList meetups={favoritedMeetups}></MeetupList>;
  }

  return (
    <section>
      <h1>My favorites</h1>
      {content}
    </section>
  );
}

export default FavouritesPage;
