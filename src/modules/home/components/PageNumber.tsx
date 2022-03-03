import React, { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';

interface Props {
  onClickPage: (index?: number) => (e: any) => void;
  currentPage: number;
  numberPage: number;
}

const PageNumber = (props: Props) => {
  const { onClickPage, currentPage, numberPage } = props;
  const [pages, setPages] = useState<any[]>([]);

  useEffect(() => {
    const a = Array.from({ length: numberPage - 1 }, (_, i) => ++i);
    setPages(a);
  }, []);

  return (
    <>
      <Pagination>
        <Pagination.Prev disabled={currentPage === 0} id="prev" onClick={onClickPage()} />
        {numberPage < 5 ? (
          pages.map((page, index) => (
            <Pagination.Item
              onClick={onClickPage(page)}
              activeLabel={page + ''}
              active={page === currentPage}
              key={page}
            >
              {page + 1}
            </Pagination.Item>
          ))
        ) : (
          <>
            <Pagination.Item onClick={onClickPage(0)} activeLabel={0 + ''} active={0 === currentPage}>
              {1}
            </Pagination.Item>
            {currentPage >= 3 ? (
              <>
                {currentPage < numberPage - 3 ? (
                  <>
                    <Pagination.Ellipsis />
                    {pages.slice(currentPage - 1, currentPage + 1).map((page, index) => {
                      return (
                        <>
                          <Pagination.Item
                            onClick={onClickPage(page)}
                            activeLabel={page + ''}
                            active={page === currentPage}
                            key={page}
                          >
                            {page + 1}
                          </Pagination.Item>
                        </>
                      );
                    })}
                    <Pagination.Ellipsis />
                  </>
                ) : (
                  <>
                    <Pagination.Ellipsis />
                    {pages.slice(currentPage - 3, currentPage).map((page, index) => {
                      return (
                        <>
                          <Pagination.Item
                            onClick={onClickPage(page)}
                            activeLabel={page + ''}
                            active={page === currentPage}
                            key={page}
                          >
                            {page + 1}
                          </Pagination.Item>
                        </>
                      );
                    })}
                  </>
                )}
              </>
            ) : (
              <>
                {pages.slice(0, 3).map((page, index) => {
                  return (
                    <>
                      <Pagination.Item
                        onClick={onClickPage(page)}
                        activeLabel={page + ''}
                        active={page === currentPage}
                        key={page}
                      >
                        {page + 1}
                      </Pagination.Item>
                    </>
                  );
                })}
                <Pagination.Ellipsis />
              </>
            )}
            <Pagination.Item
              onClick={onClickPage(numberPage)}
              activeLabel={numberPage + ''}
              active={numberPage === currentPage}
            >
              {numberPage}
            </Pagination.Item>
          </>
        )}
        <Pagination.Next disabled={numberPage - 1 === currentPage} id="next" onClick={onClickPage()} />
      </Pagination>
    </>
  );
};

export default PageNumber;
