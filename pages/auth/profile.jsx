import React, { useEffect } from 'react';
import { supabase } from '../../server/supabaseConfig';




function ProfilePage() {

    const user = supabase.auth.user()
    console.log(user)

    return (
        <div className='text-center'>
            <div className='bg-white py-10 rounded-xl flex flex-col gap-y-5 text-xl w-fit mx-auto px-5'>
                <div className='text-2xl'>
                    Here you can see all the data we store on you
                </div>
                <div className='text-left'>
                    <div>
                        Username: {user?.user_metadata.username}
                    </div>
                    <div>
                        Email: {user?.email}
                    </div>
                    <div>
                        
                    </div>
                </div>
                <div>
                    Thats it. We store no other data.
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
