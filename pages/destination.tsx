import { Box, Grid, useMediaQuery } from "@chakra-ui/react";
import {
  _afterUnderlineStyle,
  _sxHoverAfterUnderlineStyle,
  pageTransitionVariants,
  FetcherJsonServer,
  MINUTE_TO_MS,
} from "utils";
import { motion } from "framer-motion";
import React from "react";
import { NextPageWithLayout, Planet } from "models";
import { MainLayout } from "components/layout";
import { GetStaticProps } from "next";
import { SWRConfig } from "swr";
import { PlanetImage, PlanetInfo } from "components/Destination";
import static_data from "json/db.json";
import { getDatabaseServer, retrieve } from "utils/firebase";
import { NextSeo } from "next-seo";
// console.log(h5);
export interface DestinationProps {
  SWRFallback: object;
}

const Destination: NextPageWithLayout<DestinationProps> = ({ SWRFallback }) => {
  const [TabIndex, setTabIndex] = React.useState(0);
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  return (
    <>
      <NextSeo
        title="Destination Page"
        description="Moon. See our planet as you’ve never seen it before. A perfect relaxing trip away to help regain perspective and come back refreshed. While you’re there, take in some history by visiting the Luna 2 and Apollo 11 landing sites."
        openGraph={{
          url: "https://space-web-tannguyencse19.vercel.app/destination",
          site_name: "space-web-tannguyencse19.vercel.app",
          title: "Space Web Destination",
          description: "Moon. See our planet as you’ve never seen it before.",
          images: [
            {
              url: "https://space-web-tannguyencse19.vercel.app/assets/SEO/destination.jpg",
              width: 1024,
              height: 540,
              alt: "Space Web Destination image",
              type: "image/jpeg",
            },
          ],
        }}
      />
      <SWRConfig
        value={{
          fetcher: FetcherJsonServer,
          fallback: SWRFallback,
          dedupingInterval: MINUTE_TO_MS, // neu co goi lai cung api (url) thi trong 60s se tra ve stale (cache)
          revalidateOnFocus: false,
        }}
      >
        <Box
          className="wrapper"
          backgroundImage={{
            mobile: "/assets/destination/background-destination-mobile.jpg",
            tablet: "/assets/destination/background-destination-tablet.jpg",
            desktop: "/assets/destination/background-destination-desktop.jpg",
          }}
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
        >
          <Grid
            autoFlow={{ mobile: "row", desktop: "column" }}
            justifyContent={{ mobile: "unset", desktop: "space-around" }}
            alignItems={{ mobile: "unset", desktop: "center" }}
            justifyItems={{ mobile: "center", desktop: "unset" }}
            // gap={{ mobile: "20", desktop: "0" }}
            as={motion.div}
            variants={pageTransitionVariants(isMobile)}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <PlanetImage tabIndex={TabIndex} />

            <PlanetInfo TabIndex={TabIndex} setTabIndex={setTabIndex} />
          </Grid>
        </Box>
      </SWRConfig>
    </>
  );
};

Destination.Layout = MainLayout;

export const getStaticProps: GetStaticProps<DestinationProps> = async (
  context
) => {
  const planet = await retrieve<Planet>("/destination");

  return {
    props: {
      SWRFallback: {
        "/destination": planet ? planet : static_data.destination,
      },
    },
  };
};

export default Destination;
