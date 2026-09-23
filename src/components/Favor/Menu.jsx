import "./favor.css";
import "../../index.css";
import React, { Component } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

const Menu = ({ favors }) => {
  return (
    <Box sx={{ minWidth: 240 }}>
      <List disablePadding>
        {favors?.map((fav) => (
          <ListItem key={fav.favor} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              sx={{
                borderRadius: 2,
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "#fff",
                justifyContent: "space-between",
                "&:hover": { bgcolor: "rgba(255, 255, 255, 0.05)" },
              }}
            >
              <ListItemText
                primary={fav.favor}
                primaryTypographyProps={{
                  fontSize: "1.1rem",
                }}
              />

              <Typography sx={{ color: "#930270", fontWeight: "bold" }}>
                +
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Typography
        variant="h5"
        sx={{ color: "#fff", mt: 2, textTransform: "uppercase" }}
      >
        Стрижка
      </Typography>
    </Box>
  );
};

export default Menu;
