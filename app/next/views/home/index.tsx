import { Box, FlexBox } from "@/components";
import { Button, Grid, Text, Image } from "@nextui-org/react";
import * as React from "react";
import { Heart2 } from "react-iconly"

export const HomePageView = () => {
  return (
    <Grid.Container
      gap={2}
      justify="center"
    >
      <Grid
        xs={12}
        lg={5}
        justify="center"
        css={{
          flexDirection: "column",
          height: 600
        }}
      >
        
        <Text h1>
        Accelerating
        </Text>
        <Text h1 color="primary">
        Digital Revenue
        </Text>
        <Text h1>
        for Retailers
        </Text>
        {/* <FlexBox mt="$12" gap="$4" >
          <Button size="lg" auto>
            Get started
          </Button>
          <Button size="lg" flat auto icon={<Heart2 set="bold" primaryColor="red" />} >
            Sponsor
          </Button>
        </FlexBox> */}
      </Grid>

      <Grid xs={12} lg={7} justify="flex-start">
        <Image height={600} src="/litmus_cover.png" />
      </Grid>
    </Grid.Container>
  );
};
// src="/assets/images/better-stack-dark.png"