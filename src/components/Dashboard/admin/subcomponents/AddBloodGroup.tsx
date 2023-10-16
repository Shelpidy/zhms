import { Add } from "@mui/icons-material";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";


const AddBloodGroup = () => {

    const [bloodGroup, setBloodGroup] = useState("")
    const handleClick = () => {
         console.log(bloodGroup)
    }
    return (
        <Box>
            <Typography variant="h4" sx={{textAlign: "center"}}>Add Blood Group</Typography>
             <Box sx={{marginTop: 5, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
             <TextField
              size="small"
              sx={{width: "auto"}}
              label="Blood Group"
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
             />
             <Button 
             variant="contained" 
             color="primary"
             sx={{marginTop: 3}}
             onClick={handleClick}
             >
                <Add/> Add
                </Button>
            </Box>
        </Box>
    )
}

export default AddBloodGroup;