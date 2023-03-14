import React, { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

export const locationTemp = [
  {
    id: 1,
    name: 'Thessaloniki',
    coordinates:
      'https://api.open-meteo.com/v1/forecast?latitude=40.64&longitude=22.93&hourly=temperature_2m',
  },
  {
    id: 2,
    name: 'Athens',
    coordinates:
    'https://api.open-meteo.com/v1/forecast?latitude=37.98&longitude=23.72&hourly=temperature_2m',
  },
  {
    id: 3,
    name: 'Belgrade',
    coordinates:
      'https://api.open-meteo.com/v1/forecast?latitude=44.81&longitude=20.46&hourly=temperature_2m',
  },
  {
    id: 4,
    name: 'Skopje',
    coordinates:
      'https://api.open-meteo.com/v1/forecast?latitude=41.99&longitude=21.42&hourly=temperature_2m',
  }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function LocationsList({selectedTemp, setSelectedTemp}) {
  return (
    <Listbox value={selectedTemp} onChange={(value) => {
      setSelectedTemp(value);
      localStorage.setItem('selectedTemperature', JSON.stringify(value));
  }}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-gray-700">Choose a city</Listbox.Label>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
              <span className="flex items-center">
                <span className="ml-3 block truncate">{selectedTemp.name}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {locationTemp.map((city) => (
                  <Listbox.Option
                    key={city.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={city}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                          >
                            {city.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}