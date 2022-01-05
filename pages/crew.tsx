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
import { NextPageWithLayout, Crew } from "models";
import { MainLayout } from "components/layout";
import { GetStaticProps } from "next";
import { SWRConfig } from "swr";
import { CrewImageProps, CrewInfoProps } from "components/Crew";
import static_data from "json/db.json";
import { retrieve } from "utils/firebase";
import { NextSeo, BlogJsonLd } from "next-seo";
import { DefaultBlogJsonLd } from "utils/NextSeo";
import dynamic from "next/dynamic";

export interface CrewProps {
  SWRFallback: object;
}

const DynamicCrewImage = dynamic<CrewImageProps>(
  () => import("components/Crew").then((mod) => mod.CrewImage)
  // { ssr: false }
);

const DynamicCrewInfo = dynamic<CrewInfoProps>(() =>
  import("components/Crew").then((mod) => mod.CrewInfo)
);

const Crew: NextPageWithLayout<CrewProps> = ({ SWRFallback }) => {
  const [TabIndex, setTabIndex] = React.useState(0);
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  return (
    <>
      <NextSeo
        title="Crew Page"
        description="Moon. See our planet as you’ve never seen it before. A perfect relaxing trip away to help regain perspective and come back refreshed. While you’re there, take in some history by visiting the Luna 2 and Apollo 11 landing sites."
        openGraph={{
          url: "https://space-web-tannguyencse19.vercel.app/destination",
          title: "Space Web Crew",
          description: "Moon. See our planet as you’ve never seen it before.",
          images: [
            {
              url: "https://space-web-tannguyencse19.vercel.app/assets/SEO/destination.jpg",
              width: 1024,
              height: 540,
              alt: "Space Web Crew image",
              type: "image/jpeg",
            },
          ],
        }}
      />
      <BlogJsonLd
        url="https://space-web-tannguyencse19.vercel.app/destination"
        title="Space Web Crew"
        description="Moon. See our planet as you’ve never seen it before."
        {...DefaultBlogJsonLd}
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
          //   className="wrapper"
          h="100%" // do ko dung wrapper
          backgroundImage={{
            mobile: "/assets/crew/background-crew-mobile.jpg",
            tablet: "/assets/crew/background-crew-tablet.jpg",
            desktop: "/assets/crew/background-crew-desktop.jpg",
          }}
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
        >
          <Grid
            autoFlow={{ mobile: "row", desktop: "column" }}
            justifyContent={{ mobile: "unset", desktop: "center" }}
            alignItems={{ mobile: "unset", desktop: "end" }}
            justifyItems={{ mobile: "center", desktop: "unset" }}
            // gap={{ mobile: "20", desktop: "0" }}
            as={motion.div}
            variants={pageTransitionVariants(isMobile)}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {isMobile ? (
              <>
                <DynamicCrewImage tabIndex={TabIndex} />
                
                <DynamicCrewInfo
                  TabIndex={TabIndex}
                  setTabIndex={setTabIndex}
                />
              </>
            ) : (
              <>
                <DynamicCrewInfo
                  TabIndex={TabIndex}
                  setTabIndex={setTabIndex}
                />

                <DynamicCrewImage tabIndex={TabIndex} />
              </>
            )}
          </Grid>
        </Box>
      </SWRConfig>
    </>
  );
};

Crew.Layout = MainLayout;

export const getStaticProps: GetStaticProps<CrewProps> = async (context) => {
  const crew = await retrieve<Crew>("/crew");

  return {
    props: {
      SWRFallback: {
        "/crew": crew ? crew : static_data.crew,
      },
    },
  };
};

export default Crew;
