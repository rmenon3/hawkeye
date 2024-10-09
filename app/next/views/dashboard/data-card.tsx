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

export interface DataCardProps {
  status?: "success" | "error";
  title: string;
  subText: string;
  content: number;
  auditResult?: [];
  trendText?: string;
}

export const DataCard: React.FC<DataCardProps> = ({
  status = "success",
  title,
  subText,
  content,
  auditResult,
  trendText,
}) => {
  const { setVisible, bindings } = useModal();

  const removeHyperlinks = (text: string) => {
    // Regex to find all URLs /(https?:\/\/[^\s]+)/g;
    const regex = /\(https?:\/\/[^\s]+\)/g;
    return text.replace(regex, "");
  };
  const list = auditResult?.map((item: any) => {
    console.log(item?.value?.title);
    return (
      <>
        <Text h2 size={18} weight="bold">
          {item?.value?.title}
        </Text>
        <Text size="$sm" css={{ mb: 5 }} color="$accents7">
          {removeHyperlinks(item?.value?.description)}
        </Text>
      </>
    );
  });

  return (
    <>
      <Card isHoverable variant="flat">
        <Card.Body>
          <Grid.Container>
            <Grid xs={10}>
              <Container fluid>
                <Text size="$sm" color="$accents7" transform="uppercase">
                  {title}
                </Text>
                {content >= 0 ? <Text h3>{content}</Text> : <Loading></Loading>}
                {content <= 0 && (
                  <Flex>
                    <Text size="$xs" color="$accents7">
                      {subText}
                    </Text>
                  </Flex>
                )}
              </Container>
            </Grid>
            <Grid xs={2}>
              <Button
                auto
                color="primary"
                icon={<Scan set="bold" />}
                onPress={() => setVisible(true)}
              />
            </Grid>
          </Grid.Container>
        </Card.Body>
      </Card>
      <Modal
        scroll
        width="600px"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        {...bindings}
      >
        <Modal.Header>
          <Text
            id="modal-title"
            size={24}
            css={{
              textGradient: "45deg, $blue600 -20%, $green600 50%",
            }}
          >
            {title} & L7 RECOMMENDATIONS
          </Text>
        </Modal.Header>
        <Modal.Body>{list}</Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={() => setVisible(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
