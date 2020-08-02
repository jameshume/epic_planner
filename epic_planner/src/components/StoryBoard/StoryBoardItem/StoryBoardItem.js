import React from 'react';
import styles from './StoryBoardItem.module.css';

/*
 * \param props.details - A dictionary: {
 *                           'title' : 'some text',
 *                        }
 * \param props.row_idx
 * \param props.col_idx
 * \param props.item_idx
 * onItemClick
 */
const storyBoardItem = props => {
  return (
  <div className={styles.item} onClick={()=>props.onItemClick(props.details['title'])}>
    <div 
      className={styles.delete_button}
      onClick={() => props.onDeleteItemClick(props.row_idx, props.col_idx, props.item_idx)}
    ><span role='img' aria-label='delete'>&#128473;</span></div>
    {props.details['title']}
  </div>
)};

export default storyBoardItem;