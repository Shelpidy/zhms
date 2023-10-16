"use client";
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  IconButton,
  useMediaQuery,
  useTheme,
  Link,
  Box,
  Divider,
} from "@mui/material";
import {
  FacebookOutlined,
  Twitter,
  Instagram,
  LinkedIn,
  GitHub,
} from "@mui/icons-material";

import AOS from "aos";
import "aos/dist/aos.css";
import { Just_Another_Hand } from "next/font/google";
import Image from "next/image";

type DonorProps = {
  id: number;
  imageUrl: string;
  position: string;
  media: MediaObject;
  name: string;
};

type MediaObject = {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  github?: string;
  instagram?: string;
  link?: string;
};

function DonorComponent({ position, name, media, imageUrl }: DonorProps) {
  const mytheme = useTheme();
  const lessThanTab = useMediaQuery(mytheme.breakpoints.down("md"));

  const aboutImgWidth = lessThanTab ? "66vw" : "22vw";

  React.useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
  // style={{ overflowX: "scroll"}}
  return (
    <Card variant="elevation" data-aos="zoom-in">
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: aboutImgWidth,
              aspectRatio: "1",
              position: "relative",
            }}
          >
            <Image priority src={imageUrl} alt="Donor" fill />
          </div>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              fontFamily="Poppins-Medium"
              className="font-poppinsLight text-center text-sm md:text-2md"
              gutterBottom
            >
              {name}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

const DonorsComponent = () => {
  const Donors: DonorProps[] = [
    {
      id: 1,
      imageUrl: "/hospital/about.png",
      position: "Chief Executive Officer",
      name: "Isaac Johnson",
      media: {
        facebook: "https://www.facebook.com/profile.php?id=100015138280039",
        twitter: "https://twitter.com/IsaacCEJohnson2",
        instagram: "https://www.instagram.com/super_jay06",
        linkedin: "https://www.linkedin.com/in/isaac-johnson-b50875167/",
        github: "https://github.com/ICEJ-jr",
      },
    },
    {
      id: 2,
      imageUrl: "/hospital/about.png",
      position: "Chief Operating Officer",
      name: "Mohamed Shelpidy Kamara",
      media: {
        facebook: "https://www.facebook.com/profile.php?id=100008312778585",
        twitter: "https://twitter.com/medshelpidy",
        instagram: "https://www.instagram.com/shelpidy/",
        linkedin: "https://www.linkedin.com/in/mohamed-kamara-6894b1230/",
        github: "https://github.com/Shelpidy",
      },
    },
    {
      id: 3,
      imageUrl: "/hospital/about.png",
      position: "Lead UI/UX Designer",
      name: "Afanwi Pearl",
      media: {
        facebook: " https://www.facebook.com/afanwi.pearl.9",
        twitter: " https://twitter.com/AfanwiPearl",
        instagram: "https://instagram.com/afanwi_pearl?igshid=YmMyMTA2M2Y=",
        linkedin: " https://www.linkedin.com/in/afanwi-pearl-94112a1aa/",
        github: "",
      },
    },
    {
      id: 4,
      imageUrl: "/hospital/about.png",
      position: "Lead Mobile Developer",
      name: "Hamed Kemokai",
      media: {
        facebook: " https://www.facebook.com/hamedkemokai1",
        twitter: "https://twitter.com/Ing_hamed",
        instagram: "",
        linkedin: "https://www.linkedin.com/in/hamed-idriss-kemokai-57299b104/",
        github: "",
      },
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ marginTop: 4, marginBottom: 1 }}>
        <Typography variant="h4" color="primary">
          Blood Donors
        </Typography>
      </Box>
      <Divider sx={{ width: "80%" }} />
      <div className="py-5 px-2 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Donors.map((item: DonorProps, index: number) => {
          return <DonorComponent key={item.id} {...item} />;
        })}
      </div>
    </Box>
  );
};

export default DonorsComponent;
