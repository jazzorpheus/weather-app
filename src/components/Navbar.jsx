import { useState, useRef } from "react";

import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArchiveIcon from "@mui/icons-material/Archive";
import Paper from "@mui/material/Paper";

export default function Navbar() {

  return (
    <footer className="fixed bottom-0 w-screen p-5 bg-gradient-to-t from-blue-950 to-blue-500">
      <nav className="flex justify-around items-center">
          <div>Current</div>
          <div>Map</div>
          <div>Forecast</div>
      </nav>
    </footer>
  )

  // return (
  //   <Box sx={{ pb: 7 }} ref={ref}>
  //     <Paper
  //       sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
  //       elevation={3}
  //     >
  //       <BottomNavigation
  //         showLabels
  //         value={value}
  //         onChange={(event, newValue) => {
  //           setValue(newValue);
  //         }}
  //       >
  //         <BottomNavigationAction label="Current" icon={<RestoreIcon />} />
  //         <BottomNavigationAction label="Map" icon={<FavoriteIcon />} />
  //         <BottomNavigationAction label="Forecast" icon={<ArchiveIcon />} />
  //       </BottomNavigation>
  //     </Paper>
  //   </Box>
  // );
}
