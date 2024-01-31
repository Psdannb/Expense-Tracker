import {
  query,
  collection,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { useGetUserInfo } from "./useGetUserInfo";
import { db } from "../Config/firebaseConfig";
export const useGetTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionsTotal, setTransactionsTotal] = useState({
    balance: 0.0,
    income: 0.0,
    expense: 0.0,
  });
  const { userId } = useGetUserInfo();
  const transactionCollectionRef = collection(db, "transactions");
  const getTransaction = async () => {
    let unsubscribe;
    try {
      const queryTransactions = query(
        transactionCollectionRef,
        where("userId", "==", userId),
        orderBy("createdAt")
      );
      onSnapshot(queryTransactions, (snaphot) => {
        let docs = [];
        let totalIncome = 0;
        let totalExpense = 0;
        snaphot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;
          docs.push({ ...data, id });
          if (data.transactionType === "expense") {
            totalExpense += Number(data.transactionAmount);
          } else {
            totalIncome += Number(data.transactionAmount);
          }
        });
        setTransactions(docs);
        let netBalance = totalIncome - totalExpense;
        setTransactionsTotal({
          balance: netBalance,
          income: totalIncome,
          expense: totalExpense,
        });
      });
    } catch (err) {
      console.error(err);
    }
    return () => {
      unsubscribe();
    };
  };
  useEffect(() => {
    getTransaction();
  }, []);
  return { transactions, transactionsTotal };
};
