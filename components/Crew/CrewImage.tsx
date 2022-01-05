import { Box, Text, useMediaQuery } from "@chakra-ui/react";
import NextImage from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { planetTransitionVariants } from "utils/variants";
import { h5 } from "utils/theme";
import { useCrew } from "pages/crew";
export interface CrewImageProps {
  tabIndex: number;
}

function localStringParser(str: string) {
  return str.toLowerCase().split(" ").join("-");
}

export const CrewImage = ({ tabIndex }: CrewImageProps) => {
  const crew = useCrew();
  const imgUrlVariable = crew && localStringParser(crew[tabIndex].name);
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  return crew && crew.length > 0 ? (
    <Box
      position="relative"
      width={{ mobile: "200px", tablet: "600px" }}
      height={{ mobile: "300px", tablet: "800px" }}
    >
      {isMobile && (
        <Text
          as="h5"
          {...h5.return()}
          fontSize={{ mobile: "16px", tablet: "20px", desktop: h5.fontSize }}
          textAlign={{ mobile: "center", tablet: "unset" }}
          mb={{ mobile: "80", tablet: "16", desktop: "16" }} // for Image
          ml={{ tablet: "unset", desktop: "unset" }}
        >
          <Box
            as="span"
            mr="28px"
            color="white"
            mixBlendMode="normal"
            opacity="0.25"
          >
            02
          </Box>
          Meet your crew
        </Text>
      )}

      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={`crew-${crew[tabIndex].name}`}
          variants={planetTransitionVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <NextImage
            src={`/assets/crew/image-${imgUrlVariable}.png`}
            layout="fill"
            objectFit="scale-down" // de no giu instric value du <Box /> width height co bang bao nhieu, ko expand nhu "contain"
            objectPosition="bottom"
          />
        </motion.div>
      </AnimatePresence>
    </Box>
  ) : (
    <h1>CrewImage</h1>
  );
};
