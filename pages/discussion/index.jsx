import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react"
import { supabase } from "../../server/supabaseConfig"
import Link from "next/dist/client/link";
import { data } from "autoprefixer";


function AddInfo() {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [location, setLocation] = useState('Unspecified location');

    const user = supabase.auth.user();
    const username = user.user_metadata.username;

    const postDiscussion = async () => {
        setLoading(true)
        const { data, error } = await supabase.from('forum').insert([
            {
                author_id: user.id,
                heading: title,
                content: content,
                location: location
            }
        ])
        setLoading(false)
    }



    return (
        <div className="text-center flex flex-col justify-center bg-white py-5 rounded-xl ">
            <h1 className="text-2xl my-2">
                Create Discussion
            </h1>
            <input onChange={e => setTitle(e.target.value)} type="text" placeholder="Title*" className='bg-gray-50 p-1  m-2 border-2 border-black rounded-lg md:mx-10' />
            <textarea onChange={e => setContent(e.target.value)} rows={4} type="text" placeholder="Content*" className='bg-gray-50 p-1  m-2 border-2 border-black rounded-lg md:mx-10' />
            <input onChange={e => setLocation(e.target.value)} type="text" placeholder="Location (Optional)" className='bg-gray-50 p-1  m-2 border-2 border-black rounded-lg md:mx-10' />

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
    
    useEffect(()=>{},[])

    return (
        <Link href={`/discussion/${props.href}`}>
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
                        {props.content}
                    </div>
                    <div>
                        by {props.author}
                    </div>
                    <div>
                        on {props.date}
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

    useEffect(()=>{
        const getData = async () => {
            const { data, error } = await supabase.from('forum').select()
            setRecordedData(data)
            setLoading(false)
            console.log(data)
        }
        getData()
        
    },[])

    

    return (
        <div>
            <div>
                {
                    add ? (<AddInfo />) : (
                        <button onClick={() => setAdd(true)} className="text-center w-full flex hover:bg-gray-50 transition justify-center bg-white py-5 rounded-xl text-2xl">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                        </button>
                    )
                }
            </div>
            <div >
                {
                    loading ? (<CircularProgress />) : (
                        <div className="my-3 flex flex-col gap-y-3">
                           {
                               recordedData.map((doc)=>(
                                   <CardForData heading={doc.heading} location={doc.location} content={doc.content} date={doc.date} author={doc.author}  />
                               ))
                           }
                        </div>
                    )
                }

            </div>
        </div>
    )
}