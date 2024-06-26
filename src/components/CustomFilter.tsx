'use client'
import { CustomFilterProps } from '@/types'
import { Fragment, useState } from 'react'
import Image from 'next/image'
import { Listbox, Transition } from '@headlessui/react'
import { useRouter } from 'next/navigation'

export default function CustomFilter<T>({ options, setFilter }: CustomFilterProps<T>) {
    const router = useRouter();
    const [selected, setSelected] = useState(options[0]);

    //For server side rendering
    // const handleUpdateParams = (e: { title: string, value: string }) => {
    //     const newPathname = updateSearchParams(e.title.toLowerCase(), e.value.toLowerCase());
    //     router.push(newPathname);
    // }



    return (
        <div className='w-fit'>
            <Listbox
                value={selected}
                onChange={(e) => { setSelected(e); setFilter(e.value as unknown as T) }}
            >
                <div className='relative w-fit z-10'>
                    <Listbox.Button className='custom-filter__btn'>
                        <span className='block truncate'>{selected.title}</span>
                        <Image
                            src="/chevron-up-down.svg"
                            width={20}
                            height={20}
                            alt="up down"
                            className='ml-4 object-contain'
                        />
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave='transition ease-in duration-100'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'

                    >
                        <Listbox.Options className="custom-filter__options">
                            {
                                options.map((ele) => (
                                    <Listbox.Option
                                        key={ele.title}
                                        value={ele}
                                        //listbox options helps to show the active option in the class when we call a callback function inside it
                                        className={({ active }) => `relative cursor-default select-none py-2 px-4 ${active ? 'bg-primary-blue text-white' : "text-gray-900 "}`}
                                    >
                                        {({ selected }) => (
                                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                {ele.title}
                                            </span>
                                        )}
                                    </Listbox.Option>
                                ))
                            }
                        </Listbox.Options>

                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}
