"use client";

import { useEffect, useState } from 'react';
import { addAuthenticator, getUser, Authenticator, enrollFIDO2Authenticator, removeAuthenticator, UserProfile, logout } from '@/app/actions';
import { startRegistration } from '@simplewebauthn/browser';
import { useRouter } from 'next/navigation';
import { XMarkIcon } from '@heroicons/react/24/solid'
import FilledButton from '@/components/FilledButton';

const authenticatorId = (authenticator: Authenticator) => authenticator.credentialId;

function Authenticator({ authenticator }: { authenticator: Authenticator }) {
  const deviceId = authenticatorId(authenticator);
  const doRemoveAuthenticator = async (id: string) => {
    await removeAuthenticator(id);
  }

  return <li className='group text-black flex flex-row justify-between hover:bg-gray-100 rounded-full px-4 py-2'>
    {(authenticator.friendlyName && authenticator.friendlyName.length >= 1) ? authenticator.friendlyName : authenticator.credentialId}
    <button className='h-6 w-6 group-hover:block hidden'><XMarkIcon onClick={(_) => doRemoveAuthenticator(deviceId)} /></button>
  </li>
}

export default function Profile() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [working, setWorking] = useState(false);
  const router = useRouter();

  const doLogout = async () => {
    await logout();
    router.replace('/');
  }
  const enrollDevice = async () => {
    setWorking(true);
    try {
      const opts = JSON.parse((await enrollFIDO2Authenticator()).response)
      const attResp = JSON.stringify(await startRegistration(opts));
      await addAuthenticator(attResp);
    } finally { setWorking(false); }
  };

  useEffect(() => {
    (async () => {
      try {
        const user = await getUser();
        setUserProfile(user);
      } catch {
        router.replace('/');
      }
    })();
  }, []);

  const authenticators = userProfile?.authenticators;
  const email = userProfile?.email;
  return (<main>
    <h1 className='text-2xl text-black font-extrabold mb-8 px-4'>Hello, {email}</h1>
    <div className='my-4'>
      <h2 className='text-black font-bold px-4'>Registered authenticators</h2>
      <ul className='list-disc list-inside mt-4'>
        {authenticators?.map((e) => <Authenticator key={authenticatorId(e)} authenticator={e} />)}
      </ul>
    </div>
    <div className='flex flex-row justify-between px-4'>
      <button type='button' disabled={working || email == null} onClick={(_) => enrollDevice()} className="font-bold text-sm text-black rounded disabled:opacity-30 mr-4">
        Add current device
      </button>
      <div>
        <FilledButton
          label={"Logout"}
          disabled={working || email == null}
          onClick={doLogout}
        />
      </div>
    </div>
  </main>);
}