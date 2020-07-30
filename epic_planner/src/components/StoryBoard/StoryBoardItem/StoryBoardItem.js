import React from 'react';
import styles from './StoryBoardItem.css';

/*
 * \param props.details - A dictionary: {
 *                           'title' : 'some text',
 *                        }
 */
const storyBoardItem = props => (
  <div style={styles.story-board__item} contenteditable="true">
    {props.details['title']}
  </div>
);

export default storyBoardItem;