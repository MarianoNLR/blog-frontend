import PropType from 'prop-types'

export function DeletePostButton ({handleDelete}) {
    return (
        <>
            <button onClick={handleDelete} className='delete-post-btn'>🗑️</button>
        </>
    )
}

DeletePostButton.propTypes = {
    handleDelete: PropType.func
}