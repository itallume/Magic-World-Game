'use client'
import Image from "next/image";
import person from "../../public/person.gif"
import largatin from "../../public/largatin.gif"
import cloud from "../../public/cloud.png"
import cloud2 from "../../public/cloud2.png"
import cloud3 from "../../public/cloud3.png"
import cloud4 from "../../public/cloud4.png"
import peixin from "../../public/peixin.gif"
import star1 from "../../public/star1.png"
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const personRef = useRef()
  const largatinRef = useRef()
  const peixinRef = useRef()
  const [running, setRunning] = useState(true)

  const stopRunning = () => {
    setRunning(false)
    console.log(running)
  }

  useEffect (() => {
    const gamingLoop = () =>{
      const largatinPosition = largatinRef.current.offsetLeft;
      const peixinPosition = peixinRef.current.offsetLeft;
      const personPosition = +window.getComputedStyle(personRef.current).bottom.replace("px", "")
      
      if (((largatinPosition <= 150 && largatinPosition > 0) || (peixinPosition <= 150 && peixinPosition > 0)) && personPosition <= 75){
        personRef.current.style.animation = "none"
        largatinRef.current.style.animation = "none"
        peixinRef.current.style.animation = "none"
        largatinRef.current.style.left = `${largatinPosition}px`
        peixinRef.current.style.left = `${peixinPosition}px`
        console.log(personPosition)
        personRef.current.style.bottom = `${personPosition}px`
        
        stopRunning()
        return
      }
      setTimeout(gamingLoop, 2 )}
    gamingLoop();

  }, [])

  useEffect(() =>{
    window.addEventListener('keydown', jump)

    return () => {
      window.removeEventListener('keydown', jump)
    }
  }, [])

  const jump = event => {
    if (event.key == " ") {
      const personImg = personRef.current 
      personImg.classList.add('jump')

      setTimeout(() => {

        personImg.classList.remove('jump')

      }, 500)
      

    }
  }

  return (
    <>
      <div id="piso">

        <Image
              src={star1}
              alt="Next.js Logo"
              className=" star1"
            />
        <Image
              src={cloud}
              alt="Next.js Logo"
              className="clouds cloud1"
            />

        <Image
              src={cloud2}
              alt="Next.js Logo"
              className="clouds cloud2"
            />
        <Image
              src={star1}
              alt="Next.js Logo"
              className=" star2"
            />
        <Image
              src={cloud3}
              alt="Next.js Logo"
              className="clouds cloud3"
            />

        <Image
          src={cloud4}
          alt="Next.js Logo"
          className="clouds cloud4"
        />
        <Image
              src={star1}
              alt="Next.js Logo"
              className=" star3"
            />
        <Image
              src={cloud3}
              alt="Next.js Logo"
              className="clouds cloud3"
            />

        <Image
              src={star1}
              alt="Next.js Logo"
              className=" star4"
            />

        <Image
              id="person"
              src={person}
              alt="Next.js Logo"
              width={180}
              ref={personRef}
              className=""
            />

         <Image
          className="villain"
          src={largatin}
          alt="Next.js Logo"
          width={180}
          style={"animation-delay: 1s"}
          ref={largatinRef}
        />

        <Image
            className="villain delayOneSec"
            src={peixin}
            alt="Next.js Logo"
            width={180}
            ref={peixinRef}
          />
      </div>
      
    </ > 
  ); 
} 
