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
  const [loose, setLoose] = useState(false)
  const [score, setScore] = useState(0)
  const [StartGame, setStartGame] = useState(false)
  const [introductionMensage, setIntroductionMensage] = useState(true)

  const looseState = () => {
    setLoose((prevState) => !prevState)
  }

  const incrementScore = () => {
    setScore((prevState) => prevState + 1 )
  }

  const startAnimationGame = () => {
    largatinRef.current.classList.add("villainAnimation")
    peixinRef.current.classList.add("villainAnimation")
    personRef.current.style.bottom = "0px"
    largatinRef.current.style.left = ""
    peixinRef.current.style.left = ""
  }

  const stopAnimation = (largatinPosition, peixinPosition, personPosition) => {
    largatinRef.current.classList.remove("villainAnimation")
    peixinRef.current.classList.remove("villainAnimation")
    personRef.current.style.bottom = `${personPosition}px`
    largatinRef.current.style.left = `${largatinPosition}px`
    peixinRef.current.style.left = `${peixinPosition}px`
    
  }

  const firstStart = () => {
    setIntroductionMensage(!introductionMensage)
    setStartGame((prevState) => !prevState)
  }

  const restartGame = () => {
    
    setStartGame((prevState) => !prevState)
    setLoose((prevState) => !prevState)
    setScore(0)
    
  }

  useEffect (() => {

    let localGameRunning = true
    let lastScorer = null
    const gamingLoop = () =>{
      const largatinPosition = largatinRef.current.offsetLeft;
      const peixinPosition = peixinRef.current.offsetLeft;
      const personPosition = +window.getComputedStyle(personRef.current).bottom.replace("px", "")

      if (((largatinPosition <= 150 && largatinPosition > 0) || (peixinPosition <= 150 && peixinPosition > 0)) && personPosition <= 75){
        stopAnimation(largatinPosition, peixinPosition, personPosition)
        localGameRunning = false
        setStartGame((prevState) => !prevState)
        looseState()
        return
      }

      if ((largatinPosition < 0 && (lastScorer == null || lastScorer !== "largatin")) && localGameRunning == true) {

        incrementScore()
        lastScorer = "largatin"

      }else if ((peixinPosition < 0 && lastScorer !== "peixin") && localGameRunning == true) {
        incrementScore()
        lastScorer = "peixin"

      }
      
      if (localGameRunning){
        setTimeout(gamingLoop, 50)
      }else{
        return
      }}
      console.log("entrei no useEffect: " + StartGame)
      if (StartGame) {
        localGameRunning = true
        startAnimationGame()
        gamingLoop();
      }
  }, [StartGame])

  console.log("startGame: " + StartGame)

  useEffect(() => {
    
    
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

      <div id="gameBoard">
         {introductionMensage && <Modal buttonAction={() => firstStart()} buttonText={"Jogar"}>
            <h1>Vamos Jogar</h1>
          
          </Modal>}

          {loose && <Modal buttonAction={() => restartGame()} buttonText={"Jogar Novamente"}>
            <h1>loose, você pontuou: {score} pontos</h1>
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
        <h1>Seu Score: {score}</h1>
      </div>
      
    </ > 
  ); 
} 
