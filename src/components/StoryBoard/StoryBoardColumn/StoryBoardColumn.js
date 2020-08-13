import React from 'react';
import styles from './StoryBoardColumn.module.css';
import StoryBoardItem from '../StoryBoardItem/StoryBoardItem.js';

/*
 * \param props.row_idx - the row index. starts at 1. index 0 is the col heading
 * \param props.col_idx - the col index. starts at 1. index 0 is row title
 * \param props.items   - list of dictionaries describing the ticket items in
 *                        this column.
 * \param props.onNewItemClick
 * onItemClick
 * selection null or list [type, colidx, itemIdx]
 */
const storyBoardColumn = props => {
    const items = props.items.map((item, item_idx) => {
      return (
        <StoryBoardItem
          key={'sbi_' + props.row_idx + '_' + props.col_idx + '_' + item_idx}
          details={props.items[item_idx]}
          row_idx={props.row_idx}
          col_idx={props.col_idx}
          item_idx={item_idx}
          onDeleteItemClick={props.onDeleteItemClick}
          onItemClick={props.onItemClick}
          selection={props.selection}
        />
      );
    });

    return (
     <div className={styles.column}>
        {items}
        <div
          className={styles.row_inserter}
          onClick={() => props.onNewItemClick(props.row_idx, props.col_idx)}
        >
          <span role='img' aria-label='insert new column'>&#10133;</span>
        </div>
      </div>
    );
};

export default storyBoardColumn;