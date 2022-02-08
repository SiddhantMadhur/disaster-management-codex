import React, { useEffect, useState } from 'react';
import { supabase } from '../../server/supabaseConfig';
import { useRouter } from 'next/router'
import { Breadcrumbs, CircularProgress, Link, Typography } from '@mui/material';

export async function getServerSideProps(context) {
    const q = context.query
    const { data, error } = await supabase.from('forum').select().match({
        id: q.id
    })

    return {
        props: {
            data: data,
            id: q.id
        }
    }
}

function SpecificDiscussion({ data, id }) {
    const content = data[0].content
    const arrContent = content.split('\n')

    const [comments, setComments] = useState([])
    const [text, setText] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getComments = async () => {
            const { data, error } = await supabase.from('comments').select().match({
                post_id: id
            })
            setComments(data)

        }
        getComments()
    }, [])

    const user = supabase.auth.user()

    const postComment = async () => {
        setLoading(true)
        const { data, error } = await supabase.from('comments').insert([
            {
                user_id: user.id,
                username: user.user_metadata.username,
                post_id: id,
                content: text
            }
        ])
        setComments([...comments, data])
        setText('')
        setLoading(false)
    }


    return (
        <div className='flex flex-col gap-y-4'>
            <div>
                <Breadcrumbs>
                    <Link color="inherit" href='/'>
                        Home
                    </Link>
                    <Link color="inherit" href='/discussion'>
                        Discussions
                    </Link>
                    <Typography>
                        {data[0].heading}
                    </Typography>
                </Breadcrumbs>
            </div>
            <main>
                <article>
                    <div className='flex flex-col text-center justify-center bg-white rounded-lg p-3 md:p-10'>
                        <div className='text-4xl m-2'>
                            {data[0].heading}
                        </div>
                        <div className='text-xl  mb-5'>
                            by {data[0].author_name} <br />
                            {data[0].location}
                        </div>
                        <div className='text-2xl'>
                            {
                                arrContent.map((doc, key) => (
                                    <p key={key}>
                                        {doc}
                                    </p>
                                ))
                            }
                        </div>
                    </div>
                </article>
            </main>
            <div>
                <div className='flex flex-col gap-y-2 text-left justify-center bg-white rounded-lg p-3 md:p-10'>
                    {user?.user_metadata.username}
                    <textarea value={text} onChange={e => setText(e.target.value)} placeholder='Comment...' type="text" className='border-2 border-black rounded-xl p-2' rows={2} />
                    <button onClick={postComment} className='bg-gray-700 hover:bg-gray-900 hover:text-gray-300 text-gray-100 text-xl rounded-lg py-1 '>
                        {
                            loading ? <CircularProgress /> : 'POST'
                        }
                    </button>
                </div>
            </div>
            <div className='flex flex-col text-left justify-center bg-white rounded-lg p-3 md:p-10'>
                <h1>
                    Comments:
                </h1>
                <div>
                    {
                        comments.map((doc, key) => (
                            <div key={key} className='flex gap-2'>
                                <div  className='font-semibold'>
                                    {doc.username}
                                </div>
                                <div>
                                    {doc.content}
                                </div>
                            </div>
                        )).reverse()
                    }
                </div>
            </div>
        </div>
    );
}

export default SpecificDiscussion;
