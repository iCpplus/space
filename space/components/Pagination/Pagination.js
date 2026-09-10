import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useLang } from 'context/LanguageContext';

const Pagination = function ({ currentPage = 1, totalPageNumber = 1 }) {
    const { homeLink } = useLang();

    // `homeLink` always ends with a slash (e.g. `/` or `/en/`).
    const pageLink = (pageNum) => (pageNum <= 1 ? homeLink : `${homeLink}${pageNum}/`);

    const befMark =
        currentPage === 1 ? (
            <span className="disabled">&laquo;</span>
        ) : (
            <Link href={pageLink(currentPage - 1)}>&laquo;</Link>
        );
    const nextMark =
        currentPage === totalPageNumber ? (
            <span className="disabled">&raquo;</span>
        ) : (
            <Link href={pageLink(currentPage + 1)}>&raquo;</Link>
        );

    return (
        <div className="pagination">
            {befMark}
            {Array.from({ length: totalPageNumber })
                .map((_, ind) => ind + 1)
                .map((pageNum) => {
                    return pageNum === currentPage ? (
                        <span key={`pageNum-${pageNum}`} className="active">
                            {pageNum}
                        </span>
                    ) : (
                        <Link key={`pageNum-${pageNum}`} href={pageLink(pageNum)}>
                            {pageNum}
                        </Link>
                    );
                })}
            {nextMark}
        </div>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number,
    totalPageNumber: PropTypes.number,
};

export default Pagination;
