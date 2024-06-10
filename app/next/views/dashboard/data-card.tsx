import * as React from "react";
import { Card, Text, Grid, Container, Button, Loading, Modal, useModal } from "@nextui-org/react";
import { Flex } from "@/components/flex";
import { Scan } from "react-iconly";

export interface DataCardProps {
  status?: "success" | "error";
  title: string;
  subText: string;
  content: React.ReactNode;
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

  const MockItem = ({ text }:any) => {
    return (
      <Card css={{ h: "$20", $$cardColor: '$colors$primary' }}>
        <Card.Body>
          <Text h6 size={15} color="white" css={{ m: 0 }}>
            {text}
          </Text>
        </Card.Body>
      </Card>
    );
  };

 const list = auditResult?.map((item:any)=>{
  console.log(item?.value?.title);
  // <Text size="$sm" color="$accents7" transform="uppercase" >
  //               {title}
  //             </Text>
  return  <><Text
  h2
  size={18}
  
  weight="bold"
>
  {item?.value?.title}
</Text>
<Text size="$sm" css={{ mb: 5 }}color="$accents7" >
                {item?.value?.description.split(' [')[0]}
              </Text></>

 })

  return (
    <><Card isHoverable variant="flat">
      <Card.Body>
        <Grid.Container>
          <Grid xs={10}>
            <Container fluid>
              <Text size="$sm" color="$accents7" transform="uppercase" >
                {title}
              </Text>
              {content ? <Text h3>{content}</Text> : <Loading></Loading>}
              <Flex>
                <Text
                  css={{
                    mr: "$3",
                    fontWeight: "$bold",
                    color: `$${status}`,
                    display: "inline",
                  }}
                >
                  {trendText}
                </Text>
                <Text color="$accents7">{subText}</Text>
              </Flex>
            </Container>
          </Grid>
          <Grid xs={2}>
            <Button auto color="primary" icon={<Scan set="bold" />} onPress={() => setVisible(true)}/>
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
          <Text id="modal-title" size={24} css={{
    textGradient: "45deg, $blue600 -20%, $green600 50%",
  }}>
          {title} & L7 RECOMMENDATIONS
          </Text>
        </Modal.Header>
        <Modal.Body>
        {/* <Grid.Container gap={2} justify="center">
        <Grid xs>
          <MockItem text="1 of 3" />
        </Grid>
        <Grid xs>
          <MockItem text="2 of 3" />
        </Grid>
        <Grid xs>
          <MockItem text="3 of 3" />
        </Grid>
      </Grid.Container> */}
        
          {/* <Text id="modal-description"> */}
          {list}
           {/* </Text> */}
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={() => setVisible(false)}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  );
};
