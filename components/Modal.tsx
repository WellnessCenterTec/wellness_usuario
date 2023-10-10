import { Fragment, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { RootState } from "@/redux/store";
import { toggleModalEjemplo } from "@/redux/slices/modalSlice";
import {Switch} from "@nextui-org/react";


export default function Modal() {

    const {modalEjemplo} = useSelector((state:RootState)=>state.modal)
    const dispatch = useDispatch();

return (
     <Transition.Root show={modalEjemplo} as={Fragment}>
       <Dialog
         as="div"
         className="fixed z-50 inset-0 overflow-y-auto "
         onClose={()=>{
             dispatch(toggleModalEjemplo())
         }}
       >
         <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 ">
           <Transition.Child
             as={Fragment}
             enter="ease-out duration-300"
             enterFrom="opacity-0"
             enterTo="opacity-100"
             leave="ease-in duration-200"
             leaveFrom="opacity-100"
             leaveTo="opacity-0"
           >
             <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
           </Transition.Child>
 
           {/* This element is to trick the browser into centering the modal contents. */}
           <span
             className="hidden sm:inline-block sm:align-middle sm:h-screen"
             aria-hidden="true"
           >
             &#8203;
           </span>
 
           <Transition.Child
             as={Fragment}
             enter="ease-out duration-300"
             enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
             enterTo="opacity-100 translate-y-0 sm:scale-100"
             leave="ease-in duration-200"
             leaveFrom="opacity-100 translate-y-0 sm:scale-100"
             leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
           >
             <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-3 pb-6 overflow-hidden shadow-xl transform transition-all sm:align-middle w-full md:w-2/3 lg:w-1/3 sm:p-6">
               <div className="">
                 <Dialog.Title
                   as="h3"
                   className="text-3xl leading-6 text-gray-900 font-bold"
                 >
                 Crear de anuncio
                 </Dialog.Title>
                 <div className="my-3 text-center">

                {/* Formulario */}
                
                <form className="bg-white rounded px-8 pt-6 pb-8 mb-4">

                    {/* Titulo */}
                    <div className="mb-4">
                    <label className="block text-blue-700 text-2xl font-bold mb-2 ">
                        Titulo
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Titulo del anuncio"/>
                    </div>


                    {/* Fechas de inicio y fin del evento*/}
                    <div className=" grid grid-cols-2 gap-4 mb-4">

                        <div>
                            <label className="block text-blue-700 text-2xl font-bold mb-2">
                                Inicio
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="date" placeholder="Titulo del anuncio"/>
                        </div>

                        <div>
                            <label className="block text-blue-700 text-2xl font-bold mb-2">
                                Fin
                            </label>

                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="date" placeholder="Titulo del anuncio"/>
                        </div>

                    </div>

                    {/* Imagen y ubicación */}
                    <div className=" grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-blue-700 text-2xl font-bold mb-2">
                                Imagen
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="file" placeholder="Adjuntar imagen"/>
                        </div>
                        
                        <div>
                            <label className="block text-blue-700 text-2xl font-bold mb-2">
                                Fin
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Ubicación"/>
                        </div>
                    </div>

                    {/* Descripción */}
                    <div className="mb-4">
                    <label className="block text-blue-700 text-2xl font-bold mb-2 ">
                        Descripción 
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-20 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Descripción del anuncio"/>
                    </div>

                    {/* Fechas de inicio y fin del evento*/}
                    <div className=" grid grid-cols-2 gap-4 mb-4">

                        <div>
                            <label className="block text-blue-700 text-2xl font-bold mb-2">
                                Inicio anuncio
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="date" placeholder="Titulo del anuncio"/>
                        </div>

                        <div>
                            <label className="block text-blue-700 text-2xl font-bold mb-2">
                                Fin anuncio
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="date" placeholder="Titulo del anuncio"/>
                        </div>

                    </div>

                    <div className="mb-4">
                    
                            <label className="block text-blue-700 text-2xl font-bold mb-2">
                                Notificar por correo
                            </label>

                            <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer"/>
                            <div className="w-11 h-6 bg-white-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            
                            </label>
                    </div>

                
                    {/* Botones */}
                    <button
                        type="button"
                        className="bg-slate-700 text-slate-100 font-bold rounded-md px-3 py-2 mt-3 hover:bg-slate-800"
                        onClick={() => {
                        dispatch(toggleModalEjemplo())
                            }}
                            >
                        Cancelar
                    </button>
                    
                    <button
                    type="button"
                    className="bg-blue-700 text-slate-100 font-bold rounded-md px-3 py-2 mt-3  ml-2 hover:bg-slate-800"
                    onClick={() => {
                        dispatch(toggleModalEjemplo())
                    }}
                    >
                        Crear anuncio
                    </button>
                </form>


                 </div>
               </div>
             </div>
           </Transition.Child>
         </div>
       </Dialog>
     </Transition.Root>
   );
 }