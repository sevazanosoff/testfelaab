import React from 'react'
import moment from 'moment'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { useJsApiLoader } from '@react-google-maps/api'

import Map from '../components/ui/Map/Map'
import Loading from '../components/ui/Loading/Loading'

import { Posts } from '../types/Post/PostList'

import styles from '../styles/FullPost/Fullpost.module.scss'

const API_KEY = process.env.REACT_APP_API_KEY
const PostFullPage = () => {
    const [posts, setPost] = React.useState<Posts[]>([])
    const [isLoading, setLoading] = React.useState(false)
    const [selected, setSelected] = React.useState(false)
    const [lat, setLat] = React.useState(0)
    const [long, setLong] = React.useState(0)
    const params = useParams()

    const screenWidth = window.screen.width

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: `${API_KEY}`
    })

    // For currentPost info
    const currentPost = posts.find(post => post.id === params.id)
    const salaryFrom = currentPost?.salary.slice(0, currentPost?.salary.indexOf('k')) + ' 000'
    const salaryTo = currentPost?.salary.slice(currentPost?.salary.indexOf('-') + 1, currentPost?.salary.lastIndexOf('k')) + ' 000'
    const description = currentPost?.description
        .trim()
        .split('\n')
        .map(string => string.trim())
        .filter(string => string !== '')


    const fetchData = async () => {
        try {
            const res = await axios.get(`https://api.json-generator.com/templates/ZM1r0eic3XEy/data?access_token=wm3gg940gy0xek1ld98uaizhz83c6rh2sir9f9fu`)
            setPost(res.data)
        } catch (err) {
            console.warn(err)
        } finally {
            setLoading(true)
        }
    }

    React.useEffect(() => {
        fetchData()
    }, [])

    React.useEffect(() => {
        if (currentPost !== undefined) {
            setLat(currentPost?.location.lat)
            setLong(currentPost?.location.long)
        }
    }, [currentPost])

    // You can check thats coords is right.(In comments Kyiv coords)
    const center = {
        lat: lat,
        // 50.4546600,
        lng: long,
        // 30.5238000,
    }

    if (!isLoading) {
        return <Loading />
    }

    return (
        <>
            {isLoading && currentPost === undefined
                ?
                <div className={styles['fullpost']}>
                    <h1 className={styles['fullpost__error-title']}>Ой!</h1>
                    <p className={styles['fullpost__error-text']}>К сожалению не удалось получить пост. Попробуйте повторить попытку позже.</p>
                </div>
                :
                <div className={styles['fullpost']}>
                    <div className={styles['fullpost__wrapper']}>
                        <div className={styles['fullpost__main']}>
                            <div className={styles['main__header']}>
                                <div className={styles['main__header-block']}>
                                    <h1 className={styles['main__header-title']}>Job Details</h1>
                                </div>
                                <div className={styles['main__header-svgs']}>
                                    <div onClick={() => setSelected(!selected)} className={styles['main__header-svg']}>
                                        {screenWidth > 414
                                            ?
                                            <svg
                                                width="18"
                                                height="23"
                                                viewBox="0 0 18 23"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill={selected ? "orange " : "none"}
                                            >
                                                <path fillRule="evenodd" clipRule="evenodd" d="M1 4.00016C1 2.5274 2.19391 1.3335 3.66667 1.3335H14.3333C15.8061 1.3335 17 2.5274 17 4.00016V19.9936C17 21.1595 15.609 21.7639 14.7567 20.9682L9.90994 16.4428C9.39761 15.9645 8.60239 15.9645 8.09007 16.4428L3.24327 20.9682C2.39104 21.7639 1 21.1595 1 19.9936V4.00016Z" stroke="#70778B" strokeWidth="2" />
                                            </svg>
                                            :
                                            <svg
                                                baseProfile="tiny"
                                                height="21"
                                                width="21"
                                                id="Layer_1"
                                                version="1.2"
                                                viewBox="0 0 21 21"
                                                fill={selected ? "orange " : "gray"}
                                                xmlSpace="preserve"
                                                xmlns="http://www.w3.org/2000/svg"
                                                xmlnsXlink="http://www.w3.org/1999/xlink">
                                                <g>
                                                    <g>
                                                        <path d="M16.855,20.966c-0.224,0-0.443-0.05-0.646-0.146c-0.035-0.014-0.069-0.031-0.104-0.051l-4.107-2.343L7.891,20.77    c-0.035,0.02-0.07,0.037-0.106,0.053C7.297,21.051,6.7,20.997,6.264,20.68c-0.469-0.34-0.701-0.933-0.586-1.509l0.957-4.642    c-0.374-0.34-0.962-0.875-1.602-1.457l-1.895-1.725c-0.027-0.025-0.055-0.053-0.078-0.082c-0.375-0.396-0.509-0.97-0.34-1.492    C2.893,9.249,3.34,8.861,3.88,8.764C3.914,8.756,3.947,8.75,3.982,8.746l4.701-0.521l1.946-4.31    c0.017-0.038,0.036-0.075,0.06-0.11c0.262-0.473,0.764-0.771,1.309-0.771c0.543,0,1.044,0.298,1.309,0.77    c0.021,0.036,0.041,0.073,0.06,0.112l1.948,4.312l4.701,0.521c0.034,0.003,0.068,0.009,0.104,0.017    c0.539,0.1,0.986,0.486,1.158,1.012c0.17,0.521,0.035,1.098-0.34,1.494c-0.024,0.026-0.051,0.054-0.078,0.078l-3.498,3.184    l0.957,4.632c0.113,0.587-0.118,1.178-0.59,1.519C17.477,20.867,17.173,20.966,16.855,20.966z M8.706,14.402    c-0.039,0.182-0.466,2.246-0.845,4.082l3.643-2.077c0.307-0.175,0.684-0.175,0.99,0l3.643,2.075l-0.849-4.104    c-0.071-0.346,0.045-0.705,0.308-0.942l3.1-2.822l-4.168-0.461c-0.351-0.039-0.654-0.26-0.801-0.584l-1.728-3.821l-1.726,3.821    c-0.146,0.322-0.45,0.543-0.801,0.584l-4.168,0.461l3.1,2.822C8.676,13.682,8.788,14.053,8.706,14.402z" />
                                                    </g>
                                                </g>
                                            </svg>
                                        }

                                        <p className={styles['main__header-text']}>Save to my list</p>
                                    </div>
                                    <div onClick={() => alert('Do you want to share?')} className={styles['main__header-svg']}>
                                        <svg
                                            width="19"
                                            height="20"
                                            viewBox="0 0 19 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M13.54 14.9096L6.41 10.743C6.46 10.512 6.5 10.2811 6.5 10.0402C6.5 9.7992 6.46 9.56827 6.41 9.33735L13.46 5.21084C14 5.71285 14.71 6.0241 15.5 6.0241C17.16 6.0241 18.5 4.67871 18.5 3.01205C18.5 1.34538 17.16 0 15.5 0C13.84 0 12.5 1.34538 12.5 3.01205C12.5 3.25301 12.54 3.48394 12.59 3.71486L5.54 7.84137C5 7.33936 4.29 7.02811 3.5 7.02811C1.84 7.02811 0.5 8.37349 0.5 10.0402C0.5 11.7068 1.84 13.0522 3.5 13.0522C4.29 13.0522 5 12.741 5.54 12.239L12.66 16.4157C12.61 16.6265 12.58 16.8474 12.58 17.0683C12.58 18.6847 13.89 20 15.5 20C17.11 20 18.42 18.6847 18.42 17.0683C18.42 15.4518 17.11 14.1365 15.5 14.1365C14.74 14.1365 14.06 14.4378 13.54 14.9096Z" fill="#70778B" />
                                        </svg>
                                        <p className={styles['main__header-text']}>Share</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles['main__info']}>
                                <div className={styles['main__info-left']}>
                                    <h3 className={styles['main__info-title']}>Arbeitsmediziner/-in / Betriebsmediziner/-in (m/w/d) oder einen Arzt/eine Ärztin (m/w/d) für die Weiterbildung zum Facharzt/ zur Fachärztin für Arbeitsmedizin (m/w/d)</h3>
                                    <p className={styles['main__info-posted']}>Posted {moment.utc(currentPost?.createdAt).fromNow()}.</p>
                                </div>
                                <div className={styles['main__info-right']}>
                                    <h3 className={styles['main__info-price']}>€ {salaryFrom}—{salaryTo}0</h3>
                                    <p className={styles['main__info-peryear']}>Brutto, per year</p>
                                </div>
                            </div>
                            <div className={styles['main__description']}>
                                <p className={styles['main__description-text']}>{!!description && description[0]}</p>
                                <h3 className={styles['main__description-title']}>{!!description && description[1]}</h3>
                                <p className={styles['main__description-text']}>{!!description && description[2]}</p>
                                <p className={styles['main__description-text']}>{!!description && description[2]}</p>
                                <p className={styles['main__description-text']}>{!!description && description[2]}</p>
                                <h1 className={styles['main__description-title']}>{!!description && description[3]}</h1>
                                <h3 className={styles['main__description-subtitle']}>Our physicians enjoy a wide range of benefits, including:</h3>
                                <ul>
                                    {currentPost?.benefits.map(benefit => (
                                        <li key={benefit} className={styles['main__description-benefits']}>{benefit}</li>
                                    ))}
                                </ul>
                                <button className={styles['main__description-button']}>Apply now</button>
                            </div>
                            <div className={styles['main__lists']}>
                                <div className={styles['main__employment']}>
                                    <h1 className={styles['main__employment-title']}>Additional info</h1>
                                    <h3 className={styles['main__employment-subtitle']}>Employment type</h3>
                                    <div className={styles['main__employment-list']}>
                                        {currentPost?.employment_type.map(item => (
                                            <p key={item} className={styles['main__employment-type']}>{item}</p>
                                        ))}
                                    </div>
                                    <h3 className={styles['main__employment-subtitle']}>Benefits</h3>
                                    <div className={styles['main__employment-list']}>
                                        {currentPost?.benefits.map(item => (
                                            <p key={item} className={styles['main__employment-benefits']}>{item}</p>
                                        ))}
                                    </div>
                                </div>
                                <div className={styles['main__images']}>
                                    <h1 className={styles['main__images-title']}>Attached images</h1>
                                    <div className={styles['main__images-block']}>
                                        <div className={styles['main__images-list']}>
                                            {currentPost?.pictures.map((picture, index) => (
                                                <img key={index} className={styles['main__images-image']} src={picture} alt="picsum" />
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className={styles['fullpost__map']}>
                            {screenWidth <= 414 && <h1 className={styles['map__title']}>Contacts</h1>}
                            <div className={styles['map__wrapper']}>
                                <div className={styles['map__block']}>
                                    <h1 className={styles['map__block-title']}>Department name. <br />{currentPost?.name}.</h1>
                                    <div className={styles['map__block-location']}>
                                        <svg
                                            width="13"
                                            height="19"
                                            viewBox="0 0 13 19"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M13 6.35C13 3.11913 10.0899 0.5 6.5 0.5C2.91015 0.5 0 3.11913 0 6.35C0 8.40818 1.97835 12.1977 5.93506 17.7184L6.5 18.5L7.33778 17.3361L7.61735 16.9406C11.2058 11.8403 13 8.31006 13 6.35ZM3.25 6.76087C3.25 5.03198 4.70507 3.63043 6.5 3.63043C8.29493 3.63043 9.75 5.03198 9.75 6.76087C9.75 8.48976 8.29493 9.8913 6.5 9.8913C4.70507 9.8913 3.25 8.48976 3.25 6.76087Z" fill="white" fillOpacity="0.669635" />
                                        </svg>
                                        <p className={styles['map__block-text']}>{currentPost?.address}</p>
                                    </div>
                                    <p className={styles['map__block-text']}>{currentPost?.phone},</p>
                                    <p className={styles['map__block-text']}>{currentPost?.email}</p>
                                </div>
                                <div className={styles['map__block-map']}>
                                    {isLoaded ? <Map center={center} /> : <Loading />}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link to='/' className={styles['fullpost__back']}>
                        <span className={styles['fullpost__back-button']}>Return to job board</span>
                    </Link>
                </div>
            }
        </>
    )
}

export default PostFullPage





