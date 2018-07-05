import React, { Component } from 'react';

const PayPerView = ({ payperview }) => (
  <div className="tile" key={payperview.id}>
    <h4>{payperview.title}</h4>
    <p>{payperview.body}</p>
  </div>
);

export default PayPerView;
