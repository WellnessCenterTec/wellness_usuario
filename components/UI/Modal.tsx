import { Fragment, useState } from "react";

import { Dialog, Transition } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

export interface ModalProps {
  children: React.ReactNode;
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

export function useModal() {
  const [active, setActive] = useState(false);
  return { active, setActive };
}

export function Modal({ active, setActive, children,className }: ModalProps) {
  return (
    <Transition.Root show={active} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-30 inset-0 overflow-y-auto "
        onClose={() => setActive(false)}
      >
        <div className="flex items-center md:items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 ">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500  bg-opacity-75 transition-opacity" />
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
            <div className={twMerge("inline-block align-bottom bg-white rounded-lg px-4 pt-3 pb-6  shadow-xl transform transition-all sm:align-middle w-full md:w-2/3 lg:w-1/3 sm:p-6",className) }>
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
