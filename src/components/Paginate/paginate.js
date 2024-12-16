import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';


function PaginatedItems({ itemsPerPage, items, ItemsComponent, onClickDelete, onClickShowModal }) {
    const [currentItems, setCurrentItems] = useState(items);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, items]);


    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage % items.length;
        setItemOffset(newOffset);
    };

    return (
        <>
            <ItemsComponent  onClickDelete={onClickDelete} onClickShowModal={onClickShowModal} currentItems={currentItems} itemOffset={itemOffset}/>
            <div className='d-flex justify-content-start my-4'>
                <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                />
            </div>

        </>
    );
}

export default PaginatedItems;