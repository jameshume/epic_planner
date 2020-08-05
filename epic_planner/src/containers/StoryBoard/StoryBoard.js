// TODO - THIS NEEDS A WHILE LOAD OF CLEANUP!!!!
import React from 'react';
import styles from './StoryBoard.module.css';
import stylesCommon from '../../common/StoryBoardCommon.module.css';
import StoryBoardRow from '../../components/StoryBoard/StoryBoardRow/StoryBoardRow.js';

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
   * Do I REALLY need to do this?!
   */
  deepCopyStateRows = (state) => {
    let newRows = [];
    for (let r = 0; r < state.rows.length; ++r) {
      let colCopy = [];
      for (let c = 0; c < state.rows[r].length; ++c) {
        let dicts = [];
        for (let d = 0; d < state.rows[r][c].length; ++d) {
          dicts.push({...state.rows[r][c][d]});
        }
        colCopy.push(dicts);
      }
      newRows.push(colCopy);
    }
    return newRows;
  };

  /*
   *
   */
  renderColumnHeadings = () => {
    const headingsClassNames = [
      styles.column_header,
      stylesCommon.scrollable
    ].join(' ');
  
    return this.state.columnHeadings.map(
      (colTitle, colIdx) => (
          <div
            className={headingsClassNames}
            key={'ch' + colIdx}
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
      ), this.state.columnHeadings);
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
          // TODO!
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
            storypoints: 0,
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
          storypoints: 0,
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
      (prevState, props) => ({
        selectedElement: {
          title: prevState.rows[rowIdx][colIdx][itemIdx].title,
          description: prevState.rows[rowIdx][colIdx][itemIdx].description,
          storypoints: prevState.rows[rowIdx][colIdx][itemIdx].storypoints,
          type: ElementType.ITEM,
          rowIdx: rowIdx,
          colIdx: colIdx,
          itemIdx: itemIdx,
        }
      }));
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
          storypoints: '',
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
             [this.state.selectedElement.itemIdx].storypoints = evt.target.value;
      let newPropWin = {...this.state.selectedElement};
      newPropWin.storyPoints = evt.target.value;
      this.setState({
        rows:newRows,
        selectedElement: newPropWin
      });
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
        </div>
      </React.Fragment>  
    );
  }
}

export default StoryBoard;