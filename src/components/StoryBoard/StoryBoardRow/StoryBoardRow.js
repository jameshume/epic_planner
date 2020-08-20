import React from 'react';
import styles from './StoryBoardRow.module.css';
import StoryBoardColumn from '../StoryBoardColumn/StoryBoardColumn.js';
import PropTypes from 'prop-types';

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
 */
const storyBoardRow = props => {
  const columns = props.columns.map((col_inf, col_idx) => (
    <StoryBoardColumn
      key={'sbc' + props.row_idx + '_' + col_idx}
      row_idx={props.row_idx}
      col_idx={col_idx}
      items={col_inf}
      onNewItemClick={props.onNewItemClick}
      onDeleteItemClick={props.onDeleteItemClick}
      onItemClick={props.onItemClick}
      selection={props.selection}
    />
  ));

  // Must use a fragment as the items need to be individually laid out
  // to place into the grid correctly.
  const s = {display: 'flex'};
  let headerStyles = [styles.row_header]
  if (props.selection && (props.selection[0] === "rowheader"))
  {
    headerStyles.push(styles.row_header_selected)
  }

  return (
    <React.Fragment>
      <div className={headerStyles.join(' ')}>
        <div 
          className={styles.row_header_title}
          onClick={() => props.onRowHeaderClick(props.row_idx)}
        >
          {props.title}
        </div>
        <div style={s}>
          <div         
            className={styles.row_inserter}
            onClick={() => props.onNewRowClick(props.row_idx)}
          >
            <span role='img' aria-label='insert new row'>&#10133;</span>
          </div>
          <div         
            className={styles.row_inserter}
            onClick={() => props.onDeleteRowClick(props.row_idx)}
          >
            <div role='img' aria-label='delete this row'>-</div>
          </div>
        </div>
      </div>
      {columns}
    </React.Fragment>
  );
};

storyBoardRow.propTypes = {
  title: PropTypes.string.isRequired,
  row_idx: PropTypes.number.isRequired,
  columns: PropTypes.array.isRequired,
  onNewItemClick: PropTypes.func.isRequired,
  onNewRowClick: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
  onRowHeaderClick: PropTypes.func.isRequired,
  onDeleteRowClick: PropTypes.func.isRequired,
  selection: PropTypes.array,
};

export default storyBoardRow;