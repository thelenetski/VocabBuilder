import css from './WordsTable.module.css';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useSelector } from 'react-redux';
import { selectAllWords } from '../../redux/words/selectors';
import sprite from '/sprite.svg';
import { useMediaQuery } from 'react-responsive';
import { Circle } from 'rc-progress';
import { Button, Popover } from '@mui/material';
import { useState } from 'react';

const WordsTable = () => {
  const { results } = useSelector(selectAllWords);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [anchorEl, setAnchorEl] = useState(null);
  const [popoverId, setPopoverId] = useState(null);

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setPopoverId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor('en', {
      cell: info => info.getValue(),
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
      cell: info => info.getValue(),
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
          <>
            <div className={css.progress}>
              <Circle
                percent={info.getValue()}
                strokeWidth={10}
                strokeColor="rgba(43, 214, 39, 1)"
                trailWidth={10}
                trailColor="rgba(212, 248, 211, 1)"
              />
            </div>
          </>
        );
      },
    }),
    columnHelper.accessor('_id', {
      header: () => '',
      cell: info => {
        return (
          <>
            <div className={css.popover}>
              <Button
                size="small"
                onClick={event => handleClick(event, info.getValue())}
              >
                ...
              </Button>
            </div>
          </>
        );
      },
    }),
  ];

  if (!isMobile) {
    columns.push(
      columnHelper.accessor('category', {
        header: () => 'Category',
        cell: info => info.getValue(),
      })
    );
  }

  const table = useReactTable({
    data: results || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    results && (
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
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl || undefined}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <div>{popoverId}</div>
          </Popover>
        </table>
      </div>
    )
  );
};

export default WordsTable;
