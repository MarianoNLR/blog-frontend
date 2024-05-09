import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import './css/PostPage.css'

export function PostPage () { 
    const {id} = useParams()
    const [post, setPost] = useState(null)
    const navigate = useNavigate()
    // eslint-disable-next-line no-unexpected-multiline
    useEffect(() => {
        fetch(`http://localhost:3000/posts/${id}`)
        .then(res => res.json())
        .then(post => setPost(post))
        .catch(err => console.log(err))
        console.log(post)
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
                'Content-Type': 'application/json'
                },
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
                        <div className="likes-section">
                            <div className="like-button-wrapper">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" 
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                                className="feather feather-heart" onClick={handleLike}>
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z">
                                    </path>
                                </svg>
                            </div>
                            <span className="likes-number">{post.likes}</span>
                        </div>
                        <div className="comments-section">
                            Comments Section
                        </div>
                    </>
                :
                <h1>Post not found.</h1>
                }
            </main>
        </>
    )
}