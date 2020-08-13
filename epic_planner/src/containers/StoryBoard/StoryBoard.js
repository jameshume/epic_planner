// TODO - THIS NEEDS A WHILE LOAD OF CLEANUP!!!!
import React from 'react';
import styles from './StoryBoard.module.css';
import stylesCommon from '../../common/StoryBoardCommon.module.css';
import StoryBoardRow from '../../components/StoryBoard/StoryBoardRow/StoryBoardRow.js';
import {ArrowPad, ArrowsEnum} from '../../components/ArrowPad/ArrowPad.js';

const ElementType = {
  NONE: 'none',
  ITEM: 'item',
  COLHEADER: 'colheader',
  ROWHEADER: 'rowheader',
}


/*
 * The storyboard is just a grid of items. The first row consists
 * of the column headings and the first column consists of the row
 * headings. Every other cell will contain a set of tickets associated
 * with the row/col.
 */
class StoryBoard extends React.Component
{
  state = {
    columnHeadings: ["Type title here"],
    rowHeadings: ["Type title here"],
    /* Rows is a 3D array: rows[row][col][item] */
    rows: [   /*<< List of lists. Each inner list represents a row. */
      [       /*<< This inner list represents the first row - the must always be at least 1 blank row */
        [     /*<< The row will be a list of columns, where each column is also a list */
          {}  /*<< Each dictionary in the column represents a ticket/item. The dictionary members are
               *   documented in StoryBoardItem.js */
        ]
      ] 
    ],

    // TODO: This is a conflation of selected element and property window!git 
    selectedElement: {  /*<< This represents the selected block, a ticket/item, row or column header */
      title: '',        /*<< The title is the title in the properties window, not the element! */
      description: '',
      storyPoints: 0,
      type: ElementType.NONE,
      rowIdx: -1,
      colIdx: -1,
      itemIdx: -1,
    },
  }

  /*
   * Does a deep copy of the rows, which is a 3D array: rows[row][col][item], where]
   * each item is a dictionary of properties such as title, description etc. This is
   * deep copied so that state is not directly modified.
   * 
   * TODO: This seems like a rather inefficient thing to have to do. Perhaps there is
   * a way to work around this?
   */
  deepCopyStateRows = (state) => {
    let rowsCopy = [];
    for (let r = 0; r < state.rows.length; ++r) {
      let colCopy = [];
      for (let c = 0; c < state.rows[r].length; ++c) {
        let itemsCopy = [];
        for (let d = 0; d < state.rows[r][c].length; ++d) {
          itemsCopy.push({...state.rows[r][c][d]});
        }
        colCopy.push(itemsCopy);
      }
      rowsCopy.push(colCopy);
    }
    return rowsCopy;
  };

  /*
   *
   */
  renderColumnHeadings = () => {
    const headingsClassNames = [
      styles.column_header,
      stylesCommon.scrollable
    ];

    return this.state.columnHeadings.map(
      (colTitle, colIdx) => {
        let thisClassName = [...headingsClassNames];
        if (
          (this.state.selectedElement.type === "colheader")
          && (this.state.selectedElement.colIdx === colIdx)
        )
        {
          thisClassName.push(styles.column_header_selected);
        }
        return (
          <div
            className={thisClassName.join(' ')}
            key={'ch' + colIdx}
            onClick={() => this.onColumnHeaderClicked(colIdx)}
          >
            {colTitle}
            <div 
              className={styles.delete_button}
              onClick={(e) => {e.stopPropagation(); 
                               this.deleteColumn(colIdx);
                              }
                      }
            >
              <span role='img' aria-label='delete'>&#128473;</span>
            </div>
          </div>
      )}, this.state.columnHeadings);
  };



  /************************************************************************************************
   * DELETION EVENTS
   */

  /*
   *
   */
  deleteColumn = (colIdx) => {
    this.setState(
      (prevState, props) => {
        if (prevState.columnHeadings.length > 1) {
          let newColumnHeadings = [...prevState.columnHeadings];
          newColumnHeadings.splice(colIdx, 1);

          let newRows = this.deepCopyStateRows(prevState);
          for( let idx = 0; idx < newRows.length; ++idx) {
            newRows[idx].splice(colIdx, 1);
          }

          return ({
            columnHeadings: newColumnHeadings,
            rows: newRows
          });
        }
        else {
          // There is only one column. Just delete all the tickets in it.
          let newRows = [];
          for( let idx = 0; idx < prevState.rows.length; ++idx) {
            newRows.push([ [] ]);
          }
          return ({
            columnHeadings: ["Title here"],
            rows: newRows
          })
        }
      }
    );
  };


