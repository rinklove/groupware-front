import React, { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import styled from 'styled-components';

const StyledPagination = styled(Pagination)`
  display: flex;
  justify-content: center;
  padding: 2em;
`;

const PagingContainer = ({ pages = [], changePage, currentPage }) => {
  const [displayedPages, setDisplayedPages] = useState([]);
  const [selectedPageVo, setSelectedPageVo] = useState();

  // 페이지 업데이트 함수
  const updateDisplayedPages = () => {
    if (!Array.isArray(pages)) {
      console.error('pages is not an array:', pages);
      return;
    }

    const totalPages = pages.length;

    if (totalPages <= 7) {
      setDisplayedPages(pages);
    } else {
      const maxDisplayCount = 7;
      const startPage = calculateStartPage(totalPages, maxDisplayCount);
      const endPage = calculateEndPage(totalPages, startPage, maxDisplayCount);
      setDisplayedPages(pages.slice(startPage, endPage + 1));
    }
  };

  // 현재 페이지에 맞는 페이지 정보 찾기
  const setSelectedPage = () => {
    const foundPage = displayedPages.find(page => 
      page.boardId === currentPage || (currentPage === null && page.boardId === null)
    );
    setSelectedPageVo(foundPage);
  };

  useEffect(() => {
    updateDisplayedPages();
  }, [pages, currentPage]);

  useEffect(() => {
    setSelectedPage();
  }, [displayedPages, currentPage]);

  const calculateStartPage = (totalPages, maxDisplayCount) => {
    if (totalPages <= maxDisplayCount) return 0;
    return Math.max(0, currentPage - 4);
  };

  const calculateEndPage = (totalPages, startPage, maxDisplayCount) => {
    let endPage = Math.min(totalPages - 1, currentPage + 2);
    if (startPage === 0) {
      endPage = Math.min(maxDisplayCount - 1, totalPages - 1);
    } else if (endPage === totalPages - 1) {
      startPage = Math.max(totalPages - maxDisplayCount, 0);
    }
    return endPage;
  };

  const handlePageChange = (id) => {  
    if (id !== currentPage) {
      changePage(id);
    }
  };

  return (
    <StyledPagination>
      {
        currentPage !== null &&
        <Pagination.First onClick={() => handlePageChange(null)}/>
      }
      <Pagination.Prev onClick={() => handlePageChange(displayedPages[selectedPageVo.page - 2]?.boardId || null)} disabled={currentPage === null} />

      {
        displayedPages.map((pageVo) => (
        <Pagination.Item
          key={pageVo.boardId}
          active={pageVo.boardId === currentPage}
          onClick={() => handlePageChange(pageVo.boardId)}
        >
          {pageVo.page}
        </Pagination.Item>
      ))}

      <Pagination.Next onClick={() => handlePageChange(displayedPages[selectedPageVo.page]?.boardId) || displayedPages[displayedPages.length - 1]?.boardId} disabled={displayedPages[displayedPages.length - 1]?.boardId === currentPage} />
      {
        displayedPages[displayedPages.length - 1]?.boardId !== null &&
        <Pagination.Last onClick={() => handlePageChange(displayedPages[displayedPages.length - 1]?.boardId)} />
      }
    </StyledPagination>
  );
};

export default PagingContainer;
