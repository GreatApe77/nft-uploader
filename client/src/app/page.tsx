import Image from 'next/image'

export default function Home() {
  return (
    <main className='min-h-full flex flex-grow justify-center items-center ' >
      <div className='flex flex-col p-6 rounded border bg-stone-300 ' >
        <form action="" className='flex flex-col gap-3'>
          <h1 className='text-4xl'>Provide the info</h1> 
        <label htmlFor="name">Name</label>
          <input type="text" className='p-1 rounded bg-neutral-200' id='name' />
          <label htmlFor="description" >description</label>
          <input type="text" id='description'className='p-1 rounded bg-neutral-200' />
          <label htmlFor="wallet" > Your public address:</label>
          <input type="text" id='wallet' className='p-1 rounded bg-neutral-200' />
          <label htmlFor="file" className=' rounded bg-slate-50 flex w-full  items-center'>
            <div className=' border-solid border-r p-3 bg-zinc-200 border-gray-500 cursor-pointer '> Image</div>
            <div className='flex justify-center m-auto'>Input your file here</div>
          </label>
          <input type="file" name="file" id="file" className='hidden' />
          <button type='submit' className='bg-indigo-800 text-2xl p-2 rounded text-white'>Mint</button>
        </form>
      </div>
    </main>
  )
}
