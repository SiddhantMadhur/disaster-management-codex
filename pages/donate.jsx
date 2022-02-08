import React from 'react';
import Link from 'next/link'

const charities = [
    {
        name: 'Red Cross',
        description: 'The International Red Cross and Red Crescent Movement is an international humanitarian movement with approximately 97 million volunteers, members and staff worldwide, which was founded to protect human life and health, to ensure respect for all human beings, and to prevent and alleviate human suffering. Within it there are three distinct organisations that are legally independent from each other, but are united within the movement through common basic principles, objectives, symbols, statutes and governing organisations.',
        href: 'https://www.icrc.org/en'
    },
    {
        name: 'Doctors Without Borders',
        description: 'Médecins Sans Frontières, sometimes rendered in English as Doctors Without Borders, is an international humanitarian medical non-governmental organisation of French origin best known for its projects in conflict zones and in countries affected by endemic diseases.',
        href: 'https://www.doctorswithoutborders.org/'
    },
    {
        name: 'UNICEF',
        description: 'UNICEF, also known as the United Nations Children\'s Fund, is a United Nations agency responsible for providing humanitarian and developmental aid to children worldwide. The agency is among the most widespread and recognizable social welfare organizations in the world, with a presence in 192 countries and territories.',
        href: 'https://www.unicef.org/'
    },
    {
        name: 'The Salvation Army',
        description: 'The Salvation Army is a Protestant Christian church and an international charitable organisation. The organisation reports a worldwide membership of over 1.7 million, consisting of soldiers, officers and adherents collectively known as Salvationists.',
        href: 'http://www.salvationarmy.org/'
    },
    {
        name: 'Direct Relief International',
        description: 'Direct Relief is a nonprofit humanitarian organization that provides emergency medical assistance and disaster relief in the United States and internationally. The organization is headed by an independent board of directors and its president and CEO, Thomas Tighe.',
        href: 'https://www.directrelief.org/'   
    }
]


function CardForCharity(props) {
    const obj = props.obj
    return (
        <Link href={obj.href}>
            <a>
                <div className='bg-white p-5 hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition rounded-lg'>
                    <div className='text-3xl'>
                        {obj.name}
                    </div>
                    <div>
                        {obj.description}
                    </div>
                </div>
            </a>
        </Link>
    )
}

function DonatePage() {
    return (
        <div>
            <div className='flex flex-col justify-center'>
                <div className='bg-white p-5 my-5 rounded-lg'>
                    <h1 className='text-center text-4xl'>
                        Donate to Disaster Reliefs
                    </h1>
                    <p className='text-lg'>
                        Here you can see information about the most reputed charity organizations. Some provide provide opportunities to volunteer as well, all giving a platform to help the ones in need.
                    </p>
                </div>
                <div className='flex flex-col gap-y-3'>
                    {
                        charities.map((doc, key) => (
                            <CardForCharity key={key} obj={doc} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default DonatePage;
