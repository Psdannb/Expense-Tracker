import React, { useState } from "react";
import { useAddTransaction } from "../hooks/useAddTransaction";
import { useGetTransaction } from "../hooks/useGetTransaction";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../Config/firebaseConfig";
const ExpenseTracker = () => {
  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState();
  const [transactionType, setTransactionType] = useState("expense");
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionsTotal } = useGetTransaction();
  const { name, photo } = useGetUserInfo();
  const navigate = useNavigate();
  const handleTransaction = async (e) => {
    e.preventDefault();
    addTransaction({ description, transactionAmount, transactionType });
    setDescription("");
    setTransactionAmount(0);
  };
  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center ">
        <div className="bg-slate-50 lg:w-1/2 w-full">
          <h1 className="ml-2 mt-2 md:text-4xl text-2xl text-slate-600 mx-5">
            {name}'s Expense Tracker
          </h1>
          <div className="flex justify-between md:mt-0 mt-2">
            <div>
              <div className="ml-2 ">
                <h1 className="text-xl text-slate-800">Your Balance</h1>
                <h2 className="ml-1 text-md">Rs {transactionsTotal.balance}</h2>
              </div>
              <div className="ml-2">
                <h4 className="text-xl text-blue-800">Income</h4>
                <p className="ml-1 text-md">Rs {transactionsTotal.income}</p>
              </div>
              <div className="ml-2">
                <h4 className="text-xl text-red-800">Expense</h4>
                <p className="ml-1 text-md">Rs {transactionsTotal.expense}</p>
              </div>
            </div>
            <div className="  h-full w-1/2">
              {photo && (
                <div className="flex  flex-col justify-center items-center">
                  <div className=" mb-4">
                    <img
                      className="profilepic border-2 border-green-500"
                      src={photo}
                    />
                  </div>
                  <div className=" ">
                    <button
                      onClick={signUserOut}
                      className="border border-red-500 rounded-lg p-1 text-sm hover:text-red-600"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <form id="form" className="ml-2 mt-4" onSubmit={handleTransaction}>
            <div className="flex flex-col justify-center gap-2 mb-2 md:block">
              <input
                className="border mr-2 outline-none border-slate-500 rounded "
                type="text"
                placeholder="Description"
                value={description}
                required
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              <input
                className="border mr-2 outline-none border-slate-500 rounded "
                type="number"
                placeholder="Amount"
                value={transactionAmount}
                required
                onChange={(e) => {
                  setTransactionAmount(e.target.value);
                }}
              />
            </div>
            <div className="flex  gap-8">
              <div className="flex items-center">
                <label htmlFor="expense" className="text-sm mr-1">
                  Expense
                </label>
                <input
                  type="radio"
                  id="expense"
                  value="expense"
                  checked={transactionType === "expense"}
                  onChange={(e) => {
                    setTransactionType(e.target.value);
                  }}
                />
              </div>
              <div className="flex items-center">
                <label htmlFor="income" className="text-sm mr-1">
                  Income
                </label>
                <input
                  type="radio"
                  id="income"
                  value="income"
                  checked={transactionType === "income"}
                  onChange={(e) => {
                    setTransactionType(e.target.value);
                  }}
                />
              </div>
            </div>
            <button
              type="submit"
              className="border text-sm rounded p-1 my-2 border-blue-500 hover:text-blue-500 hover:scale-105"
            >
              Add Transaction
            </button>
          </form>
        </div>
      </div>
      <div className=" flex   flex-col items-center mt-2">
        <h3 className="text-4xl text-slate-600">Transactions</h3>
        <div
          className={`${
            transactions.length > 0
              ? "border lg:w-1/2 mt-2 border-slate-400 border-b-0 w-full "
              : "lg:w-1/2 mt-2 w-full"
          }`}
        >
          {transactions.length > 0 ? (
            <div className="flex justify-around border-b-2 items-center border-slate-200 w-full bg-slate-500">
              <h1 className="text-white ml-[-30px] md:ml-[-100px] lg:ml-[-50px]">
                Title
              </h1>
              <h1 className="text-white md:ml-[50px] lg:ml-[75px]">Amount</h1>
              <h1 className="text-white">Type</h1>
            </div>
          ) : (
            ""
          )}
          {transactions.length > 0 ? (
            transactions.map((dataItem, id) => {
              const { description, transactionAmount, transactionType } =
                dataItem;
              return (
                <div
                  key={id}
                  className="flex justify-between border-b-2 items-center border-slate-200"
                >
                  <div className="text-left  w-1/3">
                    <h4 className=" ml-4 text-sm">{description}</h4>
                  </div>
                  <div className="text-left  w-1/3">
                    <p className=" text-sm  md:ml-20 ml-4">
                      Rs {transactionAmount}
                    </p>
                  </div>
                  <div className=" w-1/3 text-center">
                    <p
                      className={`${
                        transactionType === "expense"
                          ? "text-red-500 text-sm"
                          : "text-teal-500 text-sm"
                      }`}
                    >
                      {transactionType}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-lg text-red-900">
              you have not added transactions yet !
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default ExpenseTracker;
