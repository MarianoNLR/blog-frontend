import PropTypes from 'prop-types'
import './css/PostCard.css'
import { useNavigate } from 'react-router-dom'

export function PostCard ({ item }) {
    const navigate = useNavigate()

    const handleClick = (id) => {
        console.log(id)
        navigate(`/post/${id}`)
    }

    return (
        <div className='post-card-wrapper' onClick={() => handleClick(item.id)}> 
            <h3 className='post-card-title'>{item.title}</h3>
            <p className='post-card-description'>{item.description}</p>
        </div>
    )
}

PostCard.propTypes = {
    item: PropTypes.object
}