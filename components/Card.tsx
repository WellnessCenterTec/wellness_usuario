export  const Card = ({title, imgNombre}) =>{

  return(
    <>
    <div className="bg-cover bg-center rounded-3xl bg-blue-900 bg-opacity-50 bg-cover shadow-lg dark:bg-blue-700" style={{ height: 180, backgroundImage: `url(${imgNombre.src})` }}>
          <div className="flex rounded-3xl	items-center justify-center h-full w-full bg-blue-900 bg-opacity-50">
            <div className="text-center">
              <h1 className="text-white mb-5 text-2xl font-semibold uppercase md:text-3xl"> {title} </h1>
              <button type="button"
              className='bg-blue-700 rounded px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-neutral-50'>
                Reservar
              </button>

            </div>
          </div>
        </div>
        
    </>
  )
}

