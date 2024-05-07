import PropTypes from 'prop-types'
import './css/PostCard.css'

export function PostCard ({ title, description }) {
    return (
        <div className='post-card-wrapper'> 
            <h3 className='post-card-title'>{title}</h3>
            <p className='post-card-description'>{description}</p>
        </div>
    )
}

PostCard.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string
}