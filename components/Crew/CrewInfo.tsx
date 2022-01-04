import {
  nav,
  _afterUnderlineStyle,
  _sxHoverAfterUnderlineStyle,
  tabTransitionVariants,
  h4,
  listSubH2,
  listSubH1,
  h5,
  h3,
} from "utils";
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Divider,
  Grid,
  Box,
  Text,
  List,
  ListItem,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import useSWR from "swr";
import { Crew } from "models";

export interface CrewInfoProps {
  TabIndex: number;
  setTabIndex: Dispatch<React.SetStateAction<number>>;
}

export const CrewInfo = ({ TabIndex, setTabIndex }: CrewInfoProps) => {
  const { data: crew } = useSWR<Crew[]>("/crew");

  return crew && crew.length > 0 ? (
    <Grid gap={{ mobile: "unset", desktop: "24" }} pt="200px" pb="100px">
      <Text
        as="h5"
        {...h5.return()}
        fontSize={{ mobile: "16px", tablet: "20px", desktop: h5.fontSize }}
        textAlign={{ mobile: "center", tablet: "unset" }}
        mb={{ mobile: "80", tablet: "96", desktop: "16" }} // for Image
        ml={{ tablet: "10", desktop: "unset" }}
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
      <Tabs
        variant="soft-rounded"
        isLazy
        w={{ mobile: "360px", tablet: "600px", desktop: "700px" }}
        onChange={(index) => setTabIndex(index)}
      >
        {/* Tab transition:
          https://github.com/chakra-ui/chakra-ui/discussions/5085
          https://github.com/chakra-ui/chakra-ui/discussions/3400
          */}
        <TabPanels mb="28">
          {crew.map((tab, index) => (
            <TabPanel
              p={4}
              key={`tab-${tab.name}`}
              textAlign={{ mobile: "center", desktop: "unset" }}
            >
              <motion.div
                variants={tabTransitionVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Text
                  as="h4"
                  {...h4.return()}
                  color="custom.2"
                  fontSize={{
                    mobile: "unset",
                    desktop: h4.fontSize,
                  }}
                >
                  {tab.role}
                </Text>
                <Text
                  as="h3"
                  {...h3.return()}
                  fontSize={{
                    mobile: "unset",
                    tablet: "unset",
                    desktop: h3.fontSize,
                  }}
                  mb="10"
                >
                  {tab.name}
                </Text>
                <Text
                  fontSize={{
                    mobile: "15px",
                    tablet: "16px",
                    desktop: "18px",
                  }}
                  w={{ mobile: "360px", tablet: "600px", desktop: "450px" }}
                >
                  {tab.bio}
                </Text>
              </motion.div>
            </TabPanel>
          ))}
        </TabPanels>
        <TabList
          justifyContent={{ mobile: "center", desktop: "start" }}
          gap="4"
        >
          {crew.map((tab, index) => (
            <Tab
              key={`tab-${tab.name}`}
              {...nav.return()}
              color={index === TabIndex ? nav.color : "custom.2"}
              bgColor="rgba(255,255,255,0.17)" // = opacity: 0.17
              mixBlendMode="normal"
              // override chakra default style
              borderRadius="full"
              px="8px"
              mr="4"
              _selected={{ bgColor: "white" }}
              _hover={{ bgColor: "rgba(255,255,255,0.5)" }}
            />
          ))}
        </TabList>
      </Tabs>
    </Grid>
  ) : (
    <h1>CrewInfo</h1>
  );
};
