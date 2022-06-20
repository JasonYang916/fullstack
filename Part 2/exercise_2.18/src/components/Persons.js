import React from 'react'

const Persons = ({person, func}) =>
  <p> {person.name} {person.number} <button onClick={func}>delete</button> </p>

export default Persons