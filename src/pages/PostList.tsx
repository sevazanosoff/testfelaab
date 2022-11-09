import React from 'react'
import axios from 'axios'

import PostItemPosted from '../components/PostItemPosted'
import PostItem from '../components/PostItem'

import Pagination from '../components/ui/Pagination/Paginaton'
import Loading from '../components/ui/Loading/Loading'

import { getTotalPages } from '../utils/getTotalPages'

import { Posts } from '../types/Post/PostList'


import styles from '../styles/PostStyles/PostList.module.scss'




const ACESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN
const PostList: React.FC = () => {
    const [posts, setPosts] = React.useState<Posts[]>([])
    const [isLoading, setLoading] = React.useState(false)
    const [page, setPage] = React.useState<number>(1)
    // useState because of you can make filter functional like how much posts you wanna see on the page?
    const [limit, setLimit] = React.useState<number>(5)

    const svgSelected = document.getElementsByClassName('post__item-selected')
    const svgRating: HTMLCollectionOf<Element> = document.getElementsByClassName('post__item-rating')
    const screenWidth = window.screen.width

    // Pagination
    const lastPost: number = page * limit
    const firstPost: number = lastPost - limit
    const currentPost = posts.slice(firstPost, lastPost)
    const totalPages = undefined ? getTotalPages(currentPost, limit) : getTotalPages(posts, limit)

    const ratingArray = [
        <path fillRule="evenodd" clipRule="evenodd" d="M3.52575 2.55003C3.91053 1.62864 4.64229 0.000488281 5.00871 0.000488281C5.54085 -6.72744e-05 6.70647 3.15938 6.70647 3.15938C6.70647 3.15938 7.78552 3.25882 8.65763 3.36049C9.12061 3.41438 9.94731 3.4966 9.99905 3.76604C10.0101 3.82438 9.94362 4.06271 9.82273 4.22882C9.31065 4.93438 7.9819 6.44604 7.9819 6.44604C7.9819 6.44604 8.05476 7.16827 8.11969 7.95827C8.16139 8.46938 8.27384 9.50493 8.23319 9.68993C8.18884 9.89382 8.10913 9.94938 8.02625 9.9816C7.8098 10.0649 7.30723 9.74104 6.7202 9.44438C5.92041 9.03938 5.02191 8.6066 5.02191 8.6066C5.02191 8.6066 4.42907 8.93382 3.72642 9.25327C2.97573 9.59438 2.21554 10.1566 1.89827 9.95882C1.7003 9.83493 1.84706 8.86938 1.92308 8.00993C1.99435 7.19938 2.05611 6.45882 2.05611 6.45882C2.05611 6.45882 1.61583 5.91327 1.10323 5.32993C0.549456 4.69938 -0.125741 4.01882 0.02049 3.76882C0.130823 3.57993 0.63445 3.47882 1.48016 3.36827C2.37866 3.25049 3.27611 3.16716 3.27611 3.16716C3.27611 3.16716 3.37392 2.91362 3.52575 2.55003Z"
            className='post__item-rating'
            fill="#384564"
            opacity="0.6"
        />,
        <path fillRule="evenodd" clipRule="evenodd" d="M14.5258 2.55003C14.9105 1.62864 15.6423 0.000488281 16.0087 0.000488281C16.5408 -6.72744e-05 17.7065 3.15938 17.7065 3.15938C17.7065 3.15938 18.7855 3.25882 19.6576 3.36049C20.1206 3.41438 20.9473 3.4966 20.999 3.76604C21.0101 3.82438 20.9436 4.06271 20.8227 4.22882C20.3107 4.93438 18.9819 6.44604 18.9819 6.44604C18.9819 6.44604 19.0548 7.16827 19.1197 7.95827C19.1614 8.46938 19.2738 9.50493 19.2332 9.68993C19.1888 9.89382 19.1091 9.94938 19.0262 9.9816C18.8098 10.0649 18.3072 9.74104 17.7202 9.44438C16.9204 9.03938 16.0219 8.6066 16.0219 8.6066C16.0219 8.6066 15.4291 8.93382 14.7264 9.25327C13.9757 9.59438 13.2155 10.1566 12.8983 9.95882C12.7003 9.83493 12.8471 8.86938 12.9231 8.00993C12.9943 7.19938 13.0561 6.45882 13.0561 6.45882C13.0561 6.45882 12.6158 5.91327 12.1032 5.32993C11.5495 4.69938 10.8743 4.01882 11.0205 3.76882C11.1308 3.57993 11.6344 3.47882 12.4802 3.36827C13.3787 3.25049 14.2761 3.16716 14.2761 3.16716C14.2761 3.16716 14.3739 2.91362 14.5258 2.55003Z"
            className='post__item-rating'
            fill="#384564"
            opacity="0.6"
        />,
        <path fillRule="evenodd" clipRule="evenodd" d="M25.5258 2.55003C25.9105 1.62864 26.6423 0.000488281 27.0087 0.000488281C27.5408 -6.72744e-05 28.7065 3.15938 28.7065 3.15938C28.7065 3.15938 29.7855 3.25882 30.6576 3.36049C31.1206 3.41438 31.9473 3.4966 31.999 3.76604C32.0101 3.82438 31.9436 4.06271 31.8227 4.22882C31.3107 4.93438 29.9819 6.44604 29.9819 6.44604C29.9819 6.44604 30.0548 7.16827 30.1197 7.95827C30.1614 8.46938 30.2738 9.50493 30.2332 9.68993C30.1888 9.89382 30.1091 9.94938 30.0262 9.9816C29.8098 10.0649 29.3072 9.74104 28.7202 9.44438C27.9204 9.03938 27.0219 8.6066 27.0219 8.6066C27.0219 8.6066 26.4291 8.93382 25.7264 9.25327C24.9757 9.59438 24.2155 10.1566 23.8983 9.95882C23.7003 9.83493 23.8471 8.86938 23.9231 8.00993C23.9943 7.19938 24.0561 6.45882 24.0561 6.45882C24.0561 6.45882 23.6158 5.91327 23.1032 5.32993C22.5495 4.69938 21.8743 4.01882 22.0205 3.76882C22.1308 3.57993 22.6344 3.47882 23.4802 3.36827C24.3787 3.25049 25.2761 3.16716 25.2761 3.16716C25.2761 3.16716 25.3739 2.91362 25.5258 2.55003Z"
            className='post__item-rating'
            fill="#384564"
            opacity="0.6"
        />,
        <path fillRule="evenodd" clipRule="evenodd" d="M36.5258 2.55003C36.9105 1.62864 37.6423 0.000488281 38.0087 0.000488281C38.5408 -6.72744e-05 39.7065 3.15938 39.7065 3.15938C39.7065 3.15938 40.7855 3.25882 41.6576 3.36049C42.1206 3.41438 42.9473 3.4966 42.999 3.76604C43.0101 3.82438 42.9436 4.06271 42.8227 4.22882C42.3107 4.93438 40.9819 6.44604 40.9819 6.44604C40.9819 6.44604 41.0548 7.16827 41.1197 7.95827C41.1614 8.46938 41.2738 9.50493 41.2332 9.68993C41.1888 9.89382 41.1091 9.94938 41.0262 9.9816C40.8098 10.0649 40.3072 9.74104 39.7202 9.44438C38.9204 9.03938 38.0219 8.6066 38.0219 8.6066C38.0219 8.6066 37.4291 8.93382 36.7264 9.25327C35.9757 9.59438 35.2155 10.1566 34.8983 9.95882C34.7003 9.83493 34.8471 8.86938 34.9231 8.00993C34.9943 7.19938 35.0561 6.45882 35.0561 6.45882C35.0561 6.45882 34.6158 5.91327 34.1032 5.32993C33.5495 4.69938 32.8743 4.01882 33.0205 3.76882C33.1308 3.57993 33.6344 3.47882 34.4802 3.36827C35.3787 3.25049 36.2761 3.16716 36.2761 3.16716C36.2761 3.16716 36.3739 2.91362 36.5258 2.55003Z"
            className='post__item-rating'
            fill="#384564"
            opacity="0.6"
        />,
        <path fillRule="evenodd" clipRule="evenodd" d="M47.5258 2.55003C47.9105 1.62864 48.6423 0.000488281 49.0087 0.000488281C49.5408 -6.72744e-05 50.7065 3.15938 50.7065 3.15938C50.7065 3.15938 51.7855 3.25882 52.6576 3.36049C53.1206 3.41438 53.9473 3.4966 53.999 3.76604C54.0101 3.82438 53.9436 4.06271 53.8227 4.22882C53.3107 4.93438 51.9819 6.44604 51.9819 6.44604C51.9819 6.44604 52.0548 7.16827 52.1197 7.95827C52.1614 8.46938 52.2738 9.50493 52.2332 9.68993C52.1888 9.89382 52.1091 9.94938 52.0262 9.9816C51.8098 10.0649 51.3072 9.74104 50.7202 9.44438C49.9204 9.03938 49.0219 8.6066 49.0219 8.6066C49.0219 8.6066 48.4291 8.93382 47.7264 9.25327C46.9757 9.59438 46.2155 10.1566 45.8983 9.95882C45.7003 9.83493 45.8471 8.86938 45.9231 8.00993C45.9943 7.19938 46.0561 6.45882 46.0561 6.45882C46.0561 6.45882 45.6158 5.91327 45.1032 5.32993C44.5495 4.69938 43.8743 4.01882 44.0205 3.76882C44.1308 3.57993 44.6344 3.47882 45.4802 3.36827C46.3787 3.25049 47.2761 3.16716 47.2761 3.16716C47.2761 3.16716 47.3739 2.91362 47.5258 2.55003Z"
            className='post__item-rating'
            fill="#384564"
            opacity="0.6"
        />,
    ]

    const fetchData = async () => {
        try {
            const res = await axios.get(`https://api.json-generator.com/templates/ZM1r0eic3XEy/data${ACESS_TOKEN}`)
            setPosts(res.data)
        } catch (err) {
            console.warn(err)
        } finally {
            setLoading(true)
        }
    }

    const changeSelected = (index: number) => {
        if (svgSelected[index].getAttribute('style') === 'fill: none' || svgSelected[index].getAttribute('style') === null) {
            svgSelected[index].setAttribute('style', 'fill: orange')
        }
        else {
            svgSelected[index].setAttribute('style', 'fill: none')
        }
    }

    const changeRating = (index: number, indexRating: number) => {
        let currentStarIndex = svgRating.length / limit * index + indexRating
        if (svgRating[currentStarIndex].getAttribute('opacity') === '0.6' || svgRating[currentStarIndex].getAttribute('opacity') === null) {
            for (let i = currentStarIndex; i >= currentStarIndex - indexRating; i--) {
                svgRating[currentStarIndex].setAttribute('opacity', '1')
                svgRating[i].setAttribute('opacity', '1')
            }
        } else {
            for (let i = currentStarIndex; i <= currentStarIndex + indexRating + 4; i++) {
                console.log(i)
                svgRating[currentStarIndex].setAttribute('opacity', '0.6')
                svgRating[i].setAttribute('opacity', '0.6')
            }
        }
    }

    React.useEffect(() => {
        fetchData()
    }, [])

    if (!isLoading) {
        return <Loading />
    }

    return (
        <>
            {isLoading && posts.length <= 0
                ?
                <div className={styles['post__error']}>
                    <h1 className={styles['post__error-title']}>Ой!</h1>
                    <p className={styles['post__error-text']}>К сожалению не удалось получить посты. Попробуйте повторить попытку позже.</p>
                </div>
                :
                <div className={styles['post']}>
                    {currentPost.map((post, index) => (
                        <div className={styles['post__wrapper']} key={post.id}>
                            {screenWidth <= 414 &&
                                <PostItemPosted posted={post.createdAt}>
                                    <svg width="205" height="18" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        {ratingArray.map((item, indexRating) =>
                                            <g key={indexRating} onClick={() => changeRating(index, indexRating)}>
                                                {item}
                                            </g>
                                        )}
                                    </svg>
                                </PostItemPosted>
                            }
                            <div className={styles['post__container']}>
                                <div className={styles['post__logo']}>
                                    <svg className={styles['post__logo-image']} width="85" height="85" viewBox="0 0 85 85" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                        <circle cx="42.5" cy="42.5" r="42.5" fill="#D8D8D8" />
                                    </svg>
                                </div>
                                <PostItem id={post.id} screenWidth={screenWidth} />
                            </div>
                            {screenWidth > 414 &&
                                <PostItemPosted posted={post.createdAt}>
                                    <svg
                                        onClick={() => changeSelected(index)}
                                        className='post__item-selected'
                                        width="18"
                                        height="23"
                                        viewBox="0 0 18 23"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                    >
                                        <path fillRule="evenodd" clipRule="evenodd" d="M1 4.00016C1 2.5274 2.19391 1.3335 3.66667 1.3335H14.3333C15.8061 1.3335 17 2.5274 17 4.00016V19.9936C17 21.1595 15.609 21.7639 14.7567 20.9682L9.90994 16.4428C9.39761 15.9645 8.60239 15.9645 8.09007 16.4428L3.24327 20.9682C2.39104 21.7639 1 21.1595 1 19.9936V4.00016Z" stroke="#70778B" strokeWidth="2" />
                                    </svg>
                                </PostItemPosted>
                            }
                        </div>
                    ))}
                    <Pagination page={page} totalPages={totalPages} changePage={(p: number) => setPage(p)} />
                </div>
            }
        </>
    )
}

export default PostList
