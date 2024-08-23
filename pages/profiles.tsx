import { NextPageContext } from 'next';
import Image from 'next/image';
import { getSession } from 'next-auth/react';
import useCurrentUser from '@/hooks/useCurrentUser';
import { useRouter } from 'next/router';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const Profiles = () => {
  const router = useRouter()
  const { data: user } = useCurrentUser();

  return (
    <div className='flex items-center h-full justify-center'>
      <div className='flex flex-col'>
        <h1 className='text-white text-center md:text-6xl text-3xl'>
          Who is watching?
        </h1>
        <div className='flex items-center justify-center gap-8 mt-10'>
          <div onClick={() => router.push('/')}>
            <div className='group mx-auto flex-row justify-center'>
              <Image
                className='rounded-md border-2 border-transparent group-hover:cursor-pointer group-hover:border-white mx-auto'
                src='/images/default-blue.png'
                width={170}
                height={170}
                alt='profile image'
              />
              <div className='text-center  mt-4 text-2xl text-gray-300 group-hover:text-white'>
                {user?.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiles;
