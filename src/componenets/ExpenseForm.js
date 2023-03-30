import React from "react";
import { MdSend } from "react-icons/md";

const ExpenseForm = ({
  charge,
  amount,
  handleCharge,
  handleAmount,
  handleOnSubmit,
  edit,
}) => {
  return (
    <form onSubmit={handleOnSubmit}>
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="charge">charge</label>
          <input
            type="text"
            className="form-control"
            id="charge"
            name="charge"
            placeholder="E.g Rent"
            value={charge}
            onChange={handleCharge}
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">amount</label>
          <input
            type="text"
            className="form-control"
            id="amount"
            name="amount"
            placeholder="E.g 100"
            value={amount}
            onChange={handleAmount}
          />
        </div>
      </div>
      <button type="submit" className="btn">
        {edit ? "Edit" : "Submit"} <MdSend className="btn-icon" />
      </button>
    </form>
  );
};

export default ExpenseForm;
