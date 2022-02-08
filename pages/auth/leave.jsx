import React, { useEffect } from 'react';
import { supabase } from '../../server/supabaseConfig';
import { useRouter } from 'next/dist/client/router';

function LeavePage() {

    const router = useRouter()
    const session = supabase.auth.session()

    const signout = async() => {
        await supabase.auth.signOut()
    }

    useEffect(signout, [])


  return <div>
      <h1 className='text-5xl text-center py-20'>
          Signing you out...
      </h1>
  </div>;
}

export default LeavePage;
