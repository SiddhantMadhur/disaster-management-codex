import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react"
import { supabase } from "../../server/supabaseConfig"
import Link from "next/link";
import { data } from "autoprefixer";
import Head from "next/head";
import MyModal from "../../components/modal";


function AddInfo() {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [location, setLocation] = useState('Unspecified location');

    const user = supabase.auth.user();
    const username = user.user_metadata.username;

    

    const postDiscussion = async () => {
        setLoading(true)
        setTitle('')
        setContent('')
        setLocation('Unspecified location')
        const { data, error } = await supabase.from('forum').insert([
            {
                author_id: user.id,
                author_name: username,
                heading: title,
                content: content,
                location: location
            }
        ])
        setLoading(false)
        console.warn(error)
    }



    return (
        <div className="text-center flex flex-col justify-center bg-white py-5 rounded-xl ">
            <h1 className="text-2xl my-2">
                Create Discussion
            </h1>
            <input value={title} onChange={e => setTitle(e.target.value)} type="text" placeholder="Title*" className='bg-gray-50 p-1  m-2 border-2 border-black rounded-lg md:mx-10' />
            <textarea value={content} onChange={e => setContent(e.target.value)} rows={4} type="text" placeholder="Content*" className='bg-gray-50 p-1  m-2 border-2 border-black rounded-lg md:mx-10' />
            <input value={location==='Unspecified location'?null:location} onChange={e => setLocation(e.target.value)} type="text" placeholder="Location (Optional)" className='bg-gray-50 p-1  m-2 border-2 border-black rounded-lg md:mx-10' />

            <div className='bg-gray-50 p-1 text-left m-2 border-2 border-black rounded-lg md:mx-10'>
                Author: {user.user_metadata.username}
            </div>
            <button onClick={postDiscussion} className="bg-gray-700 text-gray-50 border-2 border-black rounded-lg md:mx-10 m-2 h-12 text-xl hover:bg-gray-900 hover:text-gray-200 transition">
                {
                    loading ? <CircularProgress /> : 'POST'
                }
            </button>
        </div>
    )
}

function CardForData(props) {
    
    


    return (
        <Link href={`/discussion/${props.id}`}>
            <a>
                <div className="bg-white hover:bg-gray-50 transition px-4 py-2 flex flex-col rounded-lg">
                    <div >
                        <div className="text-3xl">
                            {props.heading}
                        </div>
                        <div>
                            {props.location}
                        </div>
                    </div>
                    <div className="text-xl">
                        {props.content.substring(0, 200)} {props.content.length>=200?'...':undefined}
                    </div>
                    <div>
                        by {props.author}
                    </div>
                    <div>
                        on {props.date.substring(0,10).replaceAll('-', ' ')}
                    </div>
                </div>
            </a>
        </Link>

    )
}


export default function DiscussionBoard() {

    const [add, setAdd] = useState(false)
    const [loading, setLoading] = useState(true)
    const [recordedData, setRecordedData] = useState([])

    const user = supabase.auth.user()

    useEffect(()=>{
        const getData = async () => {
            const { data, error } = await supabase.from('forum').select()
            setRecordedData(data)
            setLoading(false)
            console.log(user)

        }
        getData()
        
    },[])

    const [modal, setModal] = useState(false)

    return (
        <div>
            <Head>
                <title>Discussions</title>
            </Head>
            <div>
                {
                    add ? (<AddInfo />) : (
                        <div>
                            {
                                (user)?(
                                    <button onClick={() => {
                                            setAdd(true)
                                    }} className="text-center w-full flex hover:bg-gray-50 transition justify-center bg-white py-5 rounded-xl text-2xl">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                        </svg>
                                    </button>
                                ):(
                                    <MyModal />
                                )
                            }
                        </div>
                        
                    )
                }
            </div>
            <div >
                {
                    loading ? (
                        <div className="flex justify-center mt-20">
                            <CircularProgress />
                        </div>
                    ) : (
                        <div className="my-3 flex flex-col gap-y-3">
                           {
                               recordedData.map((doc, key)=>(
                                   <CardForData id={doc.id} key={key} heading={doc.heading} location={doc.location} content={doc.content} date={doc.created_at} author={doc.author_name}  />
                               )).reverse()
                           }
                        </div>
                    )
                }

            </div>
        </div>
    )
}