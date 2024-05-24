import PropType from 'prop-types'

export function DeletePostButton ({handleDelete}) {
    return (
        <>
            <button onClick={handleDelete} className='delete-post-btn'>Delete</button>
        </>
    )
}

DeletePostButton.propTypes = {
    handleDelete: PropType.func
}