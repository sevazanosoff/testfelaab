import React from 'react'
import { Link } from 'react-router-dom'

import { PostItemProps } from '../types/Post/PostItem'

import styles from '../styles/PostStyles/PostItem.module.scss'


const PostItem: React.FC<PostItemProps> = ({ id, screenWidth }) => {

    return (
        <div className={styles['post__item']}>
            <Link className={styles['post__item-link']} to={`post/${id}`}>
                <h3 className={styles['post__item-title']} >
                    {screenWidth <= 414
                        ?
                        `Arbeitsmediziner/-in / Betriebsmediziner/-in (m/w/d)`
                        :
                        `Arbeitsmediziner/-in / Betriebsmediziner/-in (m/w/d) oder einen Arzt/eine Ärztin (m/w/d) für die Weiterbildung zum Facharzt/ zur Fachärztin für Arbeitsmedizin (m/w/d)`
                    }
                </h3>
            </Link>
            <p className={styles['post__item-text']}>Department name •  Allgemeines Krankenhaus der Stadt Wien - AKH</p>
            <div className={styles['post__item-location']}>
                <svg
                    width="13"
                    height="18"
                    viewBox="0 0 13 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M6.5 18C6.5 18 13 11.9706 13 7C13 2.02944 10.0899 0 6.5 0C2.91015 0 0 2.02944 0 7C0 11.9706 6.5 18 6.5 18ZM6.5 10C8.433 10 10 8.433 10 6.5C10 4.567 8.433 3 6.5 3C4.567 3 3 4.567 3 6.5C3 8.433 4.567 10 6.5 10Z" fill="#878D9D" />
                </svg>
                <p className={styles['post__item-text']}>Vienna, Austia</p>
            </div>
        </div>
    )
}

export default PostItem
