import React, { Component } from 'react';
import { Link } from 'react-router';
import { ITEMS_PER_PAGE } from '../../global_constants';

class PageButtons extends Component {

    renderPages = () => {
        const { totalThreads, currentPage, pathName } = this.props;

        const pageNumbers = [];
        const jsxButtons = [];

        //calculate total pages
        const TOTAL_PAGES = Math.ceil(totalThreads / ITEMS_PER_PAGE);

        if(currentPage <= 3) {
            //show the first 5 pages
            for(let i = 0; i < TOTAL_PAGES && i < 5; ++i) {
                pageNumbers[i] = i + 1;
            }
        } else if (TOTAL_PAGES - parseInt(currentPage) <= 3) {
            //show the last 5 pages
            for(let k = TOTAL_PAGES; k > (TOTAL_PAGES - 5) && k > 0; --k) {
                pageNumbers.unshift(k);
            }
        } else {
            //show 2 above and 2 below
            for(let i = currentPage - 2; i <= (parseInt(currentPage) + 2); ++i) {
                pageNumbers.push(i);
            }
        }

        for(let i = 0; i < pageNumbers.length; ++i) {
            var pageNumber = pageNumbers[i];
            if(pageNumber == currentPage) {
                jsxButtons[i] = (<a key={pageNumber} className="page-button page-button-active">{`${pageNumber}`}</a>);
            } else {
                jsxButtons[i] = (<Link to={`${pathName}?page=${pageNumber}`} key={pageNumber} className="page-button">{`${pageNumber}`}</Link>)
            }
        }

        if(!this.containsPage(pageNumbers, 1)) {
            jsxButtons.unshift((<Link to={`${pathName}?page=${1}`} key={1} className="page-button page-button-beginning">{`${1}`}</Link>));
        }

        if(!this.containsPage(pageNumbers, TOTAL_PAGES)) {
            jsxButtons.push((<Link to={`${pathName}?page=${TOTAL_PAGES}`} key={TOTAL_PAGES} className="page-button page-button-end">{`${TOTAL_PAGES}`}</Link>));
        }

        return jsxButtons;
    };

    containsPage = (array, page) => {
        for(let i = 0; i < array.length; ++i) {
            if(array[i] === page) {
                return true;
            }
        }

        return false;
    };

    render() {
        return (
            <div className="page-button-list-wrapper">
                {this.renderPages()}
            </div>
        );
    }
}

export default PageButtons;