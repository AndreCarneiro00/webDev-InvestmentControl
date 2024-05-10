import React, { useState, useEffect } from "react";
import api from "./api";

import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./Pages/Home";
import DataInput from "./Pages/DataInput";

const App = () => {
  // const [notes, setNotes] = useState([]);
  // const [formData, setFormData] = useState({
  //   note: 0,
  //   broker: "",
  //   op_date: "",
  //   liq_date: "",
  //   op_type: "",
  //   ticker_type: "",
  //   ticker: "",
  //   quantity: 0,
  //   price: 0,
  //   sell_taxes: 0,
  //   irrf: 0,
  //   liq_fee: 0,
  //   register_fee: 0,
  //   derivative_fee: 0,
  //   ana_fee: 0,
  //   emolumentos: 0,
  //   operational_fee: 0,
  //   execution_fee: 0,
  //   custody_fee: 0,
  //   taxes: 0,
  //   others: 0,
  //   obs: ""
  // });

  // const fetchNote = async () => {
  //   const response = await api.get("/get_all_notes");
  //   setNotes(response.data);
  // };

  // useEffect(() => {
  //   fetchNote();
  // }, []);

  // const handleFormSubmit = async (event) => {
  //   event.preventDefault("/create_note", formData);
  //   await api.post();
  //   fetchNote();
  //   setFormData({
  //     note: 0,
  //     broker: "",
  //     op_date: "",
  //     liq_date: "",
  //     op_type: "",
  //     ticker_type: "",
  //     ticker: "",
  //     quantity: 0,
  //     price: 0,
  //     sell_taxes: 0,
  //     irrf: 0,
  //     liq_fee: 0,
  //     register_fee: 0,
  //     derivative_fee: 0,
  //     ana_fee: 0,
  //     emolumentos: 0,
  //     operational_fee: 0,
  //     execution_fee: 0,
  //     custody_fee: 0,
  //     taxes: 0,
  //     others: 0,
  //     obs: ""
  //   });
  // };

  return (
    <>
      <NavBar />
      <Suspense fallback={<div className="container">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Routes>
          <Route path="/data_input" element={<DataInput />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
