import React from 'react';
import styles from './StoryBoardItem.module.css';

/*
 * \param props.details - A dictionary: {
 *                           'title' : 'some text',
 *                        }
 */
const storyBoardItem = props => {
  return (
  <div className={styles.item}>
    {props.details['title']}
  </div>
)};

export default storyBoardItem;