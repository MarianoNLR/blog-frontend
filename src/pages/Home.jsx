import { useState, useEffect} from 'react'
import { PostCard } from '../components/PostCard.jsx'
import { FormNotification } from '../components/FormNotification.jsx'
import { NewPostForm } from '../components/NewPostForm.jsx'
import { useNavigate } from 'react-router-dom'
import './css/Home.css'

export function Home () {
  const [postList, setPostList] = useState({ posts: [] })
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [page, setPage] = useState(1)
  const userData = JSON.parse(localStorage.getItem('loggedBlogApp'))
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`http://localhost:3000/posts?page=${page}`)
    .then(res => res.json())
    .then(data => setPostList({
      totalPages: data.totalPages,
      page: data.page,
      posts: [...postList.posts, ...data.posts]
    }))
  },[page])

  const handleOnChangeTitle = (e) => {
    console.log(e.target.value)
    setTitle(e.target.value)
  }

  const handleOnChangeDescription = (e) => {
    console.log(e.target.value)
    setDescription(e.target.value)
  }

  const handleNewPostSubmit = async (e) => {
    e.preventDefault()

    try {
      // fetch to my local api
      const res = await fetch('http://localhost:3000/posts/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userData.token}`
        },
        body: JSON.stringify({title, description})
      })
      
      //if response is not ok set an error message to display as a form notificacion
      if (!res.ok) {
        setErrorMessage('An error has ocurred. Try again!')
      } else {
        //reset states
        setTitle('')
        setDescription('')
        //refresh home
        navigate(0)
      }
      
    } catch (error) {
      console.log(error)
      setErrorMessage('An error has ocurred.')
    }
  }

  const viewMoreHandle = () => {
    setPage(page + 1)
  }

  return (
    <>
    <main className='main-home'>
      <h1>Home Page</h1>
      <div className="new-post-form-wrapper">
        <NewPostForm  
        handleNewPostSubmit={handleNewPostSubmit} 
        handleOnChangeTitle={handleOnChangeTitle} 
        handleOnChangeDescription={handleOnChangeDescription}>
        </NewPostForm>
        <FormNotification message={errorMessage}></FormNotification>

      </div>
      <div className='post-list-wrapper'>
        {postList.posts &&
          postList.posts.map((item, index) =>
            <PostCard key={index} item={item} />
        )}
      </div>
      <div className='view-more-wrapper'>
      {postList.totalPages > page 
      ? <button className='view-more-button' onClick={viewMoreHandle}>View More</button> 
      : null
      }  
      </div>
    </main>
    </>
  )
}