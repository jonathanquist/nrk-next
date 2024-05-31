import { Fragment, ReactNode, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export function Modal({
  children,
  action,
  state,
  size = 'lg',
  position,
}: {
  children: ReactNode;
  action: any;
  state: any;
  size?: string;
  position?: string;
}) {
  const getSize = () => {
    switch (size) {
      case 'lg':
        return 'w-full max-w-xl md:max-w-4xl lg:max-w-5xl 2xl:max-w-7xl';
      case 'md':
        return 'w-full max-w-sm md:max-w-lg lg:max-w-xl 2xl:max-w-2xl';
      case 'sm':
        return 'w-64';
      default:
        return 'w-full';
    }
  };
  const getPosition = () => {
    switch (position) {
      case 'bl':
        return 'items-end justify-start translate-x-5 -translate-y-10';
      case 'bm':
        return 'items-end justify-center -translate-y-10';
      case 'br':
        return 'items-end justify-end -translate-x-5 -translate-y-10';
      default:
        return 'items-center justify-center';
    }
  };

  return (
    <Transition appear show={state} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[99]"
        onClose={() => action(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-opacity-25 bg-primary-100" />
        </Transition.Child>

        <div className="fixed inset-0">
          <div className={`flex h-screen py-20 ${getPosition()}`}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`flex flex-col items-center max-h-full bg-primary-300 border-4 border-primary-500 rounded-xl shadow-md ${getSize()}`}
              >
                <div className="relative w-full">{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
