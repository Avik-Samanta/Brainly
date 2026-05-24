import { useState } from 'react'
import { Button } from './components/Button'
import { Card } from './components/Card'
import { CreateContentModal } from './components/CreateContentModal'
import { PlusIcon } from './icons/PlusIcon'
import { ShareIcon } from './icons/ShareIcon'
import './index.css'
import { Sidebar } from './components/Sidebar'

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <div>
        <Sidebar />
      </div>
      <div className='p-4 pt-6 bg-[var(--color-bg)] ml-64 min-h-screen bg-stone-50'>
        <CreateContentModal open={modalOpen} onClose={()=>{
          setModalOpen(false);
        }} />  
        <div className='flex justify-end gap-6 p-4'>
          <Button onClick={()=>{
            setModalOpen(true);
          }} variant='primary' text='Add Content' startIcon={<PlusIcon />} />
          <Button variant='secondary' text='Share Brain' startIcon={<ShareIcon />} />
        </div>
        <div className='flex gap-6 flex-wrap items-start p-4'>
          <Card type='twitter' title='new tweet' link='https://x.com/kirat_tw/status/2018326442464215392?s=20'/>

          <Card type='twitter' title='new tweet' link='https://x.com/AshutoshDM_1/status/2018208231903072346?s=20'/>
          
          <Card type='youtube' title='mr robot playlist' link='https://www.youtube.com/embed/1cMhZX3tfqM?si=eGqk1VXpEBxnn1P2' />
        </div>
      </div>
    </div>
  )
}

export default App
