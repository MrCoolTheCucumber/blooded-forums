import React, { Component } from 'react';
import { Link } from 'react-router';

class PageButtons extends Component {

    renderPages = () => {
        const { totalThreads, currentPage, pathName } = this.props;

        var pageNumbers = [];
        var jsxButtons = [];
        const ITEMS_PER_PAGE = 20;

        //calculate total pages
        var TOTAL_PAGES = Math.ceil(totalThreads / ITEMS_PER_PAGE);

        if(currentPage <= 5) {
            //show the first 5 pages
            for(var i = 0; i < TOTAL_PAGES && i < 5; ++i) {
                pageNumbers[i] = i + 1;
            }
        } else if (TOTAL_PAGES - currentPage <= 5) {
            //show the last 5 pages
            for(var k = TOTAL_PAGES; k > (TOTAL_PAGES - 5) && k > 0; --k) {
                pageNumbers.unshift(k);
            }
        } else {
            //show 2 above and 2 below
            for(var l = currentPage - 2; l <= currentPage + 2; ++l) {
                pageNumbers.push(l);
            }
        }

        //fix cursor on active button

        for(var j = 0; j < pageNumbers.length; ++j) {
            var pageNumber = pageNumbers[j];
            if(pageNumber == currentPage) {
                jsxButtons[j] = (<button key={pageNumber} className="page-button page-button-active" disabled>{`${pageNumber}`}</button>);
            } else {
                jsxButtons[j] = (<Link to={`${pathName}?page=${pageNumber}`} key={pageNumber} className="page-button">{`${pageNumber}`}</Link>)
            }
        }

        return jsxButtons;
    };

    render() {
        return (
            <div>
                {this.renderPages()}
            </div>
        );
    }
}

export default PageButtons;