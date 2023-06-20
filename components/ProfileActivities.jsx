import Style from "/styles/ProfileActivities.module.css";
import StyleStandard from "/styles/PageStandard.module.css";
import Link from "next/link";
import { GiBiceps } from "react-icons/gi";
import { BsPlusLg, BsGraphUpArrow } from "react-icons/bs";
import { VscDebugStart } from "react-icons/vsc";
import React, { useState, useRef } from "react";
import { FaPlus } from "react-icons/fa";
import axios from 'axios';

export default function ProfileActivities() {
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    const handleFileSelected = async (e) => {
        const file = e.target.files[0];
        console.log(file)
        const formData = new FormData();
        formData.append("image", file);
        
        // This code is for uploading the image to db, not working for now
        // try {
        //   const response = await axios.post("/api/addPictureToDB", formData, {
        //     headers: { "Content-Type": "multipart/form-data" },
        //   });
        //   console.log("Image uploaded successfully");
        //   setFile(URL.createObjectURL(file));
        // } catch (error) {
        //   console.error(error);
        // }
        setFile(URL.createObjectURL(file));
      };

    return (
      <>
        <input
         type="file"
         onChange={handleFileSelected}
         ref={fileInputRef}
         style={{ display: "none" }}
       />
       <div>
         {!file && (
           <div
             className={Style.button}
             style={{ width: "100%" }}
             onClick={() => fileInputRef.current.click()}
           >
             Upload Profile Picture
           </div>
         )}
         {file && (
           <div
             className={Style.profilePicture}
             style={{
               backgroundImage: `url(${file})`,
               filter: isHovered ? "brightness(70%)" : "none",
             }}
             onClick={() => fileInputRef.current.click()}
             onMouseEnter={() => setIsHovered(true)}
             onMouseLeave={() => setIsHovered(false)}
           >
             {isHovered && (
               <div className={Style.overlay}>
                 <FaPlus className={Style.plusIcon} />
                 <span className={Style.label}>Update Picture</span>
               </div>
             )}
           </div>
         )}
       </div>

        <div className={Style.buttonContainer}>
          <div className={Style.choiceBlock}>
            <h1 style={{ fontSize: "27px", textAlign: "center" }}>
              Check out a workout
            </h1>
            <span className={Style.span}>
              Choose a plan from a few of our available workouts.
            </span>
            <Link href="./premade_workout" className={Style.button}>
              <VscDebugStart
                style={{
                  justifyContent: "center",
                  position: "center",
                  paddingRight: "10px",
                  fontSize: "30px",
                }}
              />
              Browse Workouts
            </Link>
          </div>
          <div className={Style.choiceBlock}>
            <h1 style={{ fontSize: "27px", textAlign: "center" }}>
              Feeling creative?
            </h1>
            <span className={Style.span}>
              Create the perfect routine to suit your style, technique,
              preferences and workout needs. <br />
              Browse from hundreds of available exercises.
            </span>
            <Link href="./create_custom_workout" className={Style.button}>
              <BsPlusLg
                style={{
                  justifyContent: "center",
                  position: "center",
                  paddingRight: "10px",
                  fontSize: "30px",
                }}
              />
              Create Workout
            </Link>
          </div>
          <div className={Style.choiceBlock}>
            <h1 style={{ fontSize: "27px", textAlign: "center" }}>
              Browse custom workouts
            </h1>

            <span className={Style.span}>
              Start a workout that you built for yourself.
            </span>
            <Link href="./custom" className={Style.button}>
              <GiBiceps
                style={{
                  justifyContent: "center",
                  position: "center",
                  paddingRight: "10px",
                  fontSize: "30px",
                }}
              />
              Custom Workouts
            </Link>
          </div>
          <div className={Style.choiceBlock}>
            <h1 style={{ fontSize: "27px", textAlign: "center" }}>For you</h1>
            <span className={Style.span}>
              Track your progress, Keep tabs on what's important.
            </span>
            <Link href="./personal_details" className={Style.button}>
              <BsGraphUpArrow
                style={{
                  justifyContent: "center",
                  position: "center",
                  paddingRight: "10px",
                  fontSize: "30px",
                }}
              />
              Update Progress
            </Link>
          </div>
        </div>
      </>
    );
}