  /*
   *
   */
  deleteRow = (rowIdx) => {
    this.setState(
      (prevState, props) => {
        if (prevState.rowHeadings.length > 1) {
          let newRowHeadings = [...prevState.rowHeadings]
          newRowHeadings.splice(rowIdx, 1);
          let newRows = this.deepCopyStateRows(prevState);
          newRows.splice(rowIdx, 1);
          return ({
            rowHeadings : newRowHeadings,
            rows: newRows
          });
        }
        else {
          return ({
            rowHeadings: ["Type title here"],
            rows: [ [ [] ] ],
          });
        }  
      }
    );
  };


  /*
   *
   */
  deleteItem = (rowIdx, colIdx, itemIdx) => {
    this.setState(
      (prevState, props) => {
        let newRows = this.deepCopyStateRows(prevState);
        newRows[rowIdx][colIdx].splice(itemIdx, 1);

        let newState = {
          rows: newRows,
        };

        if
        (
             (prevState.selectedElement.rowIdx === rowIdx)
          && (prevState.selectedElement.colIdx === colIdx)
          && (prevState.selectedElement.itemIdx === itemIdx)
        )
        {
          newState.selectedElement = {
            title: '',
            description: '',
            storyPoints: 0,
            type: ElementType.NONE,
            rowIdx: -1,
            colIdx: -1,
            itemIdx: -1,
          };
        }

        return (newState);
      }
    );
  };



  /************************************************************************************************
   * INSERTION EVENTS
   */

  /*
   *
   */
  insertNewColumn = () => {
    this.setState(
      (prevState, props) => ({
        columnHeadings: [...prevState.columnHeadings, "new"],
        rows: prevState.rows.map(row => [...row, []])
      })
    );
  };


  /*
   *
   */
  insertNewRow = (rowIdx) => {
    this.setState(
      (prevState, props) => {
        const newCols = Array(prevState.columnHeadings.length).fill([]);
        let newRowHeadings = [...prevState.rowHeadings];
        newRowHeadings.splice(rowIdx+1, 0, "Type title here" );
        let newRows = this.deepCopyStateRows(prevState);
        newRows.splice(rowIdx+1, 0, newCols);
        return ({
          rowHeadings : newRowHeadings,
          rows: newRows
        });
      }
    );
  };


  /*
   *
   */
  insertNewItem = (rowIdx, colIdx) => {
    this.setState(
      (prevState, props) => {
        let newRows = this.deepCopyStateRows(prevState);
        newRows[rowIdx][colIdx].push({
          title: '',
          description: '',
          storyPoints: 0,
        });

        return ({
          rows: newRows
        });
      }
    );
  };



  /************************************************************************************************
   * SELECT EVENTS
   */

  /*
   * A ticket item has been clicked. The selected element needs to be updated as
   * well as the properties window.
   */
  onItemClicked = (rowIdx, colIdx, itemIdx) => {
    this.setState(
      (prevState, props) =>{ 
        return 'title' in prevState.rows[rowIdx][colIdx][itemIdx]  ?
          ({
            selectedElement: {
              title: prevState.rows[rowIdx][colIdx][itemIdx].title,
              description: prevState.rows[rowIdx][colIdx][itemIdx].description,
              storyPoints: prevState.rows[rowIdx][colIdx][itemIdx].storyPoints,
              type: ElementType.ITEM,
              rowIdx: rowIdx,
              colIdx: colIdx,
              itemIdx: itemIdx,
            }
          }) :
          ({
            selectedElement: {
              title: '',
              description: '',
              storyPoints: '',
              type: ElementType.ITEM,
              rowIdx: rowIdx,
              colIdx: colIdx,
              itemIdx: itemIdx,
            }
          })
        });
  };


  /*
   * A row header has been clicked. The selected element needs to be updated as
   * well as the properties window.
   */
  onRowHeaderClicked = (rowIdx) => {
    this.setState(
      (prevState, props) => ({
        selectedElement: {
          title: prevState.rowHeadings[rowIdx],
          description: '',
          storyPoints: '',
          type: ElementType.ROWHEADER,
          rowIdx: rowIdx,
          colIdx:-1,
          itemIdx:-1,
        }
      }));
  }


  /*
   *
   */
  onColumnHeaderClicked = (colIdx) => {
    this.setState(
      (prevState, props) => ({
        selectedElement: {
          title: prevState.columnHeadings[colIdx],
          description: '',
          storyPoints: 0,
          type: ElementType.COLHEADER,
          rowIdx: -1,
          colIdx: colIdx,
          itemIdx: -1,
        }
      }));
  }



  /************************************************************************************************
   * PROPERTY WINDOW UPDATE EVENTS
   */

