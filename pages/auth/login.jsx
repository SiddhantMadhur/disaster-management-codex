import { CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { supabase } from '../../server/supabaseConfig';
import Link from 'next/link'

function LoginPage() {
    const [newAccount, setNewAccount] = useState(false);
    const [oldAccount, setOldAccount] = useState(false);

    return (<div>
        <div>
            <div className='grid place-items-center relative lg:p-10 rounded-lg'>
                <div className='flex flex-col gap-y-4 border-2 border-black bg-white w-full md:w-1/2 p-2 md:p-20 rounded-xl shadow-xl'>
                    {
                        (!newAccount && !oldAccount) ? <AskForAccountType setNewAccount={setNewAccount} setOldAccount={setOldAccount} /> : undefined
                    }
                    {
                        newAccount ? (<CreateAccount setNewAccount={setNewAccount} setOldAccount={setOldAccount} />) : undefined
                    }
                    {
                        oldAccount ? (<LoginAccount setNewAccount={setNewAccount} setOldAccount={setOldAccount} />) : undefined
                    }
                </div>
            </div>
        </div>
    </div>)
}

function CreateAccount(props) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState()
    const [error, setError] = useState()

    const password = String.toString(Math.round(Math.random() * 32))

    const createAccount = async () => {
        setLoading(true)
        const { user, session, error } = await supabase.auth.signUp({
            email: email,
            password: password
        }, {
            data: {
                username: username
            }
        })
        if (error) {
            setError("There has been an error. Please try again later: ", error)
            setLoading(false)
        } else {
            setSuccess('You have created an account. Please check your mail to log in.')
            setLoading(false)
        }

    }

    return (
        <div className='text-center flex flex-col gap-y-4'>
            <div className='text-green-600'>
                {success}
            </div>
            <div className='text-red-600'>
                {error}
            </div>
            <h1 className='text-2xl'>
                Create Account
            </h1>
            <input type="text" onChange={e => setUsername(e.target.value)} placeholder='Username...' className='border-2 p-2 border-black rounded-lg text-xl' />
            <input type="text" onChange={e => setEmail(e.target.value)} placeholder='Email...' className='border-2 p-2 border-black rounded-lg text-xl' />
            <button onClick={createAccount} className=' shadow-md bg-gray-700 transition hover:bg-gray-800 ransition  p-3 w-full rounded-lg text-green-50'>
                {
                    loading ? <CircularProgress /> : 'CREATE ACCOUNT'
                }
            </button>
            <button onClick={() => {
                props.setOldAccount(true)
                props.setNewAccount(false)
            }} className='text-gray-600 hover:text-gray-800 transition'>Already have an account? Log in.</button>
        </div>
    )
}

function LoginAccount(props) {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState()
    const [error, setError] = useState()

    const password = String.toString(Math.round(Math.random() * 32))

    const loginAccount = async () => {
        setLoading(true)
        const { user, session, error } = await supabase.auth.signIn({
            email: email
        })
        if (error) {
            setError("There has been an error. Please try again later: ", error)
            setLoading(false)
        } else {
            setSuccess('We\'ve sent a link to your email. Please use that to log in.')
            setLoading(false)
        }

    }

    return (
        <div className='text-center flex flex-col gap-y-4'>
            <div className='text-green-600'>
                {success}
            </div>
            <div className='text-red-600'>
                {error}
            </div>
            <h1 className='text-2xl'>
                Log In
            </h1>
            <input type="text" onChange={e => setEmail(e.target.value)} placeholder='Email...' className='border-2 p-2 border-black rounded-lg text-xl' />
            <button onClick={loginAccount} className=' shadow-md bg-gray-700 transition hover:bg-gray-800 ransition  p-3 w-full rounded-lg text-green-50'>
                {
                    loading ? <CircularProgress /> : 'SIGN IN'
                }
            </button>
            <button onClick={() => {
                props.setOldAccount(false)
                props.setNewAccount(true)
            }} className='text-gray-600 hover:text-gray-800 transition'>Dont have an account? Make one.</button>
        </div>
    )
}

function AskForAccountType(props) {






    return (
        <div>
            <div className='flex flex-col gap-y-4 '>
                <h1 className='text-2xl '>
                    Already have an account?
                </h1>
                <br />
                <button onClick={() => {
                    props.setOldAccount(true)
                }} className='bg-green-400 shadow-md hover:bg-green-500 text-lg transition w-full mx-auto p-3 rounded-lg text-green-50'>
                    YES, SIGN IN
                </button>
                <button onClick={() => {
                    props.setNewAccount(true)
                }} className='bg-red-400 shadow-md hover:bg-red-500 transition text-lg w-full mx-auto p-3 rounded-lg text-red-50'>
                    NO, CREATE ACCOUNT
                </button>
            </div>
        </div>
    );
}

export default LoginPage;
