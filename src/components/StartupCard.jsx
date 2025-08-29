import { BiRocket } from 'react-icons/bi'
import { FiZap } from 'react-icons/fi'
import { GiLightBulb } from 'react-icons/gi'

export const StartupCard = ({ startupName, role, className = '' }) => {
  console.log(startupName, role)
  return (
    <div
      className={`relative w-[300px] h-[450px] rounded-2xl bg-gradient-to-br from-violet-600 to-violet-500 shadow-[0_10px_30px_-10px_rgba(262,83%,58%,0.3)] hover:shadow-[0_20px_40px_-10px_rgba(262,83%,58%,0.4)] transition-all duration-300 overflow-hidden ${className}`}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-8 right-8 w-16 h-16 rounded-full bg-[hsl(0,0%,100%)]"></div>
        <div className="absolute bottom-12 left-6 w-8 h-8 rounded-full bg-[hsl(0,0%,100%)] "></div>
        <div className="absolute top-1/3 left-4 w-12 h-12 rounded-full bg-[hsl(0,0%,100%)]  "></div>
        <div className="absolute bottom-1/4 right-12 w-6 h-6 rounded-full bg-[hsl(0,0%,100%)]  "></div>
      </div>

      {/* Geometric shapes */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-32 h-32 border border-[hsl(0,0%,100%)] rounded-lg rotate-12"></div>
        <div className="absolute bottom-20 right-6 w-20 h-20 border border-[hsl(0,0%,100%)] rounded-full"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center">
        {/* Top Icon */}
        <div className="mb-8 relative">
          <div className="flex items-center justify-center space-x-2 opacity-80">
            <BiRocket className="w-6 h-6 text-[hsl(0,0%,100%)] " />
            <GiLightBulb className="w-5 h-5 text-[hsl(31,100%,65%)] " />
            <FiZap className="w-5 h-5 text-[hsl(0,0%,100%)]" />
          </div>
        </div>

        {/* Startup Name */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[hsl(0,0%,100%)] leading-tight tracking-tight">
            Startup : <br />
            <span
              className="font-bold 
  bg-[linear-gradient(to_right,#2C5364,#203A43,#0F2027)] 
  bg-clip-text text-transparent"
            >
              {startupName}
            </span>
          </h1>
        </div>

        {/* Role */}
        <div className="mb-8 flex justify-center">
          <p
            className="
                px-15 py-3                
                text-xl font-bold        
                text-white          
                bg-amber-500     
                rounded-full                   
                text-center
  "
          >
            {role}
          </p>
        </div>

        {/* Bottom decorative element */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-16 h-1 bg-gray-300 rounded-full opacity-60"></div>
        </div>
      </div>

      {/* Subtle border highlight */}
      <div className="absolute inset-0 rounded-2xl border border-gray-300/20 pointer-events-none"></div>
    </div>
  )
}
