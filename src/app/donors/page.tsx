"use client";

import {
  Box,
  CircularProgress,
  Grid,
  Avatar,
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  IconButton,
  useTheme,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { PhotoCamera, Edit, SaveAlt } from "@mui/icons-material";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const updateUser = {
  address: "123 Main Street",
  contactNumber: "1234567890",
  dateOfBirth: "31st August, 2023",
  email: "kamaradennis36@gmail.com",
  specialization: "bone specialist",
  firstName: "Dennis",
  bloodGroupName: "A+",
  gender: "male",
  groupName: "O+",
  volume: 20,
  lastName: "Kamara",
  profileImage:
    null ||
    "https://www.bing.com/th?id=OIP.rq0bLboVfwhtwS9EnvZ0CAHaJl&w=76&h=100&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
  role: "patient",
};

type DonorDetail = {
  donor: Donor;
  bloodGroup: BloodGroup;
};

function Donors() {

  const [donors, setDonors] = useState<DonorDetail[] | null>();
  const [isLoading, setIsLoading] = useState(false);

  const handleRefetch = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/donors", { cache: "no-cache" });
      const data = await response.json();
      console.log(data);
      setDonors(data.donors);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleRefetch()
  }, []);

  if (!donors) {
    return (
      <Box
        sx={{
          height: "95vh",
          minWidth: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <CircularProgress color="primary" size={30} />
        <Typography sx={{ fontWeight: "bold", color: "primary.main" }}>
          LOADING...
        </Typography>
      </Box>
    );
  }
  return (
    <Box>
    <Grid container spacing={4} sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
       <Typography variant="h4" sx={{marginTop: 15,marginBottom: 5}}>List of Donors</Typography>
      { donors.map((donor, index) => (
        <Grid item component={Paper} key={index} xs={12} sm={6} lg={4}>
           <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              marginTop: 5,
              marginLeft: 0,
            }}
           >
            <div>
            <Avatar
                  alt={`${donor.donor.firstName || updateUser.firstName} ${ donor.donor.lastName || updateUser.lastName}'s profile`}
                  src={donor.donor.profileImage || updateUser.profileImage || "/default-avatar.png"}
                  sx={{
                    maxWidth: "200px",
                    minWidth: "100px",
                    marginLeft: -2,
                    marginTop: { xs: 0, sm: -38 },
                    width: "100px", // Make the width 100%
                    height: "100px",
                    borderRadius: "100%", // Rounded edges
                    cursor: "pointer",
                  }}
                />
            </div>
            <Box sx={{marginTop: -8, marginLeft: 2}}>
            <Typography variant="h4" sx={{marginBottom: 1, marginRight: 1}}>
            {`Mr ${donor.donor.firstName}${donor.donor.lastName}` || `${updateUser.firstName} ${updateUser.lastName}`}
            </Typography>
            <Divider/>
            <List>
               <ListItem>
               <ListItemText
                    primary="BloodType"
                    secondary={donor?.bloodGroup?.groupName || updateUser.groupName}
                  />
               </ListItem>
               <ListItem>
               <ListItemText
                    primary="Volume Donated"
                    secondary={donor?.bloodGroup?.volume || updateUser.volume}
                  />
               </ListItem>
               <ListItem>
               <ListItemText
                    primary="Contact"
                    secondary={donor.donor.contactNumber || updateUser.contactNumber}
                  />
               </ListItem>
               <ListItem>
               <ListItemText
                    primary="Email"
                    secondary={donor.donor.email || updateUser.email}
                  />
               </ListItem>
               <ListItem>
               <ListItemText
                    primary="Gender"
                    secondary={donor.donor.gender|| updateUser.gender}
                  />
               </ListItem>
               <ListItem>
               <ListItemText
                    primary="Address"
                    secondary={donor.donor.address || updateUser.address}
                  />
               </ListItem>
               <ListItem>
               <ListItemText
                    primary="Date Of Birth"
                    secondary={donor.donor.dateOfBirth || updateUser.dateOfBirth}
                  />
               </ListItem>
            </List>
            </Box>
            
           </Box>
        </Grid>
      ))

      }
      
    </Grid>
    </Box>
  );
}

export default Donors;
