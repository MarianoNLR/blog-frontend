import { useState, useEffect} from 'react'
import { PostCard } from '../components/PostCard.jsx'
import './css/Home.css'

export function Home () {
  const [postList, setPostList] = useState([])

  useEffect(() => {
    fetch(`http://localhost:3000/posts/`)
    .then(res => res.json())
    .then(data => setPostList(data))
    
  },[])

  return (
    <>
    <main className='main-home'>
      <h1>Home Page</h1>
      <div className='post-list-wrapper'>
        {postList.length > 0 && 
          postList.map((item, index) =>
            <PostCard key={index} item={item} />
        )}
      </div>
    </main>
    </>
  )
}