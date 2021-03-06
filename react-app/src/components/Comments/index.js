import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {getCommentsThunk} from'../../store/comments'
import EditCommentForm from '../EditCommentForm';
import './Comments.css'


export default function CommentsFeed({id}) {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch()




    useEffect(() => {
        dispatch(getCommentsThunk())
      },[dispatch])

    const comments = useSelector(store => store?.comments)
    const commentsArr = Object.values(comments)
    const filteredComments = commentsArr.filter(comment => comment.run_id === id)

    return (
        <>
            {filteredComments.map((comment) =>
            <div key={comment.id}className='commentDiv'>
                {/* <div className='commentPicDiv'>
                    Picture
                </div> */}
                <div className='nameBodyDiv'>
                    <div className='commentNameDiv'>
                    {comment?.user_name?.username}
                    </div>
                    <div className='commentBodyDiv'>
                    {comment.body}
                    </div>
                </div>
                {sessionUser ?
                    <>
                        {sessionUser.id === comment?.user_name?.id ?
                            // setShowEditMenu(true) &&
                            <EditCommentForm comment={comment}/> : null
                        }
                    </>
                : null}

                {/* <div className='commentCreatedDiv'>
                    created
                </div> */}
            </div>
            )}
        </>

    )

}
