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
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { PhotoCamera, Edit, SaveAlt } from "@mui/icons-material";
import { useState } from "react";
import Swal from "sweetalert2";

type DoctorProfile = {
  doctor: Doctor;
  user: User;
  specialization: Specialization;
};

interface DoctorProfileProps {
  doctor: DoctorProfile;
  onRefetch: () => void;
}

const updateUser = {
  address: "123 Main Street",
  contactNumber: "1234567890",
  dateOfBirth: "31st August, 2023",
  email: "kamaradennis36@gmail.com",
  specialization: "bone specialist",
  firstName: "Dennis",
  gender: "male",
  lastName: "Kamara",
  profileImage:
    null ||
    "https://www.bing.com/th?id=OIP.rq0bLboVfwhtwS9EnvZ0CAHaJl&w=76&h=100&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
  role: "patient",
};
const DoctorProfileDetails: React.FC<DoctorProfileProps> = ({
  doctor,
  onRefetch,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [loading, setLoading] = useState(false);

  const [updateDoctor, setUpdateDoctor] = useState<{
    doctorEmail: string;
    specialization: string;
    doctorId: string;
  }>({
    doctorId: "",
    doctorEmail: "",
    specialization: "",
  });

  const [updateUser, setUpdateUser] = useState<{
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    gender: string;
    contactNumber: string;
    dateOfBirth: string;
    profileImage: string;
  }>({
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    gender: "",
    contactNumber: "",
    dateOfBirth: "",
    profileImage: "",
  });

  const Toast = Swal.mixin({
    toast: true,
    position: "center",
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: false,
  });

  const handleEdit = (doctorprofile: DoctorProfile) => {
    console.log(doctorprofile);
    setIsEditing(true);
    // Initialize editedData with the current doctor data
    setEditedData(updateUser);
    setUpdateDoctor({
      doctorEmail: doctorprofile?.user?.email,
      specialization: doctorprofile?.specialization?.specializationName,
      doctorId: doctorprofile?.doctor?.doctorId,
    })
    setUpdateUser({
      userId: doctorprofile.user?.userId,
      firstName: doctorprofile.user?.firstName,
      lastName: doctorprofile.user?.lastName,
      email: doctorprofile.user?.email,
      address: doctorprofile.user?.address || "",
      gender: doctorprofile.user?.gender,
      contactNumber: doctorprofile.user?.contactNumber,
      dateOfBirth: doctorprofile.user?.dateOfBirth || "",
      profileImage: doctorprofile.user?.profileImage || "",
    });
  };

  ///// performs the put request//////
  async function handleUpdate(userId: string) {
    // Logic to update the appointment
    console.log(updateUser, updateDoctor);
    try {
      setLoading(true)
      const request1 = await fetch (`/api/doctors/${userId}`, {
        method: "PUT",
        body: JSON.stringify(updateDoctor),
        headers: {"Content-Type": "application/json"}
      })
      const request2 = await fetch (`/api/users/${userId}`, {
        method: "PUT",
        body: JSON.stringify(updateUser),
        headers: {"Content-Type": "application/json"}
      })
      const [response1, response2] = await Promise.all([request1, request2])

      const data1 = await response1.json()
      const data2 = await response2.json()

      if (response1.status === 202 && response2.status === 202) {
        Toast.fire({
          icon: "success",
          iconColor: "green",
          text: `${data1?.message} ${data2?.message}`,
        })
      }
      else{
        Toast.fire({
          icon: "error",
          iconColor: "red",
          text: `${data1?.message} ${data2?.message}`,
        })
      }
    
    } catch (error:any) {
      console.log(error.message);
      Toast.fire({
        icon: "error",
        iconColor: "red",
        text: "An error occurred while updating.",
      });
      
    }finally{
        setLoading(false)
        onRefetch()
        setIsEditing(false);
    }
    // Update the appointments state after updating
  }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const file = event?.target?.files[0];
    // if (file) {
    //   setUpdateUser({...updateUser, pictureImage:"file"});
    // }
  };

  return (
    <Box>
      <Paper elevation={3} className="p-4">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 3,
          }}
        >
          <Box sx={{ marginRight: 5 }}>
            {/* Avatar */}
            <div>
              {isEditing ? (
                <label htmlFor="avatar-input">
                  <Avatar
                    alt={`${updateUser.firstName} ${updateUser.lastName}'s profile`}
                    src={updateUser.profileImage}
                    sx={{
                      maxWidth: "200px",
                      minWidth: "160px",
                      marginTop: { xs: 0, sm: -28 },
                      width: "auto", // Make the width 100%
                      height: "auto",
                      borderRadius: "10px", // Rounded edges
                      cursor: "pointer",
                    }}
                  />
                  <input
                    id="avatar-input"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleAvatarChange}
                  />
                  <IconButton color="primary" component="span">
                    <PhotoCamera />
                  </IconButton>
                </label>
              ) : (
                <Avatar
                  alt={`${doctor.user.firstName} ${doctor.user.lastName}'s profile`}
                  src={doctor.user.profileImage || "/default-avatar.png"}
                  sx={{
                    maxWidth: "200px",
                    minWidth: "160px",
                    marginTop: { xs: 0, sm: -33 },
                    width: "auto", // Make the width 100%
                    height: "auto",
                    borderRadius: "10px", // Rounded edges
                    cursor: "pointer",
                  }}
                />
              )}
            </div>
          </Box>
          <Box sx={{ marginTop: -2 }}>
            <Typography variant="h4" component="div">
              {isEditing ? (
                <TextField
                  name="firstName"
                  variant="outlined"
                  label="First Name"
                  sx={{marginLeft: 2,}}
                  size="small"
                  value={updateUser.firstName}
                  onChange={(e) =>
                    setUpdateUser({ ...updateUser, firstName: e.target.value })
                  }
                />
              ) : (
                `Dr. ${doctor?.user.firstName}`
              )}{" "}
              {isEditing ? (
                <TextField
                  variant="outlined"
                  name="lastName"
                  label="Last Name"
                  size="small"
                  sx={{ marginTop: { xs: 1, sm: 1, md: 0, lg: 0 }, marginLeft: {xs:2} }}
                  value={updateUser.lastName}
                  onChange={(e) =>
                    setUpdateUser({ ...updateUser, lastName: e.target.value })
                  }
                />
              ) : (
                doctor?.user.lastName
              )}
            </Typography>
            <Typography variant="subtitle1">
              {isEditing ? (
                <TextField
                    variant="outlined"
                    name="specialization"
                    label="Specialization"
                    sx={{marginTop: 2, marginLeft: 2,}}
                    size="small"
                    value={updateDoctor.specialization}
                    onChange={(e) =>
                      setUpdateDoctor({
                        ...updateDoctor,
                        specialization: e.target.value,
                      })
                    }
                  />
              ) 
              : `${doctor?.specialization?.specializationName}`}{" "}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <List>
              <ListItem>
                {isEditing ? (
                  <TextField
                    variant="outlined"
                    name="contactNumber"
                    label="Phone Number"
                    size="small"
                    value={updateUser.contactNumber}
                    onChange={(e) =>
                      setUpdateUser({
                        ...updateUser,
                        contactNumber: e.target.value,
                      })
                    }
                  />
                ) : (
                  <ListItemText
                    primary="Contact"
                    secondary={doctor?.user?.contactNumber}
                  />
                )}{" "}
              </ListItem>
              <ListItem>
                {isEditing ? (
                  <TextField
                    variant="outlined"
                    name="gender"
                    label="Gender"
                    size="small"
                    value={updateUser.gender}
                    onChange={(e) =>
                      setUpdateUser({ ...updateUser, gender: e.target.value })
                    }
                  />
                ) : (
                  <ListItemText
                    primary="Gender"
                    secondary={doctor?.user?.gender}
                  />
                )}{" "}
              </ListItem>
              <ListItem>
                {isEditing ? (
                  <TextField
                    variant="outlined"
                    name="dateOfBirth"
                    label="Date of Birth"
                    size="small"
                    value={updateUser.dateOfBirth}
                    onChange={(e) =>
                      setUpdateUser({
                        ...updateUser,
                        dateOfBirth: e.target.value,
                      })
                    }
                  />
                ) : (
                  <ListItemText
                    primary="Date of Birth"
                    secondary={new Date(
                      doctor?.user?.dateOfBirth ?? "",
                    ).toLocaleDateString()}
                  />
                )}{" "}
              </ListItem>
              <ListItem>
                {isEditing ? (
                  <TextField
                    variant="outlined"
                    name="address"
                    label="Address"
                    size="small"
                    value={updateUser.address}
                    onChange={(e) =>
                      setUpdateUser({ ...updateUser, address: e.target.value })
                    }
                  />
                ) : (
                  <ListItemText
                    primary="Address"
                    secondary={doctor?.user?.address}
                  />
                )}{" "}
              </ListItem>
              <ListItem>
                {isEditing ? (
                  <TextField
                    variant="outlined"
                    name="address"
                    label="Address"
                    size="small"
                    value={updateUser.address}
                    onChange={(e) =>
                      setUpdateUser({ ...updateUser, address: e.target.value })
                    }
                  />
                ) : (
                  <ListItemText primary="Email" secondary={doctor?.user?.email} />
                )}{" "}
              </ListItem>
            </List>
            <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 2 }}>
              {isEditing ? (
                <LoadingButton
                  size="large"
                  variant="contained"
                  loading={loading}
                  disabled={loading}
                  color="primary"
                  onClick={() => handleUpdate(doctor.user.userId)}
                >
                  <SaveAlt />
                  <span style={{ marginLeft: 5 }}>Save</span>
                </LoadingButton>
              ) : (
                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  onClick={() => handleEdit(doctor)}
                >
                  <Edit /> <span style={{ marginLeft: 5 }}>Edit</span>
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default DoctorProfileDetails;