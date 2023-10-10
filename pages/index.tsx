import Image from 'next/image'
import { Inter } from 'next/font/google'
import Nav from '@/components/Nav';
import bg from '/Users/alessandrotolentinohernandez/Documents/GitHub/wellness_usuario/assets/Estadio-borregos1920.jpg'
import gym from "/Users/alessandrotolentinohernandez/Documents/GitHub/wellness_usuario/assets/gym.jpeg"
import { Card } from '@/components/Card';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (

    <Nav>
      <div>

<div className="bg-cover bg-center" style= {{ height: 250,backgroundImage: `url(${bg.src})`}}>
    <div className="flex items-center justify-center h-full w-full bg-gray-900 bg-opacity-50">
        <div className="text-center">
            <h1 className="text-white text-2xl font-semibold uppercase md:text-3xl">Welness Center</h1>
            
        </div>
    </div>
</div>



<h1 className='mx-12 mt-10 text-3xl'> <strong> Servicios </strong></h1>




<div className="grid grid-cols-1 gap-3 mx-14 mb-10 mt-5 lg:grid-cols-3 xl:grid-cols-3 " >

    <Card title={"Gimnasio"} imgNombre={gym}></Card>
    <Card title={"Gimnasio"} imgNombre={gym}></Card>

  
</div>

  

  </div>



    </Nav>
    



    
   
  )
}
