import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import './css/PostPage.css'
import { LikeSection } from "../components/LikeSection.jsx"
import { CommentSection } from "../components/CommentSection.jsx"

export function PostPage () { 
    const {id} = useParams()
    const [post, setPost] = useState(null)
    const navigate = useNavigate()
    const userData = JSON.parse(localStorage.getItem('loggedBlogApp'))
    // eslint-disable-next-line no-unexpected-multiline
    useEffect(() => {
        fetch(`http://localhost:3000/posts/${id}`)
        .then(res => res.json())
        .then(post => setPost(post))
        .catch(err => console.log(err))
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const formatDate = (createdAt) => {
        const dateLocale = new Date(createdAt).toLocaleDateString()
        const date = new Date(dateLocale)

        const month = (date.getMonth() + 1).length == 1 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)
        const day = (date.getDate()).length == 1 ? '0' + (date.getDate()) : (date.getDate())

        return `${day}/${month}/${date.getFullYear()}`
    }

    const handleLike = async () => {
        try {
            const res = await fetch(`http://localhost:3000/posts/${id}/like`, {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userData.token}`
                }
            })

            if (!res.ok) {
                console.error(res)
            } else {
                navigate(0)
            }
        } catch (err) {
            console.error(err)
        }
    }

    //TODO unlike function
    const handleUnlike = async () => {
        try {
            const res = await fetch(`http://localhost:3000/posts/${id}/unlike`, {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userData.token}`
                }
            })

            if (!res.ok) {
                console.error(res)
            } else {
                navigate(0)
            }
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>  
            <main className="post-page-main">
                {post ? 
                    <>  
                        <div className="post-wrapper">
                            <h1 className="post-title">{post.title}</h1>
                            <p className="post-description">{post.description}</p>
                            <p className="post-publishedAt">{formatDate(post.createdAt)}</p>
                        </div>
                        <LikeSection post={post} handleLike={handleLike} handleUnlike={handleUnlike}></LikeSection>
                        <CommentSection comments={post.comments}></CommentSection>
                    </>
                :
                <h1>Post not found.</h1>
                }
            </main>
        </>
    )
}