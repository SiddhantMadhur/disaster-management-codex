import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material'

function NewsBracket(props) {
    return (
        <div>
            <div>
                {props.title}
            </div>
        </div>
    )
}



function AlertPage() {

    const [newsAlerts, setNewsAlerts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getAlerts = async () => {
            const data = await fetch('https://api.reliefweb.int/v1/reports?appname=tecnadisasters&limit=5')
            const data_json = await data.json()
            console.log(data_json.data)
            setNewsAlerts(data_json.data)
            setLoading(false)
            console.log()
        }
        getAlerts()
    }, [])


    return (
        <div>
            <div className='flex flex-col text-left gap-y-3  p-5 rounded-xl'>
                <div className='text-5xl  font-bold text-center bg-white rounded-lg p-10'>
                    Alerts
                </div>
                <div className='bg-white rounded-lg p-5'>
                    <div className='bg-white w-fit mx-auto flex flex-col gap-y-3 '>
                        <h1 className='text-lg font-semibold'>
                            Top 5 News from <a className='text-blue-500 hover:text-blue-700' href="https://reliefweb.int/">ReliefWeb</a>
                        </h1>
                        {
                            newsAlerts.map((doc, key) => (
                                <div key={key}>
                                    {doc.fields.title}
                                </div>
                            ))
                        }

                    </div>
                </div>

                <div className='bg-white rounded-lg'>
                    <h1 className='text-2xl p-5 text-center font-semibold'>
                        Visit site at <a className='text-blue-500 hover:text-blue-700 transition' href="https://disasters.liveuamap.com/">liveuaemap.com</a> 
                    </h1>
                    <iframe className='rounded-lg' src="https://disasters.liveuamap.com/" width={'100%'} height={1000} ></iframe>
                </div>
            </div>
        </div>
    );
}

export default AlertPage;