   /*
   *
   */
  prop_title_change = (evt) => {
    if (this.state.selectedElement.type === ElementType.ITEM)
    {
      let newRows = this.deepCopyStateRows(this.state);
      newRows[this.state.selectedElement.rowIdx]
             [this.state.selectedElement.colIdx]
             [this.state.selectedElement.itemIdx].title = evt.target.value;
      let newPropWin = {...this.state.selectedElement};
      newPropWin.title = evt.target.value;
      this.setState({
        rows:newRows,
        selectedElement: newPropWin
      });
    }
    else if (this.state.selectedElement.type === ElementType.ROWHEADER)
    {
      let newHeaders = [...this.state.rowHeadings]
      newHeaders[this.state.selectedElement.rowIdx] = evt.target.value;
      let newPropWin = {...this.state.selectedElement};
      newPropWin.title = evt.target.value;
      this.setState({
        rowHeadings: newHeaders,
        selectedElement: newPropWin
      })
    }
    else if (this.state.selectedElement.type === ElementType.COLHEADER)
    {
      let newHeaders = [...this.state.columnHeadings]
      newHeaders[this.state.selectedElement.colIdx] = evt.target.value;
      let newPropWin = {...this.state.selectedElement};
      newPropWin.title = evt.target.value;
      this.setState({
        columnHeadings: newHeaders,
        selectedElement: newPropWin
      })
    }
  }


  /*
   *
   */
  prop_description_change = (evt) => {
    if (this.state.selectedElement.type === ElementType.ITEM)
    {
      let newRows = this.deepCopyStateRows(this.state);
      newRows[this.state.selectedElement.rowIdx]
             [this.state.selectedElement.colIdx]
             [this.state.selectedElement.itemIdx].description = evt.target.value;
      let newPropWin = {...this.state.selectedElement};
      newPropWin.description = evt.target.value;
      this.setState({
        rows:newRows,
        selectedElement: newPropWin
      });
    }    
  }

  /*
   *
   */
  prop_storypoints_change = (evt) => {
    if ( (this.state.selectedElement.type === ElementType.ITEM)
      && (!isNaN(evt.target.value.substr(-1)))
    )
    {
      let newRows = this.deepCopyStateRows(this.state);
      newRows[this.state.selectedElement.rowIdx]
             [this.state.selectedElement.colIdx]
             [this.state.selectedElement.itemIdx].storyPoints = evt.target.value;
      let newPropWin = {...this.state.selectedElement};
      newPropWin.storyPoints = evt.target.value;
      this.setState({
        rows:newRows,
        selectedElement: newPropWin
      });
    }    
  };

  moveSelectedItemUp = () => {
    if(this.state.selectedElement.itemIdx > 0) {
      this.setState(
        (prevState, props) => {
          const selEl = prevState.selectedElement;
          let newRows = this.deepCopyStateRows(prevState);
          let selRowCol = newRows[selEl.rowIdx][selEl.colIdx];
          const deletedEl = selRowCol.splice(selEl.itemIdx, 1);
          selRowCol.splice(selEl.itemIdx-1, 0, deletedEl[0]);
          let newSelEl = {...selEl}
          newSelEl.itemIdx -= 1;
          return {
            rows: newRows,
            selectedElement: newSelEl 
          };
        }
      );
    }
    else if (this.state.selectedElement.rowIdx > 0) {
      this.setState(
        (prevState, props) => {
          const selEl = prevState.selectedElement;
          let newRows = this.deepCopyStateRows(prevState);
          let selRowCol = newRows[selEl.rowIdx][selEl.colIdx];
          const deletedEl = selRowCol.splice(selEl.itemIdx, 1);

          let nextRowCol = newRows[selEl.rowIdx - 1][selEl.colIdx];
          nextRowCol.push(deletedEl[0]);

          let newSelEl = {...selEl}
          newSelEl.itemIdx = nextRowCol.length - 1;
          newSelEl.rowIdx -= 1;


          return {
            rows: newRows,
            selectedElement: newSelEl 
          };
        }
      );
    }
  };

  moveSelectedItemDown = () => {
    this.setState(
      (prevState, props) => {
        const selEl = prevState.selectedElement;
        let selRowCol = prevState.rows[selEl.rowIdx][selEl.colIdx];

        if (selEl.itemIdx < selRowCol.length - 1)
        {
          let newRows = this.deepCopyStateRows(prevState);
          selRowCol = newRows[selEl.rowIdx][selEl.colIdx];
          const deletedEl = selRowCol.splice(selEl.itemIdx, 1);
          selRowCol.splice(selEl.itemIdx+1, 0, deletedEl[0]);
          let newSelEl = {...selEl}
          newSelEl.itemIdx += 1;
          return {
            rows: newRows,
            selectedElement: newSelEl 
          };
        }
        else if (selEl.rowIdx < prevState.rowHeadings.length - 1) {
          let newRows = this.deepCopyStateRows(prevState);
          selRowCol = newRows[selEl.rowIdx][selEl.colIdx];
          const deletedEl = selRowCol.splice(selEl.itemIdx, 1);
          let nextRowCol = newRows[selEl.rowIdx + 1][selEl.colIdx];
          nextRowCol.splice(0, 0, deletedEl[0]);
          let newSelEl = {...selEl};
          newSelEl.itemIdx = 0;
          newSelEl.rowIdx += 1;
          return {
            rows: newRows,
            selectedElement: newSelEl 
          };          
        }
        else {
          return { };
        }
      }
    );
  };

