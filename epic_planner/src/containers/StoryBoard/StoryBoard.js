// TODO - THIS NEEDS A WHILE LOAD OF CLEANUP!!!!
import React from 'react';
import styles from './StoryBoard.module.css';
import styles_common from '../../common/StoryBoardCommon.module.css';
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
    column_headings: ["Type title here"],
    row_headings: ["Type title here"],
    rows: [   /*<< List of lists. Each inner list represents a row. */
      [       /*<< This inner list represents the first row - the must always be at least 1 blank row */
        [     /*<< The row will be a list of columns, where each column is also a list */
          {}  /*<< Each dictionary in the column represents a ticket/item. The dictionary members are
               *   documented in StoryBoardItem.js */
        ]
      ] 
    ],

    // TODO: This is a conflation of selected element and property window!
    selected_element: { /*<< This represents the selected block, a ticket/item, row or column header */
      title: '',        /*<< The title is the title in the properties window, not the element! */
      description: '',
      storypoints: 0,
      type: ElementType.NONE,
      row_idx: -1,
      col_idx: -1,
      item_idx: -1,
    },
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
            <div 
              className={styles.delete_button}
              onClick={(e) => {e.stopPropagation(); 
                               this.delete_column(col_idx);
                              }
                      }
            >
              <span role='img' aria-label='delete'>&#128473;</span>
            </div>
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
  delete_column = (col_idx) => {
    this.setState(
      (prevState, props) => {
        let new_column_headings = [...prevState.column_headings];
        new_column_headings.splice(col_idx, 1);

        let new_rows = this.deepCopyStateRows(prevState);
        for( let idx = 0; idx < new_rows.length; ++idx) {
          new_rows[idx].splice(col_idx);
        }

        return ({
          column_headings: new_column_headings,
          rows: new_rows
        });
      }
    );
  };



  /*
   *
   */
  delete_row = (row_idx) => {
    this.setState(
      (prevState, props) => {
        if (prevState.row_headings.length > 1) {
          let new_row_headings = [...prevState.row_headings]
          new_row_headings.splice(row_idx, 1);
          let new_rows = this.deepCopyStateRows(prevState);
          new_rows.splice(row_idx, 1);
          return ({
            row_headings : new_row_headings,
            rows: new_rows
          });
        }
        else {
          return ({
            row_headings: ["Type title here"],
            rows: [ [ [] ] ],
          });
        }  
      }
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
        new_row_headings.splice(row_idx+1, 0, "Type title here" );
        let newRows = this.deepCopyStateRows(prevState);
        newRows.splice(row_idx+1, 0, newCols);
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
        newRows[row_idx][col_idx].push({
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

  /*
   *
   */
  delete_item = (row_idx, col_idx, item_idx) => {
    this.setState(
      (prevState, props) => {
        let newRows = this.deepCopyStateRows(prevState);
        newRows[row_idx][col_idx].splice(item_idx, 1);

        let new_state = {
          rows: newRows,
        };

        if
        (
             (prevState.selected_element.row_idx === row_idx)
          && (prevState.selected_element.col_idx === col_idx)
          && (prevState.selected_element.item_idx === item_idx)
        )
        {
          new_state.selected_element = {
            title: '',
            description: '',
            storypoints: 0,
            type: ElementType.NONE,
            row_idx: -1,
            col_idx: -1,
            item_idx: -1,
          };
        }

        return (new_state);
      }
    );
  };

  /*
   *
   */
  item_click = (row_idx, col_idx, item_idx) => {
    this.setState(
      (prevState, props) => ({
        selected_element: {
          title: prevState.rows[row_idx][col_idx][item_idx].title,
          description: prevState.rows[row_idx][col_idx][item_idx].description,
          storypoints: prevState.rows[row_idx][col_idx][item_idx].storypoints,
          type: ElementType.ITEM,
          row_idx: row_idx,
          col_idx: col_idx,
          item_idx: item_idx,
        }
      }));
  };

  row_header_click = (row_idx) => {
    this.setState(
      (prevState, props) => ({
        selected_element: {
          title: prevState.row_headings[row_idx],
          description: '',
          storypoints: '',
          type: ElementType.ROWHEADER,
          row_idx: row_idx,
          col_idx:-1,
          item_idx:-1,
        }
      }));
  }

  /*
   *
   */
  prop_title_change = (evt) => {
    if (this.state.selected_element.type === ElementType.ITEM)
    {
      let newRows = this.deepCopyStateRows(this.state);
      newRows[this.state.selected_element.row_idx]
             [this.state.selected_element.col_idx]
             [this.state.selected_element.item_idx].title = evt.target.value;
      let newPropWin = {...this.state.selected_element};
      newPropWin.title = evt.target.value;
      this.setState({
        rows:newRows,
        selected_element: newPropWin
      });
    }
    else if (this.state.selected_element.type === ElementType.ROWHEADER)
    {
      let newHeaders = [...this.state.row_headings]
      newHeaders[this.state.selected_element.row_idx] = evt.target.value;
      let newPropWin = {...this.state.selected_element};
      newPropWin.title = evt.target.value;
      this.setState({
        row_headings: newHeaders,
        selected_element: newPropWin
      })
    }
  }

  /*
   *
   */
  prop_description_change = (evt) => {
    if (this.state.selected_element.type === ElementType.ITEM)
    {
      let newRows = this.deepCopyStateRows(this.state);
      newRows[this.state.selected_element.row_idx]
             [this.state.selected_element.col_idx]
             [this.state.selected_element.item_idx].description = evt.target.value;
      let newPropWin = {...this.state.selected_element};
      newPropWin.description = evt.target.value;
      this.setState({
        rows:newRows,
        selected_element: newPropWin
      });
    }    
  }

  /*
   *
   */
  prop_storypoints_change = (evt) => {
    if ( (this.state.selected_element.type === ElementType.ITEM)
      && (!isNaN(evt.target.value.substr(-1)))
    )
    {
      let newRows = this.deepCopyStateRows(this.state);
      newRows[this.state.selected_element.row_idx]
             [this.state.selected_element.col_idx]
             [this.state.selected_element.item_idx].storypoints = evt.target.value;
      let newPropWin = {...this.state.selected_element};
      newPropWin.storypoints = evt.target.value;
      this.setState({
        rows:newRows,
        selected_element: newPropWin
      });
    }    
  };

  /*
   *
   */
  render() {
    const inline_style = {
      /* First px for the row header. 28px for final column for the col expander */
      gridTemplateColumns : `130px repeat(${this.state.column_headings.length}, 110px) 28px`
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
            onItemClick={this.item_click}
            onRowHeaderClick={this.row_header_click}
            onDeleteRowClick={this.delete_row}
          />
      )});

    return (    
      <React.Fragment>
        <div className={styles.board_scrollable_container}>
          <div className={styles.board_grid} style={inline_style}>
            <div className={styles.grid_spacer}/>
            {this.renderColumnHeadings()}
            <div className={styles.column_inserter} onClick={this.new_column}><span role='img' aria-label='delete'>&#10133;</span></div>
            {rows}
          </div>
        </div>

        <div className={styles.properties_panel}>
          <p>Properties</p>
          <label>Title:</label>
          <textarea
            value={this.state.selected_element.title}
            onChange={this.prop_title_change}/>
          <label>Description:</label>
          <textarea
            value={this.state.selected_element.description}
            onChange={this.prop_description_change}
          />
          <label>Story points:</label>
          <input
            value={this.state.selected_element.storypoints}
            onChange={this.prop_storypoints_change}
          />
        </div>
      </React.Fragment>  
    );
  }
}

export default StoryBoard;