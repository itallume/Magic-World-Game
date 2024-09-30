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
  const audioIncrementScore = useRef(null)
  const audioGameOver = useRef(null)

  const looseState = () => {
    setLoose((prevState) => !prevState)
  }

  const incrementScore = () => {
    setScore((prevState) => prevState + 1 )
  }

  const startAnimationGame = () => {
    // largatinRef.current.classList.add("villainAnimation")
    // peixinRef.current.classList.add("villainAnimation")
    personRef.current.style.animation = ""
    largatinRef.current.style.animation = "villains-animation 2s infinite linear"
    peixinRef.current.style.animation = "villains-animation 2s 1s infinite linear"
    personRef.current.style.bottom = "0px"
    largatinRef.current.style.left = ""
    peixinRef.current.style.left = ""
  }

  const stopAnimation = (largatinPosition, peixinPosition, personPosition) => {
    personRef.current.style.animation = 'none'
    largatinRef.current.style.animation = 'none'
    peixinRef.current.style.animation = 'none'
    // largatinRef.current.classList.remove("villainAnimation")
    // peixinRef.current.classList.remove("villainAnimation")
    personRef.current.style.bottom = `${personPosition}px`
    largatinRef.current.style.left = `${largatinPosition}px`
    peixinRef.current.style.left = `${peixinPosition}px`
    
  }

  const firstStart = () => {
    audioIncrementScore.current = new Audio("/incrementScoreSound.mp3")
    audioGameOver.current = new Audio("/gameOverSound.mp3")
    setIntroductionMensage(!introductionMensage)
    setStartGame((prevState) => !prevState)
  }

  const playIncrementScore = () => {
    if (audioIncrementScore.current != null){
      audioIncrementScore.current.play()
    }
  }

  const playlooseSound = () => {
    if (audioGameOver.current != null){
      audioGameOver.current.play()
    }
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
        playlooseSound()
        return
      }

      if ((largatinPosition < 0 && (lastScorer == null || lastScorer !== "largatin")) && localGameRunning == true) {
        incrementScore()
        playIncrementScore()
        lastScorer = "largatin"

      }else if ((peixinPosition < 0 && lastScorer !== "peixin") && localGameRunning == true) {
        incrementScore()
        playIncrementScore()
        lastScorer = "peixin"

      }
      
      if (localGameRunning){
        setTimeout(gamingLoop, 50)
      }else{
        return
      }}
      if (StartGame) {
        localGameRunning = true
        startAnimationGame()
        gamingLoop();
      }
  }, [StartGame])

  
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
            <h1>Bem-vindo ao Magic World!</h1>
            <p>O jogo é simples, virá monstrinhos rapidos e raivosos na sua direção, 
              basta pular (usando a tecla `&quot;`Espaço`&quot;`) para se livrar deles (ou não, eles costumam ser insistentes). 
              O jogo acaba quando você esbarrar em um deles. Tome cuidado, eles ficam mais rapidos com tempo. Boa sorte!</p>
          
          </Modal>}

          {loose && <Modal buttonAction={() => restartGame()} buttonText={"Jogar Novamente"}>
            
            <h1>Pontuação final: {score} </h1>
            <p>Você consegue mais! Tente novamente e mostre a eles o quanto melhorou!</p>
          </Modal>}
          
        <Sky/>

        <Image
              id="person"
              src={person}
              alt="person"
              width={180}
              ref={personRef}
              className=""
            />

         <Image
          className="villain"
          src={largatin}
          alt="largatin"
          width={180}
          ref={largatinRef}
        />

        <Image
            className="villain"
            src={peixin}
            alt="peixin"
            width={180}
            ref={peixinRef}
          />
        {StartGame && <div className="scorePanel">{score}</div>}
        
      </div>
      
    </ > 
  ); 
} 
