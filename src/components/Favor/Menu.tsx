import "./favor.css";
import "../../index.css";
import React, { Component, useEffect } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { setActive } from "../../slices/FavorSlice";
import { useDispatch } from "react-redux";
import { Favors } from "../../App";
import { AppDispatch } from "../../store";

const Menu = ({ favors }: Favors) => {
  const dispatch = useDispatch<AppDispatch>();
  const { t, i18n } = useTranslation();

  return (
    <Box sx={{ minWidth: 240 }}>
      <List disablePadding>
        {favors?.map((fav) => (
          <ListItem key={t(fav.favor)} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              onClick={() => {
                dispatch(setActive(t(fav.favor)));
                console.log(t(fav.favor));
              }}
              sx={{
                borderRadius: 2,
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "#fff",
                justifyContent: "space-between",
                "&:hover": { bgcolor: "rgba(255, 255, 255, 0.05)" },
              }}
            >
              <ListItemText primary={t(fav.favor)} />

              <Typography sx={{ color: "#930270", fontWeight: "bold" }}>
                +
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Menu;
