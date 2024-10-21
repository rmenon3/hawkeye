import { Text, Grid, Card } from "@nextui-org/react";
import { removeHyperlinks } from "./utility";
import { useEffect, useState } from "react";
import { Loader } from "./data-card";

export const AuditList = (auditData: any) => {
    console.log(auditData)
    const [auditList, setAuditList]: any = useState([]);
    const formatData = auditData?.auditData?.reduce((acc: any, item: any) => {
        if (!acc[item?.value?.scoreDisplayMode]) {
            acc[item?.value?.scoreDisplayMode] = [];
        }
        acc[item?.value?.scoreDisplayMode].push(item);
        return acc;
    }, {});
    useEffect(() => {
        setAuditList([formatData])
    }, [formatData]);
    const list = Object.keys(formatData).map((item: any) => {
        if (auditList[0][item]) {
            return <>
                <Text
                    h2
                    size={18}
                    weight="bold"
                    css={{
                        textDecoration: "underline",
                        color: "#11181C",
                    }}
                >
                    {item.toUpperCase()} CHECK
                </Text>
                {auditList[0][item]?.map((it: any) => {
                    return <>
                        <Text
                            h2
                            size={18}
                        // weight="bold"
                        >
                            {it?.value?.title}
                        </Text>
                        <Text size="$sm" css={{ mb: 5 }} color="$accents7" >
                            {removeHyperlinks(it?.value?.description)}
                        </Text></>
                })}
            </>
        }
        return <></>
    })
    // const list = auditData?.auditData?.map((item: any) => {
    //     return <>
    //         <Text
    //             h2
    //             size={18}
    //             weight="bold"
    //         >
    //             {item?.value?.title}
    //         </Text>
    //         <Text size="$sm" css={{ mb: 5 }} color="$accents7" >
    //             {removeHyperlinks(item?.value?.description)}
    //         </Text></>

    // })
    return (
        <Card>
            <Card.Body>
                <Grid.Container gap={2} justify="flex-start">
                    <Grid xs={12} sm={12} md={12} lg={12}>
                        <Text size={24} css={{
                            textGradient: "45deg, $blue600 -20%, $green600 50%",
                            borderBottom: "1px solid black",
                            width: "100vw",
                        }}>
                            {auditData?.title} & L7 RECOMMENDATIONS
                        </Text>
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={12}>
                        {auditData?.loading ? <Loader /> : (list?.length === 0 ? "No Data Available" : <div>{list}</div>)}
                    </Grid>
                </Grid.Container>
            </Card.Body>
        </Card>
    );
}
