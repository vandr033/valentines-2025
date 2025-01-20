"use client";
import { useState } from "react";
import { FaHeart } from "react-icons/fa"; // Import heart icon from react-icons
import Image from "next/image";

export default function Home() {
  const [noButtonState, setNoButtonState] = useState({
    isMoving: false, // Track when the "No" button is moving
    top: 50, // Initial vertical alignment
    left: 50, // Initial horizontal alignment
    text: "No", // Initial text for the button
    clicks: 0, // Number of clicks
    hideBehindYes: false, // Whether to hide behind the "Yes" button
    isPeeking: false, // Whether the peeking animation is active
  });

  // Texts for the "No" button
  const noButtonTexts = [
    "Estas segura?",
    "Porque?",
    "Seguro ya tenes planes y con otro más encima...",
    "No me digas eso...",
    "No me hagas sufrir...",
    "Por favor...",
    "No me hagas esto...",
    "Me vas a dejar solo acaso?",
    "Enserio???",
    "De verdad creiste que podías apretar que no?",
    "Poooooooooooooooor????????",
    "Neta?",
  ];

  // Function to move the "No" button
  const moveNoButton = () => {
    const newClicks = noButtonState.clicks + 1;

    if (newClicks == 5) {
      // After 5 clicks, start the peeking animation
      setNoButtonState((prevState) => ({
        ...prevState,
        text: "No", // Set text to "No"
        hideBehindYes: true, // Trigger hiding behavior
        isPeeking: true, // Start the peeking animation
        clicks: newClicks,
      }));

      // Stop the peeking animation after it completes
      setTimeout(() => {
        setNoButtonState((prevState) => ({
          ...prevState,
          hideBehindYes: false, // End
          isPeeking: false, // End the peeking animation
        }));
      }, 4000); // Animation duration (match CSS animation timing)
    } else {
      // Move "No" button dynamically and update text
      setNoButtonState((prevState) => ({
        ...prevState,
        isMoving: true, // Enable movement
        top: Math.random() * 80, // Randomly adjust top position
        left: Math.random() * 80, // Randomly adjust left position
        text: noButtonTexts[Math.floor(Math.random() * noButtonTexts.length)], // Update text
        clicks: newClicks, // Increment click counter
      }));
    }
  };

  // Function to handle "Yes" button click
  const handleYesClick = () => {
    alert("Me alegra mucho! 💖");
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      {/* Outer container representing the device */}
      <div
        style={{
          width: "393px",
          height: "852px",
          backgroundImage: "url('/assets/background.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="relative flex justify-center items-center"
      >
        <Image
          src="/assets/overlay.png"
          alt="Overlay"
          width={393}
          height={852}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4"
        />
        <div
          style={{
            width: "275px",
            height: "700px",
            backgroundImage: "url('/assets/paper.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
        >
          <h1 className="text-2xl font-bold text-center mt-24 mb-8">
            Surprise!!!!!
          </h1>
          <div className="h-64 w-[90%] p-4 bg-black"></div>
          <Image src="/assets/text.png" alt="text" width={275} height={300} />
          {/* Buttons container */}
          <div className="flex flex-row justify-center items-center gap-6 relative w-full">
            {/* Si button with heart icon */}
            <button
              onClick={handleYesClick}
              className="flex flex-col items-center justify-center bg-red-500 text-white font-bold p-4 rounded-full shadow-lg hover:bg-red-600 transition duration-300 z-10"
            >
              <FaHeart className="w-6 h-6 mb-1" /> {/* Heart icon */}
              Si
            </button>
            {/* No button with heart icon */}
            <button
              onClick={moveNoButton}
              style={{
                position:
                  noButtonState.hideBehindYes || noButtonState.isPeeking
                    ? "absolute"
                    : noButtonState.isMoving
                    ? "absolute"
                    : "relative", // Switch based on movement and hiding behavior
                top: noButtonState.hideBehindYes
                  ? "52%" // Slightly behind the "Yes" button
                  : noButtonState.isMoving
                  ? `${noButtonState.top}%`
                  : "initial", // Dynamically adjust top position
                left: noButtonState.isPeeking
                  ? "49%" // Peek slightly to the right
                  : noButtonState.hideBehindYes
                  ? "75%" // Behind the "Yes" button
                  : noButtonState.isMoving
                  ? `${noButtonState.left}%`
                  : "initial", // Dynamically adjust left position
                transform: noButtonState.isMoving
                  ? "translate(-50%, -50%)"
                  : "none", // Center when moving
              }}
              className={`flex flex-col items-center justify-center bg-pink-500 text-white font-bold p-4 rounded-full shadow-lg hover:bg-pink-600 transition duration-300 ${
                noButtonState.isPeeking
                  ? "animate-peek"
                  : noButtonState.hideBehindYes
                  ? "opacity-70 z-0"
                  : "z-10"
              }`}
            >
              <FaHeart className="w-6 h-6 mb-1" /> {/* Heart icon */}
              {noButtonState.text} {/* Dynamic button text */}
            </button>
          </div>
        </div>
      </div>
      {/* Tailwind CSS animation for peeking effect */}
      <style jsx>{`
        @keyframes peek {
          0% {
            left: 49%;
          }
          25% {
            left: 70%; /* Peek to the right */
          }
          50% {
            left: 49%; /* Hide behind Yes */
          }
          100% {
            left: 75%; /* Settle back behind Yes */
          }
        }
        .animate-peek {
          animation: peek 4s ease-in-out;
        }
      `}</style>
    </div>
  );
}