  moveSelectedItemRight = () => {
    if(this.state.selectedElement.colIdx < this.state.columnHeadings.length - 1) {
      this.setState(
        (prevState, props) => {
          let newRows = this.deepCopyStateRows(prevState);
          const selEl = prevState.selectedElement;
          let selRowCol = newRows[selEl.rowIdx][selEl.colIdx];
          const deletedEl = selRowCol.splice(selEl.itemIdx, 1);

          newRows[selEl.rowIdx][selEl.colIdx + 1].push(deletedEl[0]);
          let newSelEl = {...selEl};
          newSelEl.itemIdx = newRows[selEl.rowIdx][selEl.colIdx + 1].length - 1;
          newSelEl.colIdx += 1;
          return {
            rows: newRows,
            selectedElement: newSelEl 
          };    
        }
      );
    }
  };

  moveSelectedItemLeft = () => {
    if(this.state.selectedElement.colIdx > 0) {
      this.setState(
        (prevState, props) => {
          let newRows = this.deepCopyStateRows(prevState);
          const selEl = prevState.selectedElement;
          let selRowCol = newRows[selEl.rowIdx][selEl.colIdx];
          const deletedEl = selRowCol.splice(selEl.itemIdx, 1);

          newRows[selEl.rowIdx][selEl.colIdx - 1].push(deletedEl[0]);
          let newSelEl = {...selEl};
          newSelEl.itemIdx = newRows[selEl.rowIdx][selEl.colIdx - 1].length - 1;
          newSelEl.colIdx -= 1;
          return {
            rows: newRows,
            selectedElement: newSelEl 
          };    
        }
      );
    }
  };

  moveColumnRight = () => {

  }

  arrowPadClick = (arrowName) => {
    if (this.state.selectedElement.type === ElementType.ITEM) {
      if (arrowName === ArrowsEnum.UP) {
        this.moveSelectedItemUp();
      }
      else if (arrowName === ArrowsEnum.DOWN) {
        this.moveSelectedItemDown();
      }
      else if (arrowName === ArrowsEnum.LEFT) {
        this.moveSelectedItemLeft();
      }
      else if (arrowName === ArrowsEnum.RIGHT) {
        this.moveSelectedItemRight();
      }
    }
  };

  /*
   *
   */
  render() {
    const inline_style = {
      /* First px for the row header. 28px for final column for the col expander */
      gridTemplateColumns : `130px repeat(${this.state.columnHeadings.length}, 110px) 28px`
    };

    const rows = this.state.rowHeadings.map(
      (rowhead,rowheadIdx)  => {
        return (
          <StoryBoardRow
            key={'sbr' + rowheadIdx}
            title={rowhead}
            row_idx={rowheadIdx}
            columns={this.state.rows[rowheadIdx]}
            onNewItemClick={this.insertNewItem}
            onNewRowClick={this.insertNewRow}
            onDeleteItemClick={this.deleteItem}
            onItemClick={this.onItemClicked}
            onRowHeaderClick={this.onRowHeaderClicked}
            onDeleteRowClick={this.deleteRow}
            selection={
              this.state.selectedElement.rowIdx === rowheadIdx 
                ? [this.state.selectedElement.type, 
                   this.state.selectedElement.colIdx,
                   this.state.selectedElement.itemIdx]
                : null
            }
          />
      )});

    return (    
      <React.Fragment>
        <div className={styles.board_scrollable_container}>
          <div className={styles.board_grid} style={inline_style}>
            <div className={styles.grid_spacer}/>
            {this.renderColumnHeadings()}
            <div className={styles.column_inserter}
                 onClick={this.insertNewColumn}
            >
              <span role='img' aria-label='delete'>&#10133;</span>
            </div>
            {rows}
          </div>
        </div>

        <div className={styles.properties_panel}>
          <p>Properties</p>
          <label>Title:</label>
          <textarea
            value={this.state.selectedElement.title}
            onChange={this.prop_title_change}/>
          <label>Description:</label>
          <textarea
            value={this.state.selectedElement.description}
            onChange={this.prop_description_change}
          />
          <label>Story points:</label>
          <input
            value={this.state.selectedElement.storyPoints}
            onChange={this.prop_storypoints_change}
          />

          <ArrowPad clicked={this.arrowPadClick}/>
        </div>
      </React.Fragment>  
    );
  }
}

export default StoryBoard;