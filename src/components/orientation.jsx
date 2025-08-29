import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, time } from 'motion/react'
import { IoMdClose } from 'react-icons/io'
import { useParams } from 'react-router-dom'
// import { Link } from 'react-router-dom'
// import { InstagramEmbed } from 'react-social-media-embed'
import LightRays from './LightRay'
import { BsFacebook } from 'react-icons/bs'
import { AiOutlineLinkedin } from 'react-icons/ai'
import { BsInstagram } from 'react-icons/bs'
import { FaXTwitter } from 'react-icons/fa6'

import WobbleScratchCard from './ScratchCard'
import { StartupCard } from './StartupCard'
import NumberFlow, { NumberFlowGroup } from '@number-flow/react'


export default function Home() {
  const [timer, setTimer] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  })
  const [showCountdown, setShowCountdown] = useState(true)
  const [showScratchCard,setShowScratchCard] = useState(true)
  const [scratchComplete,setScratchComplete] = useState(false)
  const { startupId, role } = useParams()
  console.log(startupId,role)
  const isMobile = window.innerWidth < 600

  const endScratch = () => {
    setTimeout(() => {
      setShowScratchCard(false)
    }, 2000)
  }
  useEffect(() => {
    if (scratchComplete) {
      endScratch()
    }

  }, [scratchComplete])

  const ref = useRef()

  const eventDate = new Date('2025-09-08T17:00:00')
  console.log(Date.parse(new Date()))
  function getTimeRemaining(endTime) {
    const total = Date.parse(endTime) - Date.parse(new Date())
    return {
      total,
      days: Math.floor(total / (1000 * 60 * 60 * 24)),
      hours: Math.floor((total / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((total / (1000 * 60)) % 60),
      seconds: Math.floor((total / 1000) % 60),
    }
  }

  function startTimer(endTime) {
    const { total, days, hours, minutes, seconds } = getTimeRemaining(endTime)

    if (total >= 0) {
      setTimer({
        days: days.toString().padStart(2, '0'),
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0'),
      })
    } else {
      clearInterval(ref.current)
    }
  }

  useEffect(() => {
    ref.current = setInterval(() => startTimer(eventDate), 1000)
    return () => clearInterval(ref.current)
  }, [])

  useEffect(() => {
    if (showScratchCard) {
      // Lock scroll
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed' // optional for mobile
      document.body.style.width = '100%' // prevents layout shift
    } else {
      // Unlock scroll
      document.body.style.overflow = 'auto'
      document.body.style.position = ''
      document.body.style.width = ''
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'auto'
      document.body.style.position = ''
      document.body.style.width = ''
    }
  }, [showScratchCard])

  const handleScroll = (event) => {
    const container = event.target
    const scrollAmount = event.deltaY
    container.scrollTo({
      top: 0,
      left: container.scrollLeft + scrollAmount,
      behavior: 'smooth',
    })
  }

  return (
    <div className="relative w-full overflow-hidden">
      {/* Content Container */}
      <AnimatePresence>
        {showScratchCard && (
          <motion.div
            className="fixed h-screen inset-0 z-[1000] bg-black/60 backdrop-blur-md flex items-center justify-center "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            {/* Background Light Rays */}
            <LightRays
              raysOrigin="top-center"
              raysColor="#00ffff"
              raysSpeed={1.5}
              lightSpread={0.8}
              rayLength={isMobile ? 4 : 2}
              followMouse={true}
              mouseInfluence={0.1}
              fadeDistance={isMobile ? 2.0 : 1.0}
              noiseAmount={0}
              distortion={0}
              className="custom-rays"
            />
            {/* Centered Scratch Card */}
            <div className="absolute flex items-center justify-center">
              {/* Text behind the scratch card */}

              {/* Scratch Card */}
              <AnimatePresence>
                {!scratchComplete ? (
                  <motion.div
                    key="scratch-card"
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.8 }}
                  >
                    <WobbleScratchCard
                      width={300}
                      height={450}
                      coverImage="/scratchCard.png"
                      onComplete={() => setScratchComplete(true)}
                    >
                      <motion.h1
                        className="absolute text-white h-full w-full flex items-center justify-center b  text-xl font-bold z-0 rounded-xl"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <StartupCard
                          startupName={startupList[startupId]}
                          role={roles[role]}
                        />
                      </motion.h1>
                    </WobbleScratchCard>
                  </motion.div>
                ) : (
                  <motion.h1
                    layoutId="card"
                    id="card"
                    className="absolute text-white h-[450px] w-[300px]  flex flex-col items-center justify-center  text-xl font-bold z-0 rounded-xl shadow-[6px_1px_100px_70px_#4a5568]"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <StartupCard
                      startupName={startupList[startupId]}
                      role={roles[role]}
                    />
                  </motion.h1>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative w-full min-h-[80vh] flex flex-col items-center justify-center gap-1">
        <div className="flex flex-col items-center justify-around gap-8 md:gap-28 py-4">
          <div className="flex flex-col items-center gap-2">
            <img src="/Ecelllogo.png" width="120" height="120" />
            <p className="text-sm text-gray-300">presents</p>
          </div>
          <div className="flex flex-col justify-evenly text-white">
            <h1 className="text-7xl sm:text-6xl md:text-8xl font-bold font-bg bg-gradient-to-r from-violet-900 via-violet-800 to-violet-900 bg-clip-text text-transparent">
              E-NSPIRE
            </h1>
            {startupId && startupList[startupId] && (
              <motion.div
                className="flex justify-center items-center my-10"
                animate={{
                  x: [0, 10, -10, 5, 0],
                  y: [0, -10, 10, -5, 0],
                  rotate: [0, 2, -2, 1, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'easeInOut',
                }}
              >
                <motion.div
                  layoutId="card"
                  className="w-72 sm:w-80 md:w-96  rounded-3xl shadow-lg"
                >
                  <StartupCard
                    startupName={startupList[startupId]}
                    role={roles[role]}
                  />
                </motion.div>
              </motion.div>
            )}
          </div>
          {/* Countdown Timer Card */}
          <AnimatePresence>
            {showCountdown && (
              <motion.div
                initial={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5, y: -50, rotate: 45 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="w-[92%] max-w-[500px] px-2 sm:px-0"
              >
                <div className="grid grid-cols-4 gap-1 sm:gap-1.5 md:gap-3 mb-5">
                  <NumberFlowGroup>
                    {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
                      <motion.div
                        key={unit}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.5,
                          type: 'spring',
                          stiffness: 200,
                        }}
                        className="relative p-2 flex flex-col items-center p-1 sm:p-2 md:p-3 bg-white/10 rounded-xl shadow-xl backdrop-blur-md"
                      >
                        <div
                          style={{
                            fontVariantNumeric: 'tabular-nums',
                            '--number-flow-char-height': '0.85em',
                          }}
                          className=" text-3xl text-slate-100 flex items-baseline font-semibold"
                        >
                          <NumberFlow
                            trend={-1}
                            value={timer[unit]}
                            format={{ minimumIntegerDigits: 2 }}
                          />
                        </div>
                        <span className="text-[10px] sm:text-xs md:text-sm text-gray-300 uppercase mt-1">
                          {unit}
                        </span>
                      </motion.div>
                    ))}
                  </NumberFlowGroup>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <p className="text-gray-300 text-sm md:text-base mt-2">
          SEPTEMBER 8 @ Sir Visveswaraya Auditorium
        </p>

        <div className="social-iicons mt-4 gap-3 flex justify-center items-center text-white">
          <motion.a
            whileHover={{ y: -5 }}
            href="https://twitter.com/ecellvssut?lang=en"
            className="twitter flex items-center justify-center "
          >
            <FaXTwitter style={{ fontSize: '1em' }} e></FaXTwitter>
          </motion.a>
          <motion.a
            whileHover={{ y: -5 }}
            href="https://www.facebook.com/ecellvssut/"
            className="facebook flex items-center justify-center"
          >
            <BsFacebook style={{ fontSize: '1em' }}></BsFacebook>
          </motion.a>
          <motion.a
            whileHover={{ y: -5 }}
            href="https://www.instagram.com/ecellvssut/?hl=en"
            className="instagram flex items-center justify-center"
          >
            <BsInstagram style={{ fontSize: '1em' }}></BsInstagram>
          </motion.a>
          <motion.a
            whileHover={{ y: -5 }}
            href="https://in.linkedin.com/company/ecellvssut"
            className="linkedin flex items-center justify-center"
          >
            <AiOutlineLinkedin style={{ fontSize: '1em' }}></AiOutlineLinkedin>
          </motion.a>
        </div>
      </div>

      <div className="relative flex flex-col items-center">
        <div className="absolute bg-gray-100 w-[150vw] h-[25vh] md:h-[30vh] top-[-20px] left-[-10px] md:left-[-20px] z-[-2] rotate-[-5deg] md:rotate-[-3deg]"></div>
        <h1 className="text-4xl md:text-6xl font-bold text-slate-200 text-center pt-4 md:pt-10">
          E-CELL
        </h1>
        <h1 className="text-2xl font-semibold text-gray-500 text-center italic">
          A Techno-Management Club
        </h1>
      </div>

      {/* <div className="relative h-[20vh] mb-[20vh]">
        <div className="absolute bg-violet-500 w-[150vw] h-[45vh] md:h-[50vh] top-[18px] left-[-20px] md:left-[-20px] rotate-[-5deg] md:rotate-[-3deg]"></div>
        <div className="relative top-10 text-white flex flex-col items-center">
          <h1 className="text-2xl md:text-3xl font-bold uppercase text-center pt-4 md:pt-16">
            Startup Quest
          </h1>
          <p className="text-gray-300 italic text-lg text-center">
            Upcoming event...
          </p>
          <ul className="mt-4 text-sm w-[90vw] md:w-[40vw] md:text-lg list-inside">
            {[
              'Scan the QR Code',
              'Get your chosen Startup',
              'Find the 2 other people having the same Startup name',
              'Post your group selfie on Instagram & tag @ecellvssut',
            ].map((it) => (
              <li className="bg-violet-600 m-2 p-2 rounded-lg">{it}</li>
            ))}
          </ul>
        </div>
      </div> */}
    </div>
  )
}

const startupList = {
  'c23c097e-7462-457c-8faa-57db3bed38fc': 'Homevery',
  '3fbbfb11-64e2-48b1-a2ee-acd42b8addbe': 'IG Drones',
  'e14476e6-0bbb-4c7a-b2be-17403d3a01f4': 'Walking Pal',
  '1e72599e-2c4c-429e-b1cf-828e7d47f2c6': 'Navonmesh Prashar Foundation',
  '121a2980-b1e3-4ca6-a69e-38bc0317ccac': 'FurSphere',
  'b587e1c9-a1d0-445d-91ce-015142ab1c54': 'Lancyfirm',
  'acc84520-f887-478a-8ff4-381e01a8ca51': 'SEW',
  'f1caefe4-f376-48ed-945f-99b608436417': 'FxUAV',
  'f25b124b-281c-48b2-95f8-19fb4eac5eae': 'Tourev',
  'dabb80c5-fa67-48b9-b752-12f47a35a37f': 'Droove',
  '057d9201-298d-4d28-9f6d-d3a7246f1072': 'GoHiking',
  '222069f6-3248-4667-a084-11d71417a0f7': 'Servicescape',
  '48e707ff-8b3f-48b6-924a-62d9f4ace5d6': 'Graphixi',
  'b5c57b95-f445-4aa1-af94-750d20ba8a2e': 'CosmoInfinitas',
  'b3c193d6-6048-439b-9c53-92885b5bf10f': 'Wasper',
  '406ed7aa-34d1-41e1-a428-e5064d31d3c6': 'Earthly Eats',
  '842fc77f-7a63-4d5c-b3f2-5025a68cd164': 'HycreD',
  '99f0f66e-4677-41ac-b249-366d831cc6ab': 'Crafted Threads',
  'f8904d28-78ed-4916-8644-0ec4f2be71d4': 'Expandify',
  '99183c72-c602-475d-92d5-a2c12e2cfb8d': 'Mindlink',
  '23195d57-a1c0-4dcd-a05f-a71028de7227': 'DeepSeek',
  'eaae39b8-64dc-4bf6-b6a4-40a58fe9c348': 'Moonshot AI',
  'd94d092f-a2ef-464a-a0dc-24930a3f30f8': 'MiniMax',
  'c26050e0-5d83-4daf-b103-16881617a12e': 'Zhipu',
  '2e93f99d-ce2b-411c-b0f7-df9a38981cb7': 'Overstory',
  'f7cb56be-d450-4de3-9283-eb3022459eb1': 'Coolgradient',
  '9bf94aa8-bb13-4c57-82b2-8af8693e1ab5': 'Monumental',
  '36b49c78-e94a-44ef-87d0-c31fe8b521c4': 'Weaviate',
  'a985e951-c437-4c60-aa7f-5cd37783183e': 'Cradle',
  'f685ec4b-d9dc-4dc3-a43c-b437c881438d': 'Carbon Equity',
  '3a4a8824-66b0-45da-ae63-a7f405b7be41': 'Mistral AI',
  '5967222c-603a-4c8e-b2dc-68d61bfee579': 'Anthropic',
  'd52c3d19-baf7-4612-881e-9a016c960e23': 'Hugging Face',
  '659af8ba-72e2-4d1e-9bf3-8040fc2a5254': 'Cohere',
  'f80b17ae-c072-4082-a927-c4a1340fcabc': 'Stability AI',
  'c29a9410-e8ec-46c5-ad9b-07bea3fdb66b': 'Perplexity AI',
  'bb9bf884-7d6e-43ab-ba0c-4b66fed1cc31': 'Inflection AI',
  'd4d70b60-e3ec-4d53-b438-e51e02d1a86e': 'ElevenLabs',
  '271ecc99-88d9-4e46-a92f-39f380c537a6': 'Character AI',
  'ea48dd89-920a-4586-a8ea-7b04898f2b14': 'Kyutai',
  'fda6d89c-7973-4ca1-a370-6f70c6d0fd1b': 'Aleph Alpha',
  '6c36fdf8-52f8-4ab4-a99a-3f9d4b441d14': 'Reka AI',
  '0486727d-6e2a-465e-bc9b-0fbddc7700c1': 'Gretel AI',
  'e9f804b2-98d7-4cc4-acf1-b26fd0549772': 'Synthesia',
  'ed17c68a-bb1c-4c28-8364-b838a0b77cb1': 'Runway',
  '1af75349-da14-4dee-b8f0-02ae20ed074c': 'Replit',
  '58a40a57-66b9-4e3f-9d22-5aa9804ab7bd': 'Jasper AI',
  'c5e0008d-d4c4-44ac-80e1-1d24648c3461': 'Typeface',
  'c3ce034b-ba8b-4f89-8b31-a7bbcfd96077': 'Adept AI',
  'beef076c-bc27-4b49-b328-aa8f6bb6b141': 'Fixie AI',
  '3a49a1d0-330d-4364-ab12-a76c7a3c51b7': 'Scale AI',
  '022a12e9-a214-4ea9-9fdf-299a040c995c': 'clubz.fm Face',
  '578e16bc-b193-4151-a51d-1ddf18f0937a': 'Luma AI',
  'ca089da9-06f2-467a-8b2c-5af2260ab6a7': 'Standard AI',
  'cef426b5-3b14-42ac-85de-f72356588081': 'Orbital Insight',
  '7b43e1de-7bc6-4118-9cb1-a0b2d85ed8f9': 'Shield AI',
  '8bb08e0c-af81-4c6c-8de0-8317acdab94e': 'Waabi',
  'f415b903-6f47-47fe-86ab-d3064323fbf4': 'Figure AI',
  '4408964b-9ed9-4f1a-8dcd-6497e4d55626': 'Sanctuary AI',
  'f5d19217-a5fb-4626-a98f-ef8962311368': 'OpenAI',
  '54d51ba5-f25f-49cc-a960-7922c2a1c675': 'Ola',
  '348779b8-35dd-4e4c-8bfc-d30deb12c29b': 'DataRobot',
  'da0b2b79-6622-46cf-aa9b-db1aa6a5bae2': 'SambaNova Systems',
  '090a75a7-dae6-41d2-a74b-c15f9184dac3': 'Seldon',
  'be2b1d11-c3ef-4f07-a0b5-a7a5926b9562': 'V7 Labs',
  '51d6f4e6-0b93-4f1a-b085-a7a29833fa82': 'Amazon',
  '01bcbf37-67b3-4ada-9b74-409c86569651': 'Dataiku',
  'cdb9df9e-283f-412c-8f15-7d00137d0949': 'H2O.ai',
  '86514f0a-67a4-4494-903e-2ba5818eba31': 'Snorkel AI',
  'f3db04e0-47bd-40a1-bcd9-dcedab3f184a': 'DataRobot',
  '5529e109-7aff-43c8-a81a-73b775f0005b': 'MindsDB',
  'ead01d98-bcbb-4843-ac15-d9d78b79cac0': 'Lightmatter',
  'aa263eef-4398-4a6b-a431-ccd6c79853c2': 'Graphcore',
  'ca71ebe7-0f9b-4d66-a5ce-1afd95940f76': 'Mythic AI',
  'a5b75f42-67b6-4b8a-b6dc-db243444f03a': 'Celestial AI',
  'b38c8317-9e7c-48d4-9b2d-017c5b3c3c24': 'Groq',
  'fa484b6e-c784-4a31-9ff2-e99a0bea5940': 'SiMa.ai',
  '9e124042-2698-4f20-86fd-9536ead9cefb': 'Rain Neuromorphics',
  'c91871a6-1229-4ea0-be93-f1c5bab0adb3': 'SambaNova Systems',
  '78685d46-3135-4ec9-ac16-51ebf295e21a': 'Neural Magic',
  'fe149412-785f-46a1-ab81-c73a33ffeeff': 'Glean',
  '79ab706b-287c-4cf5-92c4-4757725dc0ed': 'Elicit',
  'e325e891-cace-47f4-bbca-ea5a7d1a499c': 'Vectara',
  '34d4e24a-a100-49c1-b8d9-57833e005db4': 'Cohere',
  '10b376eb-9bb3-43fc-b0bb-a02292d7d357': 'Pinecone',
  'ea237a4a-3788-4041-adb2-b8f01e281b04': 'Weaviate',
  'd7d17d1d-9368-4be2-b4ef-db431b66ace5': 'LanceDB',
  '6d53058c-9c55-4cf0-9db2-e3fee42ea92e': 'Qdrant',
  '9c15ce8d-f145-4f97-8023-e8f65a74a8df': 'Zilliz',
  '8ec7ccd8-602a-408b-8201-007791d759c5': 'Milvus',
  'cdb99b5b-059e-4c95-9e56-ae2a73df0129': 'Together AI',
  '5e2add98-2a53-4901-89ba-730fc80a1eb9': 'Modular AI',
  'a21454f3-78d2-4952-8eb6-5a128ace54cd': 'Prefect',
  '37b9cd29-2481-43a4-9994-968acc025829': 'WhyLabs',
  '2906e6a3-52cb-402a-bd51-121407d7e29b': 'Truera',
  '10973343-1399-4cf8-ac4b-d7c5d7d3fc25': 'Tonic.ai',
  '087ae08c-6467-471f-9e92-aedf8039663d': 'Gretel.ai',
  'dbd9d3ac-6f64-46db-be61-dd89e70279fc': 'Mostly AI',
}

const roles = {
  'x9f2a': 'CEO',
  'k3b1p': 'CTO',
  'q7m9d': 'COO',
  'h2z8l': 'CFO',
  'p5y4t': 'CMO',
}
