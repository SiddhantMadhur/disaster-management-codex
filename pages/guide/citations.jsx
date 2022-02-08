import React from 'react';
import Link from 'next/dist/client/link';

function Citation(props) {


    return (
        <Link href={props.children}>
            <a className='text-gray-600  hover:text-gray-900 transition'>
                {props.children}
            </a>
        </Link>

    )
}


function CitationsPage() {
    return <div className='text-center bg-white flex  py-4 rounded-xl flex-col'>
        <h1 className='text-4xl pb-5'>
            Citations
        </h1>
        <div className='flex flex-col w-fit gap-y-4'>
            <Citation>
                https://www.sciencedirect.com/topics/earth-and-planetary-sciences/natural-disaster#:~:text=Natural%20disasters%20are%20catastrophic%20events,social%20environmental%20disruption%20%5B1%5D.
            </Citation>
            <Citation>
                https://en.wikipedia.org/wiki/Natural_disaster
            </Citation>
            <Citation>
                https://oceanservice.noaa.gov/facts/tsunami.html
            </Citation>
            <Citation>
                https://www.samhsa.gov/find-help/disaster-distress-helpline/disaster-types
            </Citation>
            <Citation>
                https://www.ready.gov/
            </Citation>
            <Citation>
                https://www.givewell.org/
            </Citation>
            <Citation>
                https://disasters.liveuamap.com/
            </Citation>
        </div>

    </div>;
}

export default CitationsPage;
