import {useState} from 'react'
import { useParams, useNavigate } from "react-router-dom"
import './css/CommentForm.css'

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
            <form className='form'  onSubmit={handleSubmitComment}>
            <textarea name="comment" placeholder='What do you think about this post?' id="comment" className='comment-input' rows='4' onChange={(e) => handleCommentChange(e)}></textarea>
                <input type="submit" value="Comment" className='form-submit-input'/>
            </form>
        </div>
    )
}