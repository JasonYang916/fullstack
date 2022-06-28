import React from 'react'

const Filter = (props) => {
    return(
      <form onSubmit={props.func}>
        <div>
          find countries
          <input
            value={props.filter}
            onChange={props.handler}
          />
        </div>
      </form>
    )
}

export default Filter