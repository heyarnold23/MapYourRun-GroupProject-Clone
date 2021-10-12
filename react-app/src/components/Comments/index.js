import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {getCommentsThunk} from'../../store/comments'

export default function CommentsFeed({runId}) {

    const dispatch = useDispatch()
    const comments = useSelector(store => store?.comments)

    useEffect(() => {
        dispatch(getCommentsThunk())
      },[dispatch])


console.log(comments);
    return (
        <div>
            <div>
                <div>
                {runId}
                </div>
                <div>

                </div>
                <div>

                </div>
            </div>
            <div>
                <div>

                </div>
                <div>

                </div>
                <div>

                </div>
            </div>

        </div>
    )

}
