import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="w-full p-4 bg-[var(--green)] text-[var(--cream)] border-t border-t-[var(--border)] flex flex-col items-center py-12 relative overflow-hidden">
      <Image className='absolute -bottom-48 -right-0 opacity-30' src={'/logo.svg'} width={600} height={550} alt='logo'></Image>
      <div className='flex justify-center items-center flex-col text-center text-xl gap-5'>
        <div className='flex justify-center items-center text-2xl'>
          <Image src={'/logo.svg'} width={100} height={100} alt={'logo'}></Image>
          <p className='w-1/2 text-center font-bold'>UNIVERSITAS GLOBAL NUSANTARA</p>
        </div>
        <div>
          <ul className='flex gap-5'>
            <li className='flex items-center justify-center'></li>
            <li className='flex items-center justify-center'></li>
            <li className='flex items-center justify-center'></li>
            <li className='flex items-center justify-center'></li>
            <li className='flex items-center justify-center'></li>
          </ul>
        </div>
        <div className='flex flex-col gap-3 text-(var(--light-cream)) text-sm items-center'>
            <div className='w-3/4 text-center'>Jl. Cendekia Utama No. 123, Surakarta, Jawa Tengah, Indonesia 57126</div>
            <div className='flex gap-3 flex-col md:flex-row'>
                <p>Telp : (0271) 555-0123</p>
                <p>Email : info@ugn.ac.id</p>
            </div>    
        </div>
              
      </div>
    </footer>
  );
}