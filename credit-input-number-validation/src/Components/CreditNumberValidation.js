import React, { useState, useEffect, useRef } from "react";
import { Typography, Button, Box} from "@mui/material";
import CreditList from "./CreditList";
import { flexbox } from "@mui/system";
const { v4: uuidv4 } = require("uuid");

const CreditNumberValidation = () => {
  const [cardNumber, setCardNumber] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
  });
  const [creditList, setCreditList] = useState([]);
  const inputRef = useRef(null);
  const [editStatus, setEditStatus] = useState(0);
  const [editNumber, setEditNumber] = useState(0);

  const inputStyle = {
    width: "100px",
    height: "40px",
    letterSpacing: "16px",
    fontSize: "16px",
    padding: "8px",
  };

  const handleInput = (digits, input) => {
    if (isNaN(digits)) {
      alert("Enter only numbres");
    } else {
      if ("input1" === input) {
        setCardNumber({ ...cardNumber, input1: digits });
      } else if ("input2" === input) {
        setCardNumber({ ...cardNumber, input2: digits });
      } else if ("input3" === input) {
        setCardNumber({ ...cardNumber, input3: digits });
      } else if ("input4" === input) {
        setCardNumber({ ...cardNumber, input4: digits });
      }
    }
  };

  const handleSubmit = () => {
    if (
      cardNumber.input1.toString().length === 4 &&
      cardNumber.input2.toString().length === 4 &&
      cardNumber.input3.toString().length === 4 &&
      cardNumber.input4.toString().length === 4
    ) {
      const creditData = {
        id: uuidv4(),
        creditNumber: `${cardNumber.input1}-${cardNumber.input2}-${cardNumber.input3}-${cardNumber.input4}`,
      };

      setCreditList([...creditList, creditData]);
      setCardNumber({
        input1: "",
        input2: "",
        input3: "",
        input4: "",
      });
    } else {
      alert("Number Should be 16 digits");
    }
  };

  const handleOnPaste = (event) => {
    const pasted = event.clipboardData.getData("text/plain");

    setCardNumber({
      input1: parseInt(pasted.slice(0, 4)),
      input2: parseInt(pasted.slice(4, 8)),
      input3: parseInt(pasted.slice(8, 12)),
      input4: parseInt(pasted.slice(12, 16)),
    });
  };

  const handleEdit = (id, number) => {
    setEditStatus(id);
    let num = number.slice(0, 4) + number.slice(5, 9) + number.slice(10, 14) + number.slice(15, 19);
    setEditNumber(num);
  };

  const handleSaveNumber = () => {

    const newCreditList = creditList.map((obj) => {
        if(editStatus === obj.id) {
            return {
                ...obj, creditNumber: `${editNumber.toString().slice(0, 4)}-${editNumber.toString().slice(4, 8)}-${editNumber.toString().slice(8, 12)}-${editNumber.toString().slice(12, 16)}`,
            }
        }
        return obj;
    })
    setCreditList(newCreditList);
    setEditStatus(0);
  }

  const handleDelete = (id) => {
    const newCreditList = creditList.filter((cardObj) => {
      return cardObj.id !== id;
    });
    setCreditList(newCreditList);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, [cardNumber]);

  return (
    <>
      <Box
        component="form"
        autoComplete="off"
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          margin: "16px",
        }}
      >
        <Box>
          <Typography>Credit Card Number :</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "16px",
          }}
        >
          <Box sx={{ margin: "4px" }}>
            <input
              value={cardNumber.input1}
              maxLength={4}
              placeholder="0000"
              style={inputStyle}
              onChange={(e) => handleInput(e.target.value, "input1")}
              ref={
                cardNumber.input1.toString().length === 4 ? undefined : inputRef
              }
              onPaste={handleOnPaste}
            />
          </Box>
          <Box sx={{ margin: "4px" }}>
            <input
              value={cardNumber.input2}
              maxLength={4}
              placeholder="0000"
              style={inputStyle}
              onChange={(e) => handleInput(e.target.value, "input2")}
              ref={
                cardNumber.input1.toString().length === 4 &&
                cardNumber.input2.toString().length !== 4
                  ? inputRef
                  : undefined
              }
            />
          </Box>
          <Box sx={{ margin: "4px" }}>
            <input
              value={cardNumber.input3}
              maxLength={4}
              placeholder="0000"
              style={inputStyle}
              onChange={(e) => handleInput(e.target.value, "input3")}
              ref={
                cardNumber.input2.toString().length === 4 &&
                cardNumber.input3.toString().length !== 4
                  ? inputRef
                  : undefined
              }
            />
          </Box>
          <Box sx={{ margin: "4px" }}>
            <input
              value={cardNumber.input4}
              maxLength={4}
              placeholder="0000"
              style={inputStyle}
              onChange={(e) => handleInput(e.target.value, "input4")}
              ref={
                cardNumber.input3.toString().length === 4 ? inputRef : undefined
              }
            />
          </Box>
        </Box>
        <Box>
          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        </Box>
      </Box>
      {editStatus ? (
          <Box sx={{display:"flex", justifyContent:"flex-start", alignItems:"center",margin:"16px"}}>
          <Typography>Edit Card Number : </Typography>
        <input maxLength={16} value={editNumber} onChange={(e) => setEditNumber(e.target.value)} style={{width:"150px", height:"30px", fontSize:"16px", marginRight:"8px"}}/>
        <Button onClick={handleSaveNumber} variant="contained">Save</Button>
        </Box>
      ) : (
        <CreditList
          list={creditList}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      )}
    </>
  );
};

export default CreditNumberValidation;
