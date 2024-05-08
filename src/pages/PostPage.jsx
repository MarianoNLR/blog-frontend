import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import './css/PostPage.css'

export function PostPage () { 
    const {id} = useParams()
    const [post, setPost] = useState(null)
    // eslint-disable-next-line no-unexpected-multiline
    useEffect(() => {
        fetch(`http://localhost:3000/posts/${id}`)
        .then(res => res.json())
        .then(post => setPost(post))
        .catch(err => console.log(err))
    }, [])

    const formatDate = (createdAt) => {
        const dateLocale = new Date(createdAt).toLocaleDateString()
        const date = new Date(dateLocale)

        const month = (date.getMonth() + 1).length == 1 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)
        const day = (date.getDate()).length == 1 ? '0' + (date.getDate()) : (date.getDate())

        return `${day}/${month}/${date.getFullYear()}`
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
                            Likes Section
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