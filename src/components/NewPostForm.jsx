import PropType from 'prop-types'
import './css/NewPostForm.css'

export function NewPostForm ({handleNewPostSubmit, handleOnChangeTitle, handleOnChangeDescription}) {
    return (
            <form className='new-post-form' onSubmit={handleNewPostSubmit}>
                <div className='new-post-form-group'>
                    <input type="text" name='title' id='title' placeholder="Your post's title" onChange={(e) => handleOnChangeTitle(e)} />
                </div>
                <div className='new-post-form-group'>
                    <textarea name="description" id="description" rows="10" placeholder='What are you thinking about?' onChange={(e) => handleOnChangeDescription(e)}></textarea>
                </div>
                <div className='new-post-form-group'>
                    <input type="submit" value="Post" className='submit-button'/>
                </div>
            </form>
    )
}

NewPostForm.propTypes = {
    handleNewPostSubmit: PropType.func,
    handleOnChangeTitle: PropType.func,
    handleOnChangeDescription: PropType.func
}