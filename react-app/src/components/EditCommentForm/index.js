import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { deleteCommentThunk, editComment } from '../../store/comments';
import { useDispatch } from 'react-redux';
// import { deleteComment } from '../../store/comments';
import {MdDeleteForever} from 'react-icons/md'
import {FiEdit} from 'react-icons/fi'
import './EditCommentForm.css'

export default function EditCommentForm ({comment}) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const {id} = comment;
    const sessionUser = useSelector(state => state.session.user);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    const closeMenu = (e) => {
        e.preventDefault()
        setShowMenu(false)
        setBody(comment.body)
    }

    const [body, setBody] = useState(comment.body);

    const updateBody = (e) => setBody(e.target.value);

    console.log('THIS COMMENTIDDDDDDDD', comment.id);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            id: comment.id,
            body,
            author_id: sessionUser.id,
        };

        let updatedItem = dispatch(editComment(payload));
        if (updatedItem) {
          setShowMenu(false);
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();

        const commentData = {
            // userId: sessionUser.id,
            id: comment.id
        };

        dispatch(deleteCommentThunk(commentData))
    }

    // const handleCancelClick = (e) => {
    //     e.preventDefault();
    //     hideForm();
    // };

    return (
        <>
            {!showMenu && (
            <>
                <span className='otherEditAndDelete' onClick={openMenu}><FiEdit /></span>
                <span className='otherEditAndDelete' onClick={handleDelete}><MdDeleteForever /></span>
            </>
            )}
            {showMenu && (
            <>
                <div id='commentForm'>
                    <form onSubmit={handleSubmit}>
                    {/* <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul> */}
                        <textarea
                            className='editInput'
                            value={body}
                            onChange={updateBody}
                            name="body"
                            placeholder="Add a comment"
                        ></textarea>
                        <button className='submitCancel' onClick={!openMenu}type="submit">Submit</button>
                        <button className='submitCancel' onClick={closeMenu}>Cancel</button>
                    </form>
                </div>
            </>
            )}
        </>
    )




}
