import { Card, Col, Row, Button, Text, Modal, Input, Checkbox, Textarea, useInput } from "@nextui-org/react";
import { useState } from "react";
import { AtSign, Mail } from "react-feather";
import { Password } from "react-iconly";

export const Swipe = ({ emitClickEvent }: any) => {
  const [visible, setVisible] = useState(false);
  // const [websiteUrl, setWebSiteUrl] = useState('');
  const { value, reset, bindings } = useInput("");
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    emitClickEvent(value)
    console.log("closed");
  };

  // function handleClick(event) {
  //   emitClickEvent(event, 'Hello from child');
  // }
  return (
    <Card variant="flat" css={{ w: "100%", h: "100%" }}>
      <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
        {/* <Col>
          <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
            New
          </Text>
          <Text h3 color="black">
            Acme camera
          </Text>
        </Col> */}
      </Card.Header>
      <Card.Body css={{ p: 0 }}>
        {/* <Card.Image
          src="/cover1.png"
          width="100%"
          height="100%"
          objectFit="cover"
          alt="Swipe Background"
        /> */}
        <video
          src={require("../../public/L7.mp4")}
          autoPlay
          controls
          loop

        />
      </Card.Body>
      <Card.Footer
        isBlurred
        css={{
          position: "absolute",
          bgBlur: "#ffffff66",
          borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
          bottom: 0,
          zIndex: 1,
        }}
      >
        <Row>
          <Col>
            <Text color="$text" size="$xs">
              Available soon.
            </Text>
            <Text color="$text" size="$xs">
              Get notified.
            </Text>
          </Col>
          <Col>
            <Row justify="flex-end">
              <Button auto color="warning" shadow onPress={handler}>
                Analyse your website
              </Button>
              {/* <Button flat auto rounded color="secondary" >
                <Text
                  css={{ color: "inherit" }}
                  size={12}
                  weight="bold"
                  transform="uppercase"
                >
                 View Source
                </Text>
              </Button> */}
            </Row>
          </Col>
        </Row>
        <Modal
          closeButton
          blur
          aria-labelledby="modal-title"
          open={visible}
          onClose={closeHandler}
        >
          <Modal.Header>
            <Text id="modal-title" size={18}>
              Welcome to <b>Hawkeye</b>
              </Text>
            
          </Modal.Header>
          <Modal.Body>
            <Input
              {...bindings}
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder="Website"
              contentLeft={<AtSign />}
            />
            <Textarea
              label="How can we help you today"
              placeholder="Enter your amazing ideas."
            />
            {/* <Input
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder="Password"
              contentLeft={<Password />}
            /> */}

          </Modal.Body>
          <Modal.Footer>

            <Button auto onPress={closeHandler}>
              Analyse
            </Button>
          </Modal.Footer>
        </Modal>
      </Card.Footer>
    </Card>
  )
}
  ;
