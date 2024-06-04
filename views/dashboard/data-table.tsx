import * as React from "react";
import {
  Card,
  Col,
  Row,
  Table,
  Text,
  User,
  Badge,
  BadgeProps,
  Divider,
} from "@nextui-org/react";
import { FlexBox } from "@/components";
import { Chart, Graph, Delete } from "react-iconly";
import { Icon } from 'layout/avatar-bar/icon'
import { useEffect, useState } from "react";

interface UserType {
  id: string | number;
  site?: string;
  logo?: string;
  overlap?: string;
}

interface SiteData {
  GlobalRank?: {
    Rank?: number;
    // other properties
  };
  CategoryRank?: {
    Rank?: number;
    // other properties
  };
  // other properties
  CountryRank?: {
    Rank?: number;
    // other properties
  };
  // other properties
}

const columns = [
  { name: "COMPETITORS", uid: "site" }
];

// const users: UserType[] = [
//   {
//     id:1,
//     competitor_site: "Tony Reichert",
//     logo: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
//   },
//   {
//     id:2,
//     competitor_site: "Zoey Lang",
//     logo: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
//   },
//   {
//     id:3,
//     competitor_site: "Jane Fisher",
//     logo: "https://i.pravatar.cc/150?u=a04258114e29026702d"
//   },
//   {
//     id:4,
//     competitor_site: "William Howard",
//     logo: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
//   },
//   {
//     id:5,
//     competitor_site: "Kristen Copper",
//     logo: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
//   },
// ];

export const DataTableCard = (customerData: any) => {
  const renderCell = (user: Record<string, any>, columnKey: React.Key) => {
    const cellValue = user?.[columnKey];
    switch (columnKey) {
      case "site":
        return (
          <User squared src={user?.logo} name={cellValue} css={{ p: 0 }}>
            {user?.competitor_site}
          </User>
        );
      case "role":
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: "capitalize" }}>
                {cellValue}
              </Text>
            </Row>
            <Row>
              <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
                {user?.team}
              </Text>
            </Row>
          </Col>
        );
      case "status":
        return (
          <Badge enableShadow color={cellValue} disableOutline>
            {cellValue}
          </Badge>
        );

      case "actions":
        return (
          <FlexBox jc="center" ai="center" gap="$4">
            <Icon as={Chart} set="bold" />
            <Icon as={Graph} set="bold" />
            <Icon as={Delete} set="bold" css={{
              color: '$error'
            }} />
          </FlexBox>
        );
      default:
        return cellValue;
    }
  };
  const [siteData, setSiteData] = useState<SiteData>({});
  const [countryImage, setCountryImage] = useState<any>({});

  let currentId = 0;

// Function to generate auto IDs starting from 1
function generateId() {
    return currentId++;
}

  const competitors = customerData?.competitorData && customerData.competitorData?.data?.competitor_sites?.map((item:any) => ({
    id: generateId(),
    site: item.site,
    logo: item.logo
}));
  
  const users: UserType[] = competitors ? competitors.slice(0,5):[];

  // [
  //     {
  //       id:1,
  //       competitor_site: "Tony Reichert",
  //       logo: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  //     },
  //     {
  //       id:2,
  //       competitor_site: "Zoey Lang",
  //       logo: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  //     },
  //     {
  //       id:3,
  //       competitor_site: "Jane Fisher",
  //       logo: "https://i.pravatar.cc/150?u=a04258114e29026702d"
  //     },
  //     {
  //       id:4,
  //       competitor_site: "William Howard",
  //       logo: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
  //     },
  //     {
  //       id:5,
  //       competitor_site: "Kristen Copper",
  //       logo: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
  //     },
  //   ];;
  useEffect(() => {
    setSiteData(customerData.customerData);
    setCountryImage("https://flagsapi.com/"+customerData.customerData?.CountryRank?.CountryCode+"/shiny/64.png")
    // fetch('/api/customerData?domain=sephora.com')
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     setSiteData(data);
    //     setCountryImage("https://flagsapi.com/"+data?.CountryRank?.CountryCode+"/shiny/64.png")
    //   })
    // https://data.similarweb.com/api/v1/data?domain=sephora.com
  }, [customerData]
  )
  return (

    <Card isHoverable variant="flat" css={{}}>
      <Card.Header
        css={{
          pb: 0,
          pt: "$md",
        }}
      >
        {/* https://flagsapi.com/BE/flat/64.png */}
        <FlexBox px="$sm" fd="column" alignItems="flex-start">

          <Text h4 >WEBSITE RANKING</Text>
          <Row>
            <User
              src="/category.png"
              name={siteData?.CategoryRank?.Rank}
              css={{ py: 5 }}
            /><User
              src={countryImage}
              name={siteData?.CountryRank?.Rank}
              css={{ py: 5 }}
            /><User
            src="/worldwide.jpg"
            name={siteData?.GlobalRank?.Rank}
            css={{ py: 5 }}
          />
            </Row>
          {/* <Text
            size="$sm"
            css={{
              color: "$accents6",
            }}
          >
            last updated 3 hours ago
          </Text> */}

        </FlexBox>

      </Card.Header>
      <Card.Body
        css={{
          p: 0,
        }}
      >
        <Table
          aria-label="Example table with custom cells"
          css={{
            height: "auto",
            minWidth: "100%",
          }}
          selectionMode="none"
        >
          <Table.Header columns={columns}>
            {(column) => (
              <Table.Column
                key={column.uid}
                hideHeader={column.uid === "actions"}
                align={column.uid === "actions" ? "center" : "start"}
                css={{
                  bg: "$primary",
                  color: "$white",
                }}
              >
                {column.name}
              </Table.Column>
            )}
          </Table.Header>
          <Table.Body items={users}>
            {(item: UserType) => (
              <Table.Row>
                {(columnKey: React.Key) => (
                  <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
                )}
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </Card.Body>
    </Card>
  );
};
