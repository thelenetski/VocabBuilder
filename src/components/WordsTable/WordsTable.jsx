import css from './WordsTable.module.css';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllWords } from '../../redux/words/selectors';
import sprite from '/sprite.svg';
import { useMediaQuery } from 'react-responsive';
import { Circle } from 'rc-progress';
import { Button, Popover } from '@mui/material';
import { useEffect, useState } from 'react';
import WordPopoverMenu from '../WordPopoverMenu/WordPopoverMenu';
import { selectIsOpenModal } from '../../redux/modal/selectors';
import { useLocation } from 'react-router-dom';
import { addWord } from '../../redux/words/operations';
import toast from 'react-hot-toast';
import clsx from 'clsx';

const WordsTable = () => {
  const { results } = useSelector(selectAllWords);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [anchorEl, setAnchorEl] = useState(null);
  const [popoverId, setPopoverId] = useState(null);
  const isModalOpen = useSelector(selectIsOpenModal);
  const location = useLocation();
  const dispatch = useDispatch();

  const handleClick = (event, id) => {
    const rect = event.currentTarget.getBoundingClientRect();

    setAnchorEl({
      getBoundingClientRect: () => rect,
      nodeType: 1,
    });
    setPopoverId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    handleClose();
  }, [results, isModalOpen]);

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor('en', {
      cell: info => {
        return <div className={css.cellPadding}>{info.getValue()}</div>;
      },
      header: () => {
        return (
          <div className={css.iconTH}>
            <span>Word</span>
            <svg className={css.flag}>
              <use href={sprite + '#flag-uk'}></use>
            </svg>
          </div>
        );
      },
    }),
    columnHelper.accessor('ua', {
      cell: info => {
        return <div className={css.cellPadding}>{info.getValue()}</div>;
      },
      header: () => {
        return (
          <div className={css.iconTH}>
            <span>Translation</span>
            <svg className={css.flag}>
              <use href={sprite + '#flag-ua'}></use>
            </svg>
          </div>
        );
      },
    }),
    columnHelper.accessor('progress', {
      header: () => <span>Progress</span>,
      cell: info => {
        return (
          <div className={css.progress}>
            {!isMobile && (
              <p style={{ marginRight: '6px' }}>{`${info.getValue()}%`}</p>
            )}
            <Circle
              percent={info.getValue()}
              strokeWidth={12}
              strokeColor="rgba(43, 214, 39, 1)"
              trailWidth={12}
              trailColor="rgba(212, 248, 211, 1)"
            />
          </div>
        );
      },
    }),
    columnHelper.accessor('_id', {
      header: () => '',
      cell: info => {
        if (location.pathname === '/dictionary')
          return (
            <div className={css.popover}>
              <Button
                aria-describedby={info.getValue()}
                className={css.popoverBtn}
                size="small"
                onClick={event => handleClick(event, info.getValue())}
                sx={{ p: 0 }}
              >
                <span className={css.WordPopoverMenuTxt}>•••</span>
              </Button>
            </div>
          );
        if (location.pathname === '/recommended')
          return (
            <div className={clsx(css.popover, css.addWord)}>
              {!isMobile && (
                <p className={css.popoverTitle}>Add to dictionary</p>
              )}
              <button
                onClick={() =>
                  dispatch(addWord(info.getValue())).then(() => {
                    toast.success('Word added successfully');
                  })
                }
              >
                <svg>
                  <use href={sprite + '#arrow-right'}></use>
                </svg>
              </button>
            </div>
          );
      },
    }),
  ];

  if (!isMobile || location.pathname === '/recommended') {
    columns.splice(
      2,
      0,
      columnHelper.accessor('category', {
        header: () => 'Category',
        cell: info => <div className={css.cellPadding}>{info.getValue()}</div>,
      })
    );
  }

  if (location.pathname !== '/dictionary') {
    columns.splice(-2, 1);
  }

  const table = useReactTable({
    data: results || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    results &&
    results.length > 0 && (
      <div className={css.tableWrap}>
        <table>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className={css.tableTH}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className={css.tableTD}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <Popover
          id={popoverId}
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          sx={{
            '& .MuiPaper-root': {
              borderRadius: '15px',
              boxShadow: '0 4px 47px rgba(18, 20, 23, 0.08)',
            },
          }}
        >
          <WordPopoverMenu id={popoverId} />
        </Popover>
      </div>
    )
  );
};

export default WordsTable;
