import React, { useState } from "react";
import "../Css/profile.css";
import WriteReview from "./WriteReview";
//add back in {user} into props later
const MatchedProfile = ({ isMatchedCardOpen, setMatchCard, user }) => {
  const [currentImg, setCurrentImg] = useState(0);
  const [isWriteReviewOpen, setWriteReviewIsOpen] = useState(false);

  const dummyUser = {
    email: "zebracakes@gmail.com",
    firstName: "Lil",
    id: "c9cVD0WoaQQwJoSGbKND",
    lastName: "Debz",
    likedUsers: [
      { name: "kyle", userId: "nRaPWcItsRZ5H884XSRGwxokXGX2" },
      { userId: "bAUDMItlIoac2N1kKzmLdQ2PMbv2", name: "ele" },
      { name: "test4", userId: "NgbmVoRjsDV1wsnmPZW0aCYEdt73" },
      { name: "Robert", userId: "xPfaPjhYLTMOdOh7eHvRLpRGJvf2" },
    ],
    location: "ND",
    pictureBucket: [
      {
        imageName: "burger1.jpgd0e3b015-0792-44fc-9e41-c46bc3a577df",
        URL: "https://firebasestorage.googleapis.com/v0/b/foodie-1ba1a.appspot.com/o/S42qYqrsNteakiebkGsXKtKk3Dn2%2Fburger1.jpgd0e3b015-0792-44fc-9e41-c46bc3a577df?alt=media&token=5da9317b-d668-41f9-a846-6b15bc022e68",
        tags: [],
      },
      {
        URL: "https://firebasestorage.googleapis.com/v0/b/foodie-1ba1a.appspot.com/o/S42qYqrsNteakiebkGsXKtKk3Dn2%2Fburger3.jpg7e521df6-6571-47e6-8a43-4b07ff8e83e7?alt=media&token=94b5e713-07bb-4272-946f-c31ff84089b1",
        tags: [],
        imageName: "karenpasta.jpg058a95ee-a40d-4e8e-98b2-42145a7ada94",
      },
    ],
    userId: "S42qYqrsNteakiebkGsXKtKk3Dn2",
    username: "Lildebz",
  };

  if (!isMatchedCardOpen) {
    return null;
  }

  if (user.pictureBucket) {
    if (user.pictureBucket.length) {
      return (
        <div>
          <button
            onClick={() => {
              setMatchCard(false);
            }}
          >
            X
          </button>
          {/* post pictures? */}
          <img src={user.pictureBucket[currentImg].URL} alt="" />
          <h1>{user.firstName}</h1>
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
          <br></br>
          <button
            onClick={() => {
              currentImg > 0 && setCurrentImg(currentImg - 1);
            }}
          >
            {"<<"}
          </button>
          <button
            onClick={() =>
              currentImg < user.pictureBucket.length - 1 &&
              setCurrentImg(currentImg + 1)
            }
          >
            {">>"}
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

          <WriteReview
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
        </div>
      );
    }
  }
  return <div>Loading...</div>;
};

export default MatchedProfile;
