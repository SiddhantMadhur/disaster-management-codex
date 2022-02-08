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
            const data = await fetch('https://api.reliefweb.int/v1/reports?appname=tecnadisasters&limit=10')
            const data_json = await data.json()
            console.log(data_json.data)
            setNewsAlerts(data_json.data)
            setLoading(false)
            console.log()
        }

    }, [])


    return (
        <div>
            <div>
                <div className='text-5xl text-center bg-white rounded-lg p-10'>
                    Alerts
                </div>
                <div>

                    {
                        newsAlerts.map((doc) => (
                            <p>
                                {doc.fields.title}
                            </p>
                        ))
                    }

                </div>
            </div>
        </div>
    );
}

export default AlertPage;
