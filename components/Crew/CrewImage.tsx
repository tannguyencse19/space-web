import { Box } from "@chakra-ui/react";
import useSWR from "swr";
import { Crew } from "models";
import NextImage from "next/image";
import { motion } from "framer-motion";
import { planetTransitionVariants } from "utils/variants";

export interface CrewImageProps {
  tabIndex: number;
}

function localStringParser(str: string) {
  return str.toLowerCase().split(" ").join("-");
}

export const CrewImage = ({ tabIndex }: CrewImageProps) => {
  const { data: crew } = useSWR<Crew[]>("/crew");
  const imgUrlVariable = crew && localStringParser(crew[tabIndex].name);

  return crew && crew.length > 0 ? (
    <Box position="relative" width="600px" height="800px">
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
    </Box>
  ) : (
    <h1>CrewImage</h1>
  );
};
