import React from 'react';
import { GoPrimitiveDot } from 'react-icons/go';
import { Stacked, Pie, Button, SparkLineChart} from '../components';
import { earningData, SparklineAreaData, ecomPieChartData} from '../data/mock';
import { useStateContext } from '../contexts/ContextProvider';

const Panel = () => {
  return (
    <div className='mt-12'>
      <div className='flex flex-wrap lg:flex-nowrap justify-center'>
        <div className='bg-white dark:text-grey-200
         dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 
         bg-hero-pattern bg-no-repeat bg-cover bg-center'>
          <div className='flex justify-between items-center'>
            <div className='flex m-3 flex-wrap justify-center gap-1 items-center'>
                {earningData.map((item) => (
                  <div key={item.title} className='bg-white dark:text-grey-200 dark:bg-secondary-dark-bg md:w:56 p-4 pt-9 rounded-2xl'>
                    <button style={{ color: item.iconColor, backgroundColor: item.iconBg }} className='text-2xl opacity-0.9 rounded-full p-4'>{item.icon}</button>
                    <p className='mt-3'>
                      <p className='text-lg text-center font-semibold'>
                        {item.amount}
                      </p>
                    </p>
                    <p className='text-sm text-gray-400 mt-1'>{item.title}</p>
                    </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Panel