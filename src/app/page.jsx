'use client'
import Image from "next/image";
import person from "../../public/person.gif"
import largatin from "../../public/largatin.gif"
import peixin from "../../public/peixin.gif"
import Sky from "@/components/Sky"
import { useEffect, useRef, useState } from "react";
import Modal from "@/components/Modal";

export default function Home() {
  const personRef = useRef()
  const largatinRef = useRef()
  const peixinRef = useRef()
  const [running, setRunning] = useState(true)
  const [score, setScore] = useState(0)
  const [StartGame, setStartGame] = useState(false)

  const stopRunning = () => {
    setRunning(false)
    console.log("fui atualizado para: " + running)
  }

  const incrementScore = () => {
    setScore((prevState) => prevState + 1 )
  }

  const stopAnimation = (largatinPosition, peixinPosition, personPosition) => {
    personRef.current.style.animation = "none"
    largatinRef.current.style.animation = "none"
    peixinRef.current.style.animation = "none"
    largatinRef.current.style.left = `${largatinPosition}px`
    peixinRef.current.style.left = `${peixinPosition}px`
    personRef.current.style.bottom = `${personPosition}px`
  }

  useEffect (() => {
    let localGameRunning = true
    let lastScorer = undefined
    const gamingLoop = () =>{
      const largatinPosition = largatinRef.current.offsetLeft;
      const peixinPosition = peixinRef.current.offsetLeft;
      const personPosition = +window.getComputedStyle(personRef.current).bottom.replace("px", "")

      if (((largatinPosition <= 150 && largatinPosition > 0) || (peixinPosition <= 150 && peixinPosition > 0)) && personPosition <= 75){
        stopAnimation(largatinPosition, peixinPosition, personPosition)
        localGameRunning = false
        stopRunning()
        return
      }
      console.log("largatin: " + largatinPosition +", pexin: " + peixinPosition)
      if ((largatinPosition < 0 && (lastScorer == undefined || lastScorer == "peixin")) && localGameRunning == true) {

        incrementScore()
        lastScorer = "largatin"
        console.log("largato + 1")

      }else if ((peixinPosition < 0 && lastScorer == "largatin") && localGameRunning == true) {
        incrementScore()
        lastScorer = "peixin"
        console.log("peixin + 1")
      }

      if (localGameRunning){
        
        setTimeout(gamingLoop, 50)
      }else{
        return
      }}

      if (localGameRunning) {
        gamingLoop();
      }
  }, [])

  

  useEffect(() => {
    

  }, [score])

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

      <div id="gameBoard">
         {!StartGame && <Modal buttonAction={() => setStartGame(!StartGame)} buttonText={"Jogar"}>
            <h1>Vamos Jogar</h1>
          
          </Modal>}

          {!running && <Modal buttonAction={() => setRunning(!running)} buttonText={"Jogar Novamente"}>
            <h1>loose, você pontuou: {score/2} pontos</h1>
          </Modal>}
          
        <Sky/>

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
