import React from 'react';
import styles from './StoryBoard.module.css';
import styles_common from '../../common/StoryBoardCommon.module.css';
import StoryBoardRow from '../../components/StoryBoard/StoryBoardRow/StoryBoardRow.js';

/*
 * The storyboard is just a grid of items. The first row consists
 * of the column headings and the first column consists of the row
 * headings. Every other cell will contain a set of tickets associated
 * with the row/col.
 */
class StoryBoard extends React.Component
{
  state = {
    column_headings: ["Group 1"],
    row_headings: ["Sprint 1"],
    rows: [ [ [] ] ],
  }

  /*
   *
   */
  deepCopyStateRows = (state) => {
    let newRows = [];
    for (let r = 0; r < state.rows.length; ++r) {
      let col_copy = [];
      for (let c = 0; c < state.rows[r].length; ++c) {
        let dicts = [];
        for (let d = 0; d < state.rows[r][c].length; ++d) {
          dicts.push({...state.rows[r][c][d]});
        }
        col_copy.push(dicts);
      }
      newRows.push(col_copy);
    }
    return newRows;
  };

  /*
   *
   */
  renderColumnHeadings = () => {
    const headingsClassNames = [
      styles.column_header,
      styles_common.scrollable
    ].join(' ');
  
    return this.state.column_headings.map(
      (col_title, col_idx) => (
          <div
            className={headingsClassNames}
            key={'ch' + col_idx}
          >
            {col_title}
          </div>
      ), this.state.column_headings);
  };
  
  /*
   *
   */
  new_column = () => {
    this.setState(
      (prevState, props) => ({
        column_headings: [...prevState.column_headings, "new"],
        rows: prevState.rows.map(row => [...row, []])
      })
    );
  };

  /*
   *
   */
  new_row = (row_idx) => {
    this.setState(
      (prevState, props) => {
        const newCols = Array(prevState.column_headings.length).fill([]);
        let new_row_headings = [...prevState.row_headings];
        new_row_headings.splice(row_idx+1, 0, "NEW" );
        let newRows = this.deepCopyStateRows(prevState);
        newRows.splice(row_idx+1, 0, newCols);
        //newRows.push(newCols);
        return ({
          row_headings : new_row_headings,
          rows: newRows
        });
      }
    );
  };

  /*
   *
   */
  new_item = (row_idx, col_idx) => {
    this.setState(
      (prevState, props) => {
        let newRows = this.deepCopyStateRows(prevState);
        newRows[row_idx][col_idx].push({title : 'new'});
        return ({
          rows: newRows
        });
      }
    );
  };

  delete_item = (row_idx, col_idx, item_idx) => {
    console.log("DELETE ITEM", row_idx, col_idx, item_idx)
    this.setState(
      (prevState, props) => {
        let newRows = this.deepCopyStateRows(prevState);        
        newRows[row_idx][col_idx].splice(item_idx, 1);
        return ({
          rows: newRows
        });
      }
    );
  };

  /*
   *
   */
  render() {
    const inline_style = {
      /* column headings + 1: 1 for the row heading column*/
      gridTemplateColumns : `repeat(${this.state.column_headings.length + 1}, 110px) 28px`
    };

    const rows = this.state.row_headings.map(
      (rowhead,rowhead_idx)  => {
        return (
          <StoryBoardRow
            key={'sbr' + rowhead_idx}
            title={rowhead}
            row_idx={rowhead_idx}
            columns={this.state.rows[rowhead_idx]}
            onNewItemClick={this.new_item}
            onNewRowClick={this.new_row}
            onDeleteItemClick={this.delete_item}
          />
      )});

    return (
      <div className={styles.board_grid} style={inline_style}>
        <div className={styles.grid_spacer}/>
        {this.renderColumnHeadings()}
        <div className={styles.column_inserter} onClick={this.new_column}>&#10133;</div>
        {rows}

      </div>
    );
  }
}

export default StoryBoard;