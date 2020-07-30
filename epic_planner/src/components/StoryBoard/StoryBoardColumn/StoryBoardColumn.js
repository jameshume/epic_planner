import React from 'react';
import styles from './StoryBoardColumn.css';

/*
 * \param props.row_idx - the row index. starts at 1. index 0 is the col heading
 * \param props.col_idx - the col index. starts at 1. index 0 is row title
 * \param props.items   - list of dictionaries describing the ticket items in
 *                        this column.
 */
const storyBoardColumn = props => {
    const items = props.items.map((item, item_idx) => {
      return (
        <StoryBoardItem
          key={'sbi' + props.row_idx + '_' + props.col_idx + '_' + item_idx}
          details={item_dict}
        />
      );
    });

    return (
     <div class="story-board__column">
        {items}
			  <div style={story-board__inserter-row}>+</div>
		  </div>
    );
};

export default storyBoardColumn;