import React from 'react'

const Filter = (props) => {
    return(
      <form onSubmit={props.func}>
        <div>
          filter shown with:
          <input
            value={props.filter}
            onChange={props.handler}
          />
        </div>
      </form>
    )
  }

  export default Filter