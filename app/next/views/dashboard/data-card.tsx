import * as React from "react";
import {
  Card,
  Text,
  Grid,
  Container,
  Button,
  Loading,
  Modal,
  useModal,
} from "@nextui-org/react";
import { Flex } from "@/components/flex";
import { Scan } from "react-iconly";
import ContentLoader from "react-content-loader";
import { DoughNut } from "./charts/doughnut";
import { scrollToSection } from "./utility";

export const Loader = () => (
  <ContentLoader
    viewBox="0 0 380 70"
    speed={1}
    backgroundColor="#f3f3f3"
    foregroundColor="#ded9d9"
  >
    <rect x="0" y="0" rx="5" ry="5" width="350" height="15" />
    <rect x="0" y="17" rx="4" ry="4" width="300" height="13" />
    <rect  y="35"  rx="4" width="300" height="13" />
  </ContentLoader>
);

export interface DataCardProps {
  title: string;
  subText: string;
  content: number;
  auditResult?: [];
  loading?: boolean;
}

export const DataCard: React.FC<DataCardProps> = ({
  title,
  subText,
  content,
  auditResult,
  loading,
}) => {

  if (loading) {
    return (
      <Card isHoverable variant="flat">
        <Card.Body>
          <Loader />
        </Card.Body>
      </Card>
    );
  }

  return (
    <>
      <Card isHoverable variant="flat">
        <Card.Body>
          <Grid.Container  onClick={() => scrollToSection(title)}>
            <Grid xs={5}>
              <Container fluid>
                <Text size="$sm" color="$accents7" transform="uppercase">
                  {title}
                </Text>
                {content <= 0 && (
                  <Flex>
                    <Text size="$xs" color="$accents7">
                      {subText}
                    </Text>
                  </Flex>
                )}
              </Container>
            </Grid>
            <Grid xs={5}>
            {content >= 0 ?
                <><DoughNut content={{
                  colors: [
                    'Red',
                    'Blue',
                    'Yellow'
                  ],
                  label: title, doughData: [content, 100 - content]
                }} /> <br /></>
                : <Loading></Loading>}
                </Grid>
            <Grid xs={2}>
              <Button
                auto
                color="primary"
                icon={<Scan set="bold" />}
                onClick={() => scrollToSection(title)}
              />
            </Grid>
          </Grid.Container>
        </Card.Body>
      </Card>
    </>
  )};