import { useEffect, useState } from "react"
import { PostCard } from "../components/PostCard.jsx"
import './css/Profile.css'

export function Profile () {
    const [user, setUser] = useState({})
    const [posts, setPosts] = useState({posts: []})
    const [currentPage, setCurrentPage] = useState(1)
    const userData = JSON.parse(window.localStorage.getItem('loggedBlogApp'))

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userRes = await fetch(`http://localhost:3000/users/${userData.id}`, {
                    method: 'GET',
                    headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${userData.token}`
                    }
                })

                const userJson = await userRes.json()
                setUser(userJson)
                const postsRes = await fetch(`http://localhost:3000/posts?userId=${userJson.id}&currentPage=${currentPage}`)
                const postsData = await postsRes.json()
                setPosts(prevPostList => ({
                    totalPages: postsData.totalPages,
                    page: postsData.page,
                    posts: [...prevPostList.posts, ...postsData.posts]
                }))
                console.log(postsData)
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    }, [currentPage])

    const viewMoreHandle = () => {
        setCurrentPage(currentPage + 1)
      }

    return (
        <>
            
            <main className="main-profile">
                <div className="data-profile-wrapper">
                    <p>Username: <span className="data-profile-value">{user.username}</span></p>
                    <p>Name: <span className="data-profile-value">{user.name}</span></p>
                </div>
                <div className="user-posts-wrapper">
                    <h2>{user.username}&apos;s Posts</h2>
                {posts.posts && posts.posts.length > 0 ? 
                posts.posts.map((item, index) =>
                <PostCard key={index} item={item} />
                )
            :  
                <div><h3>Posts not found.</h3></div> 
            }

                <div className='view-more-wrapper'>
                    {posts.totalPages > currentPage 
                    ? <button className='view-more-button' onClick={viewMoreHandle}>View More</button> 
                    : null
                    }  
                </div>
                </div>
            </main>
        </>
    )
}