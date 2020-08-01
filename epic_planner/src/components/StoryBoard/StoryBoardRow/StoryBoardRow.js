import React from 'react';
import styles from './StoryBoardRow.module.css';
import StoryBoardColumn from '../StoryBoardColumn/StoryBoardColumn.js';

/*
 * The row is a row in the CSS grid that lays out the story board. The first
 * cell in this row of the grid is the header for the row. Each subsequent
 * cell in the row will contain a flexbox that contains the items for the
 * column in question.
 * 
 * The relationship between rows and columns is this:
 *       1       *
 * +-----+       +--------+
 * | Row |------>| Column |
 * +-----+       +--------+
 * 
 * The rows fit into the grid like so:
 * +-------------+-----------+-----------+ ... +-----------+
 * |             | Col Hdr 1 | Col Hdr 2 |     | Col Hdr M |
 * +-------------+-----------+-----------+ ... +-----------+
 * | Row 1 Title |           |           |     |           |
 * +-------------+-----------+-----------+ ... +-----------+
 * | Row 2 Title |           |           |     |           |
 * +-------------+-----------+-----------+ ... +-----------+
 * :             :           :           :     :           :
 * +-------------+-----------+-----------+ ... +-----------+
 * | Row N Title |           |           |     |           |
 * +-------------+-----------+-----------+ ... +-----------+
 * 
 * Each row is just a set of M+1 elements that are auto-laid out in the
 * grid container. The first element is the row title and the subsequent
 * M elements define the tickets in its row/col.
 * 
 * \param props.title     The title for this row.
 * \param props.row_idx   The index of this row. The rows start at 1 as
 *                        0 is the header row..
 * \param props.columns   A list of columns. Each column is represented
 *                        as a list of items, where each item is a dict.
 * \param props.onNewItemClick
 * \param props.onNewRowClick
 */
const storyBoardRow = props => {
  const columns = 
    props.columns.map(
      (col_inf, col_idx) => {
        console.log("@@@", col_inf, col_idx)
        return (
          <StoryBoardColumn
            key={'sbc' + props.row_idx + '_' + col_idx}
            row_idx={props.row_idx}
            col_idx={col_idx}
            items={col_inf}
            onNewItemClick={props.onNewItemClick}
            onDeleteItemClick={props.onDeleteItemClick}
          />
        )});

  // Must use a fragment as the items need to be individually laid out
  // to place into the grid correctly.
  return (
    <React.Fragment>
      <div className={styles.row_header}>
        <div className={styles.row_header_title}>
          {props.title}
        </div>
        <div
          className={styles.row_inserter}
          onClick={() => props.onNewRowClick(props.row_idx)}
        >&#10133;
        </div>
      </div>
      {columns}
    </React.Fragment>
  );
};

export default storyBoardRow;