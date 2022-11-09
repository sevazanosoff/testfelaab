import React from 'react'
import moment from 'moment'

import { PostItemPostedProps } from '../types/Post/PostItemPosted'

import styles from '../styles/PostStyles/PostItemPosted.module.scss'



const PostItemPosted: React.FC<PostItemPostedProps> = ({ children, posted }) => {
    return (
        <div className={styles['post__item']}>
            {children}
            <p className={styles['post__item-text']}>Posted {moment.utc(posted).fromNow()}</p>
        </div>
    )
}

export default PostItemPosted