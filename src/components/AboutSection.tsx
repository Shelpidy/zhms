"use client";
import {
  Divider,
  Card,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  Container,
  Box,
} from "@mui/material";
import React from "react";
import Image from "next/image";

type AboutProps = {
  imageUrl: string;
  missionText?: string;
  backgroundText?: string;
  vissionText?: string;
};

function AboutSection({
  imageUrl,
  missionText,
  vissionText,
  backgroundText,
}: AboutProps) {
  const [activeTab, setActiveTab] = React.useState<number>(0);

  // useEffect(()=>{
  //     AOS.init({duration:1000})
  // },[])

  return (
    <Box
      className="mb-8 mt-5"
      sx={{
        display: "flex",
        justifyContent: "center", // Center horizontally
        alignItems: "center", // Center vertically
        flexDirection: "column", // Ensure content is stacked vertically
      }}
    >
      <Box sx={{ marginTop: 4, marginBottom: 1 }}>
        <Typography variant="h4" color="primary">
          About ZeeHealth
        </Typography>
      </Box>
      <Divider sx={{ width: "80%" }} />
      <Box
        className="grid w-full gird-cols-1 gap-5 md:grid-cols-2"
        sx={{ marginTop: 3 }}
      >
        <Box
          className="relative overflow-hidden rounded-sm pt-1"
          sx={{ height: "65vh" }}
        >
          <Image fill priority alt="About Image" src={imageUrl} />
        </Box>
        <Box>
          {/* <h4 className='text-center text-customPrimary20 text-2xl font-inter md:text-4xl'>SchoolAll Company Here To Digitize Education</h4> */}
          <Tabs
            className="py-2"
            centered
            textColor="inherit"
            value={activeTab}
            sx={{ justifyContent: "center" }}
            onChange={(e, value) => {
              setActiveTab(value);
            }}
            indicatorColor="secondary"
          >
            <Tab label="Background"></Tab>
            <Tab label="Mission"></Tab>
            <Tab label="Vision"></Tab>
            {/* <Tab href='#contact-us' label='Contact Us'></Tab> */}
          </Tabs>
          <Box className="px-4">
            {activeTab === 2 && (
              <Box>
                <Typography fontFamily="PoppinsLight">
                  At SchoolAll, our vision is to revolutionize the education
                  industry through digital transformation. We strive to be a
                  leading provider of innovative and customized technology
                  solutions for schools, colleges, and universities across the
                  globe.
                  <br />
                  Our ultimate goal is to become the go-to technology partner
                  for academic institutions, not just in our continent but also
                  beyond. We envision a future where every school has access to
                  the latest technology and tools needed to provide an
                  exceptional learning experience for their students.
                  <br />
                  As we continue to expand our reach and grow our business, we
                  are committed to upholding our core values of innovation,
                  excellence, and customer satisfaction. We are dedicated to
                  staying at the forefront of emerging technologies, and
                  constantly improving our solutions to ensure that they meet
                  the evolving needs of our clients.
                </Typography>
                {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, odit. Expedita voluptates a, voluptatibus fugit vel nihil ut quidem reprehenderit iste alias aperiam quaerat rem dolorum modi velit id natus?</p> */}
              </Box>
            )}
            {activeTab === 1 && (
              <Box>
                <Typography fontFamily="PoppinsLight">
                  At SchoolAll, our mission is to empower academic institutions
                  with the tools and technology needed to keep pace with the
                  rapidly evolving landscape of education. We believe that
                  digital transformation is the key to unlocking new
                  opportunities and providing a more seamless, efficient and
                  effective learning experience.
                  <br />
                  We are dedicated to partnering with academic institutions to
                  help them transition away from traditional practices and adopt
                  emerging technologies into their ecosystem. By leveraging
                  modern software development methodologies, we build custom
                  digital solutions that are tailored to meet the unique needs
                  of each school.
                </Typography>
              </Box>
            )}
            {activeTab === 0 && (
              <Box>
                <Typography fontFamily="PoppinsLight">
                  Our mission is to bridge this gap by building custom software
                  solutions tailored to the unique needs of each school. Unlike
                  other vendors who offer one-size-fits-all, off-the-shelf
                  software solutions, we believe in creating bespoke software
                  solutions that are fully managed and evolve with the needs of
                  the school.<br></br>
                  Our team of experienced developers uses modern software
                  development methodologies to build, manage and evolve digital
                  solutions for academic institutions. This allows schools to
                  focus on their core business of educating students, while we
                  handle all the technical intricacies of maintaining the
                  software.<br></br>
                  At SchoolAll, we are committed to providing high-quality,
                  cost-effective and customized digital solutions to help
                  schools keep up with the ever-evolving landscape of
                  technology. We believe that digital transformation is not just
                  a buzzword, but a necessary step in ensuring that our
                  education system remains relevant and accessible to all.
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default AboutSection;
