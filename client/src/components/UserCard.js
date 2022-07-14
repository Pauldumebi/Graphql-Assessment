import React from 'react';

const UserCard = ({ val }) => {
  
  return (
    <>
      <div style={cardStyle}>
        <span style={idStyle}>{val.id}</span>
        <div style={card}>
          <span>{val.firstName}</span>
          <span>{val.age}</span>
          <span>{val.height}</span>
        </div>
      </div>
    </>
  );
}

export default UserCard;

const cardStyle = {
  display: 'flex',
  flexDirection: 'row'
}

const card = {
  display: 'flex',
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: '2rem',
  margin: '1rem 0',
  border: '1px solid black',
}

const idStyle = {
  padding: '2rem',
  margin: '1rem 1rem 1rem 0',
  border: '1px solid black',
}