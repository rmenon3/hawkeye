import useShuffleWithInterval from "@/hooks/useShuffleWithInterval";
import { Card, Col, Row, Button, Text, Modal, Input, Textarea, useInput } from "@nextui-org/react";
import { useState } from "react";
import { AtSign } from "react-feather";

export const Swipe = ({ emitClickEvent, showImage }: any) => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(false);
  const { value, reset, bindings } = useInput("");
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    setProgress(true);
    emitClickEvent(value)
    console.log("closed");
  };
  const names = [
    'Evaluating The Website Performance', 'Fetching the list of Competitors', 'Understanding website usage ', 'Ranking your website across Category, Country & Globally'
  ]
  
  const newName = useShuffleWithInterval(names);
  
  return (
    <Card variant="flat" css={{ w: "100%", h: showImage ? "500px" : "100%" }}>
      <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>

      </Card.Header>
      <Card.Body css={{ p: 0 }}>
        {showImage && <Card.Image
          src="/cover1.png"
          width="100%"
          height="100%"
          objectFit="fill"
          alt="Swipe Background"
        />}
        {!showImage && <video
        // ref={videoRef}
          src={require("../../public/l7Video.mp4")}
          autoPlay
          muted
          controls
          loop

        />}
      </Card.Body>
      {!showImage && <Card.Footer
        isBlurred
        css={{
          position: "absolute",
          bgBlur: "#ffffff66",
          borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
          bottom: 0,
          height: 100,
          zIndex: 1,
        }}
      >
        <Row>
          <Col>
            {progress && <Text color="black">
              Please wait while the site is being analysed .
            </Text>}
            {progress && <Text b color="black">
              {newName}
            </Text>}
          </Col>
          <Col>
            <Row justify="flex-end">
              <Button auto color="warning" shadow onPress={handler}>
                Analyse your website
              </Button>

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


          </Modal.Body>
          <Modal.Footer>

            <Button auto onPress={closeHandler}>
              Analyse
            </Button>
          </Modal.Footer>
        </Modal>
      </Card.Footer>}
    </Card>
  )
}
  ;
