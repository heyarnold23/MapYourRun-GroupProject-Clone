import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {getCommentsThunk} from'../../store/comments'

export default function CommentsFeed({id}) {

    const dispatch = useDispatch()
    const comments= useSelector(store => store?.comments)

    useEffect(() => {
        dispatch(getCommentsThunk())
      },[dispatch])

console.log(id)
    return (
        <div>
            <div>
                <div>
                {id}
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