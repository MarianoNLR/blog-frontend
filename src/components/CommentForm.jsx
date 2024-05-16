import {useState} from 'react'
import { useParams, useNavigate } from "react-router-dom"

export function CommentForm () {
    const [comment, setComment] = useState('')
    const { id } = useParams()
    const userData = JSON.parse(localStorage.getItem('loggedBlogApp'))
    const navigate = useNavigate()

    const handleCommentChange = (e) => {
        console.log(e.target.value)
        setComment(e.target.value)
    }

    const handleSubmitComment = async (e) => {
        e.preventDefault()

        try {
            const res = await fetch(`http://localhost:3000/posts/${id}/comment`,
                {
                    method: 'POST',
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userData.token}`
                    },
                    body: JSON.stringify({ comment })
                }
            )
            if (!res.ok) {
                console.error(res)
            } else {
                navigate(0)
            }
        } catch (error) {
            console.error(error)
        }
    }
    
    return (
        <div className='comment-form-wrapper'>
            <form  onSubmit={handleSubmitComment}>
                <input type="text" placeholder='What do you think about this post?' id='comment' className='comment-input' onChange={(e) => handleCommentChange(e)}/>
                <input type="submit" value="Comment"/>
            </form>
        </div>
    )
}