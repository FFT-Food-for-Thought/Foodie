import React, { useState } from "react";
import "../Css/profile.css";
import "../Css/writeReview.css";
import SeeReviews from "./SeeReviews";
import WriteReview from "./WriteReview";
//add back in {user} into props later
const MatchedProfile = ({ setMatchCard, user, loggedInUser }) => {
  const [currentImg, setCurrentImg] = useState(0);
  const [isWriteReviewOpen, setWriteReviewIsOpen] = useState(false);
  const [openSeeReview, setSeeReview] = useState(false);
  console.log("loggedinUser in match profile", loggedInUser);

  const seeReviewHandler = () => {
    setSeeReview(true);
    console.log(openSeeReview);
  };

  if (user.pictureBucket) {
    if (user.pictureBucket.length) {
      return (
        <div className="other-user">
          <div className="single-profile-card">
            {/* post pictures? */}
            <img
              src={user.pictureBucket[currentImg].URL}
              alt=""
              className="other-user-img"
            />
            <div className="left-right">
              <button
                onClick={() => {
                  currentImg > 0 && setCurrentImg(currentImg - 1);
                }}
                className="left-right-button"
              >
                <i class="fa-solid fa-angles-left"></i>
              </button>
              <button
                onClick={() =>
                  currentImg < user.pictureBucket.length - 1 &&
                  setCurrentImg(currentImg + 1)
                }
                className="left-right-button"
              >
                <i class="fa-solid fa-angles-right"></i>
              </button>
            </div>
            <div className="name-and-location">
              <div className="basic-info">
                <h1 className="other-user-firstName">{user.firstName}</h1>
                <button
                  onClick={() => {
                    let div = document.getElementById("matchedInfoDiv");
                    if (div.style.display === "block") {
                      div.style.display = "none";
                    } else {
                      div.style.display = "block";
                    }
                  }}
                  className="info-button"
                >
                  <i class="fa-solid fa-circle-info"></i>
                </button>
              </div>
              <div className="basic-info">
                <i class="fa-solid fa-house"></i>
                <p className="other-user-location">Lives in {user.location}</p>
              </div>
              <div className="basic-info">
                <i class="fa-solid fa-location-dot"></i>
                <p className="other-user-location">miles away</p>
              </div>
              <div className="other-user-tags">
                {user.pictureBucket[currentImg].tags.map((tag, i) => (
                  <p key={i} className="other-user-tag">
                    {tag}
                  </p>
                ))}
              </div>
            </div>
            <br></br>
          </div>
          <div className="other-user-next">
            <WriteReview
              user={user}
              loggedInUser={loggedInUser}
              openWriteReview={isWriteReviewOpen}
              onWriteReviewClose={() => {
                setWriteReviewIsOpen(false);
              }}
            />
            <button
              onClick={() => {
                setWriteReviewIsOpen(true);
              }}
              className="other-user-button review"
            >
              <i class="fa-regular fa-pen-to-square"></i>
            </button>
            {/*
          <button
            onClick={() => {
              onAddReviewHandler(users[currentUser].id);
            }}
            className="other-user-button review"
          >
            <i class="fa-regular fa-pen-to-square"></i>
          </button>
          */}
            <SeeReviews
              setSeeReview={setSeeReview}
              user={user}
              openSeeReview={openSeeReview}
            />
            <button
              onClick={() => {
                setSeeReview(true);
                console.log(openSeeReview);
              }}
            >
              SEE REVIEWS
            </button>
          </div>
          <div id="matchedInfoDiv" style={{ display: "none" }}>
            Woops poop hanging from butt must get rid run run around house drag
            poop on floor maybe it comes off woops left brown marks on floor
            human slave clean lick butt now avoid the new toy and just play with
            the box it came in so mouse grab pompom in mouth and put in water
            dish meeeeouw yet i love cats i am one wake up scratch humans leg
            for food then purr then i have a and relax. Love fish run as fast as
            i can into another room for no reason rub butt on table take a big
            fluffing crap ðŸ’© and at four in the morning wake up owner
            meeeeeeooww scratch at legs and beg for food then cry and yowl until
            they wake up at two pm jump on window and sleep while observing the
            bootyful cat next door that u really like but who already has a
            boyfriend end up making babies with her and let her move in. Please
            let me outside pouty face yay!
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <p>{user.firstName}NO PIC</p>
          <button
            onClick={() => {
              let div = document.getElementById("matchedInfoDiv");
              if (div.style.display === "block") {
                div.style.display = "none";
              } else {
                div.style.display = "block";
              }
            }}
          >
            {"info"}
          </button>
          <div id="matchedInfoDiv" style={{ display: "none" }}>
            Woops poop hanging from butt must get rid run run around house drag
            poop on floor maybe it comes off woops left brown marks on floor
            human slave clean lick butt now avoid the new toy and just play with
            the box it came in so mouse grab pompom in mouth and put in water
            dish meeeeouw yet i love cats i am one wake up scratch humans leg
            for food then purr then i have a and relax. Love fish run as fast as
            i can into another room for no reason rub butt on table take a big
            fluffing crap ðŸ’© and at four in the morning wake up owner
            meeeeeeooww scratch at legs and beg for food then cry and yowl until
            they wake up at two pm jump on window and sleep while observing the
            bootyful cat next door that u really like but who already has a
            boyfriend end up making babies with her and let her move in. Please
            let me outside pouty face yay! wait, it's cold out please let me
            inside pouty face oh, thank you rub against mommy's leg oh it looks
            so nice out, please let me outside again the neighbor cat was mean
            to me please let me back inside furball roll roll roll, but
            experiences short bursts of poo-phoria after going to the loo groom
            yourself 4 hours - checked, have your beauty sleep 18 hours -
            checked, be fabulous for the rest of the day - checked making bread
            on the bathrobe and unwrap toilet paper stare at ceiling light.
            Licks paws scratch leg; meow for can opener to feed me or cough
            furball. Eat too much then proceed to regurgitate all over living
            room carpet while humans eat dinner fall asleep on the washing
            machine soft kitty warm kitty little ball of furr instantly break
            out into full speed gallop across the house for no reason, climb
            leg. Munch on tasty moths more napping, more napping all the napping
            is exhausting so chew the plant. Prance along on top of the garden
            fence, annoy the neighbor's dog and make it bark jump on human and
            sleep on her all night long be long in the bed, purr in the morning
            and then give a bite to every human around for not waking up request
            food, purr loud scratch the walls, the floor, the windows, the
            humans. Kitty power be a nyan cat, feel great about it, be annoying
            24/7 poop rainbows in litter box all day. Is good you understand
            your place in my world.
          </div>
          <button
            onClick={() => {
              setMatchCard(false);
            }}
          >
            X
          </button>
          <WriteReview
            user={user}
            openWriteReview={isWriteReviewOpen}
            onWriteReviewClose={() => {
              setWriteReviewIsOpen(false);
            }}
          />
          <button
            onClick={() => {
              setWriteReviewIsOpen(true);
            }}
          >
            REVIEW
          </button>
          <SeeReviews
            setSeeReview={setSeeReview}
            user={user}
            openSeeReview={openSeeReview}
          />
          <button
            onClick={() => {
              setSeeReview(true);
              console.log(openSeeReview);
            }}
          >
            SEE REVIEWS
          </button>
        </div>
      );
    }
  }
  return <div>Loading...</div>;
};

export default MatchedProfile;
