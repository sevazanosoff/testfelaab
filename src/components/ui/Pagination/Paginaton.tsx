
import React from 'react'
import { PaginationProps } from '../Pagination/Pagination'
import styles from './Pagination.module.scss'
const Pagination: React.FC<PaginationProps> = ({ page, totalPages, changePage }) => {
    const totalPagesArray: Array<number> = []
    for (let i = 0; i < totalPages; i++) {
        totalPagesArray.push(i + 1)
    }

    return (
        <div className={styles['page__wrapper']}>
            <span className={styles['page__arrow-prev']}
                onClick={() => page === 1 ? changePage(page) : changePage(page - 1)}
            ></span>
            {totalPages <= 5
                ?
                totalPagesArray.map((p) =>
                    <div key={p}>
                        <p onClick={() => changePage(p)} className={page === p ? styles['page__current'] : styles['page']}>
                            {p}
                        </p>
                    </div>)
                :
                page <= 3
                    ?
                    <>
                        {
                            totalPagesArray.splice(0, 5).map((p) =>
                                <div key={p}>
                                    <p onClick={() => changePage(p)} className={page === p ? styles['page__current'] : styles['page']}>
                                        {p}
                                    </p>
                                </div>)
                        }
                        <p onClick={() => changePage(totalPages)} className={styles['page__last']}>... {totalPages}</p>
                    </>
                    :
                    page >= totalPages - 2
                        ?
                        <>
                            <p onClick={() => changePage(1)} className={styles['page__first']}>1 ...</p>
                            {
                                totalPagesArray.splice(totalPages - 4, 4).map((p) =>
                                    <div key={p}>
                                        <p onClick={() => changePage(p)} className={page === p ? styles['page__current'] : styles['page']}>
                                            {p}
                                        </p>
                                    </div>)
                            }
                        </>
                        :
                        <>
                            <p onClick={() => changePage(1)} className={styles['page__first']}>1 ...</p>
                            {
                                totalPagesArray.splice(page - 2, 4).map((p) =>
                                    <div key={p}>
                                        <p onClick={() => changePage(p)} className={page === p ? styles['page__current'] : styles['page']}>
                                            {p}
                                        </p>
                                    </div>)
                            }
                            <p onClick={() => changePage(totalPages)} className={styles['page__last']}>... {totalPages}</p>
                        </>
            }
            <span className={styles['page__arrow-next']}
                onClick={() => page === totalPages ? changePage(page) : changePage(page + 1)}
            ></span>
        </div >
    )
}

export default Pagination




















// import React from 'react';
// import { PaginationProps } from '../Pagination/Pagination';

// import styles from './Pagination.module.scss'




// const Pagination: React.FC<PaginationProps> = ({ onChangePage, pageCount, totalPages }) => {
//     const totalPagesArray = []
//     for (let i = 0; i < totalPages; i++) {
//         totalPagesArray.push(i + 1)
//     }

//     return (
//         <div className={styles['page']}>
//             {pageCount !== 1 &&
//                 <span className={styles['page__arrow-prev']}
//                     onClick={() => onChangePage(pageCount - 1)}
//                 ></span>
//             }
//             {totalPagesArray.map((p) =>
//                 <ul key={p} className={styles['page__list']}>
//                     <li
//                         onClick={() => onChangePage(p)}
//                         className={pageCount === p ? styles['page__list-current'] : styles['page__list-item']}
//                     >
//                         {p}
//                     </li>
//                 </ul>
//             )}
//             {pageCount !== totalPages &&
//                 <span className={styles['page__arrow-next']}
//                     onClick={() => onChangePage(pageCount + 1)}
//                 ></span>
//             }
//         </div>
//     );
// }

// export default Pagination;