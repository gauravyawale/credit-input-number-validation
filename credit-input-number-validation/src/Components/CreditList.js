import React from "react";
import { Typography, Button, Box } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const CreditList = ({ list, handleDelete, handleEdit }) => {
  return (
    <Box sx={{ width: "600px", marginLeft: "24px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ marginRight: "4px" }}>Sr. No.</Typography>
        <Typography sx={{ marginRight: "100px"}}>Credit Crad Number</Typography>
        <Typography sx={{marginRight:"50px"}}>Edit/Delete</Typography>
      </Box>
      {list.map((obj, idx) => {
        return (
            <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
            key={obj.id}
            >
            <Typography sx={{ marginRight: "4px" }}>{idx + 1}</Typography>
            <Typography sx={{ marginRight: "20px", letterSpacing: "4px" }}>
              {obj.creditNumber}
            </Typography>
            <Box>
              <Button
                sx={{ margin: "4px", padding: "2px" }}
                variant="outlined"
                color="primary"
                onClick={() => handleEdit(obj.id, obj.creditNumber)}
                endIcon={<EditIcon />}
              >
                Edit
              </Button>
              <Button
                sx={{ margin: "4px", padding: "2px" }}
                variant="outlined"
                color="error"
                onClick={() => handleDelete(obj.id)}
                endIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default CreditList;
