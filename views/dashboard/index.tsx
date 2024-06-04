import { Grid, Input, Loading } from "@nextui-org/react";
import { DataCard } from "@/views/dashboard/data-card";
import { Profile } from "@/views/dashboard/profile";
import { Swipe } from "@/views/dashboard/swiper";
import { QuickEntry } from "@/views/dashboard/quick-entry";
import { FillLineCharts } from "@/views/dashboard/charts/fill-line";
import { VerticalBarCharts } from '@/views/dashboard/charts/vertical-bar'
import { LineCharts } from "@/views/dashboard/charts/line";
import { RadarCharts } from '@/views/dashboard/charts/radar'
import { DataTableCard } from '@/views/dashboard/data-table'
import { PieCharts } from '@/views/dashboard/charts/pie'
import { GroupLineCharts } from '@/views/dashboard/charts/group-line'
import { PolarAreaCharts } from '@/views/dashboard/charts/polar-area'
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Search } from "react-iconly";
import { Icon } from "@/layout/avatar-bar/icon";
import { CardTransactions } from "./card-transactions";
type FormElement = HTMLInputElement | HTMLTextAreaElement;

export const DashboardPage = () => {

  const [value, setValue] = useState<string>('');
  const [data, setData] = useState(null)
  const [performaceData, setPerformanceData] = useState(0);
  const [accessibilityData, setAccessibilityData] = useState(0);
  const [securityData, setSecurityData] = useState(0);
  const [seoData, setSEOData] = useState(0);
  const [pieData, setPieData] = useState(0);
  const [isLoading, setLoading] = useState(true)
  const [showWebsiteDashboard, setShowWebsiteDashboard] = useState(false)
  const [monthlyData, setMonthlyData] = useState<any>({});
  const [customerData, setCustomerData] = useState<any>({});
  const [competitorData, setCompetitorData] = useState<any>({});

  // Event handler that matches the expected type
  const handleChange = (e: ChangeEvent<FormElement>) => {
    setValue(e.target.value);
  };

  const debounce=(callback: { (): void; (): void; }, delay: number | undefined) => {
    let timeoutId: string | number | NodeJS.Timeout | undefined;

    return function () {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(callback, delay);
    };
  }
  
  // Example usage:
  // const debouncedFunction = debounce(() => console.log('Hello World!'), 1000);
  const debouncedFunction = debounce(() => {
    const currentUrl = validUrls(value);
    console.log("Current Url", currentUrl)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "origin": currentUrl
      })
    };
    setLoading(true);
    setPerformanceData(0);
    setAccessibilityData(0);
    setSecurityData(0);
    setSEOData(0);
    fetch('https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=AIzaSyBByZoF1yKFlBBhqnzLaVA0UCCxRewK2oU', requestOptions)
    .then(async response => {
      const isJson = response.headers.get('content-type')?.includes('application/json');
      const data = isJson && await response.json();
      console.log(data);
      setPieData(data.record.metrics.form_factors.fractions)
      // check for error response
      // if (!response.ok) {
      //     // get error message from body or default to response status
      //     const error = (data && data.message) || response.status;
      //     return Promise.reject(error);
      // }

      // this.setState({ postId: data.id })
    })
    .catch(error => {
      // this.setState({ errorMessage: error.toString() });
      console.error('There was an error!', error);
    });
  fetch('https://any-api.com:8443/https://www.googleapis.com/pagespeedonline/v5/runPagespeed?category=accessibility&category=best-practices&category=performance&category=pwa&category=seo&strategy=desktop&url='+currentUrl+'&alt=json')
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let pScore = data?.lighthouseResult?.categories?.performance?.score * 100;
      let accScore = data?.lighthouseResult?.categories?.accessibility?.score * 100;
      let secScore = Math.round(data?.lighthouseResult?.categories["best-practices"]?.score * 100);
      let seoScore = data?.lighthouseResult?.categories?.seo?.score * 100;
      setPerformanceData(pScore)
      setAccessibilityData(accScore)
      setSecurityData(secScore)
      setSEOData(seoScore)
      setData(data);
      setLoading(false);
    })
  // fetch('/api/competitorData?domain='+currentUrl)
  //   .then(res=>res.json())
  //   .then((data: any) => {
  //     console.log("test",data);
  //      setCompetitorData(data);
  //     // setMonthlyData(data.EstimatedMonthlyVisits);
  //     // setCountryImage("https://flagsapi.com/"+data.CountryRank.CountryCode+"/shiny/64.png")
  //   })
  // fetch('/api/customerData?domain='+currentUrl)
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log(data);
  //     setCustomerData(data);
  //     setMonthlyData(data.EstimatedMonthlyVisits);
  //     // setCountryImage("https://flagsapi.com/"+data.CountryRank.CountryCode+"/shiny/64.png")
  //   })

  }, 0);
  
  // debouncedFunction(); // 'Hello World!' is logged after 1 second
  // debouncedFunction(); 
  // debouncedFunction(); 
  // debouncedFunction(); 

  const validateURl = (value: string) => {
    return value.match(/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/);
  };

  const validUrls = (url: string) => {
    console.log("Inside validUrls")
    // Check if the URL starts with 'http://' or 'https://'
    if (!/^https?:\/\//i.test(url)) {
      // If not, prepend 'https://'
      url = "https://" + url;
    }
    // Check if 'www.' is present
    if (!/^(https?:\/\/)?www\./i.test(url)) {
      // If not, prepend 'www.'
      url = url.replace(/^(https?:\/\/)?/i, "https://www.");
    }

    console.log(url)
    return url;
  }

  const helper: any = useMemo(() => {
    if (!value)
      return {
        text: "",
        color: "",
      };
    const isValid = validateURl(value);
    return {
      text: isValid ? "Correct email" : "Enter a valid email",
      color: isValid ? "success" : "error",
    };
  }, [value]);
  let timeout: any= null;


  useEffect(() => {
    if(validateURl(value)){
      setShowWebsiteDashboard(true);
      const currentUrl = validUrls(value);
    console.log("Current Url", currentUrl)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "origin": currentUrl
      })
    };
      debouncedFunction();
      fetch('/api/competitorData?domain='+currentUrl)
    .then(res=>res.json())
    .then((data: any) => {
      console.log("test",data);
       setCompetitorData(data);
      // setMonthlyData(data.EstimatedMonthlyVisits);
      // setCountryImage("https://flagsapi.com/"+data.CountryRank.CountryCode+"/shiny/64.png")
    })
  fetch('https://api.allorigins.win/get?url=http://data.similarweb.com/api/v1/data?domain='+currentUrl)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setCustomerData(data);
      setMonthlyData(data.EstimatedMonthlyVisits);
      // setCountryImage("https://flagsapi.com/"+data.CountryRank.CountryCode+"/shiny/64.png")
    })
    // timeout && clearTimeout(timeout);
    // const currentUrl = validUrls(value);
    // console.log("Current Url", currentUrl)
    // const requestOptions = {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     "origin": currentUrl
    //   })
    // };
    // timeout = setTimeout(()=>{
    //   setLoading(true);
    //   fetch('https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=AIzaSyBByZoF1yKFlBBhqnzLaVA0UCCxRewK2oU', requestOptions)
    //   .then(async response => {
    //     const isJson = response.headers.get('content-type')?.includes('application/json');
    //     const data = isJson && await response.json();
    //     console.log(data);
    //     setPieData(data.record.metrics.form_factors.fractions)
    //     // check for error response
    //     // if (!response.ok) {
    //     //     // get error message from body or default to response status
    //     //     const error = (data && data.message) || response.status;
    //     //     return Promise.reject(error);
    //     // }

    //     // this.setState({ postId: data.id })
    //   })
    //   .catch(error => {
    //     // this.setState({ errorMessage: error.toString() });
    //     console.error('There was an error!', error);
    //   });
    // fetch('https://any-api.com:8443/https://www.googleapis.com/pagespeedonline/v5/runPagespeed?category=accessibility&category=best-practices&category=performance&category=pwa&category=seo&strategy=desktop&url='+currentUrl+'&alt=json')
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     let pScore = data?.lighthouseResult?.categories?.performance?.score * 100;
    //     let accScore = data?.lighthouseResult?.categories?.accessibility?.score * 100;
    //     let secScore = Math.round(data?.lighthouseResult?.categories["best-practices"]?.score * 100);
    //     let seoScore = data?.lighthouseResult?.categories?.seo?.score * 100;
    //     setPerformanceData(pScore)
    //     setAccessibilityData(accScore)
    //     setSecurityData(secScore)
    //     setSEOData(seoScore)
    //     setData(data);
    //     setLoading(false);
    //   })
    // fetch('/api/competitorData?domain='+currentUrl)
    //   .then(res=>res.json())
    //   .then((data: any) => {
    //     console.log("test",data);
    //      setCompetitorData(data);
    //     // setMonthlyData(data.EstimatedMonthlyVisits);
    //     // setCountryImage("https://flagsapi.com/"+data.CountryRank.CountryCode+"/shiny/64.png")
    //   })
    // fetch('/api/customerData?domain='+currentUrl)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     setCustomerData(data);
    //     setMonthlyData(data.EstimatedMonthlyVisits);
    //     // setCountryImage("https://flagsapi.com/"+data.CountryRank.CountryCode+"/shiny/64.png")
    //   })
    // },2000);
    
    }else{
      setShowWebsiteDashboard(false);
    }

    // https://data.similarweb.com/api/v1/data?domain=sephora.com

    // https://data.similarweb.com/api/v1/data?domain=sephora.com
  }, [value])


  // useEffect(() => {


  // )
  return (
    <Grid.Container gap={2} justify="flex-start">
      <Grid xs={12} lg={9}>
        <Swipe />
      </Grid>
      <Grid xs={12} lg={3} >
        <Grid.Container alignItems="flex-start" >

          <Grid xs={12} lg={12} >
            <Input
              contentLeft={
                <Icon
                  as={Search}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                />
              }
              contentLeftStyling={false}
              css={{
                w: "100%",
                "@xsMax": {
                  mw: "300px",
                },
                "& .nextui-input-content--left": {
                  h: "100%",
                  ml: "$4",
                  dflex: "center",
                },
              }}
              type="url"
              placeholder="Search..."
              // variant="bordered"
              // isInvalid={isInvalid}
              // color={isInvalid ? "danger" : "success"}
              // errorMessage="Please enter a valid email"
              onChange={handleChange}
              status={helper.color}
              color={helper.color}
              helperColor={helper.color}
            // helperText={helper.text}
            // className="max-w-xs"
            />
            {/* <p className="text-default-500 text-small">Input value: {value}</p> */}
          </Grid>
          <Grid xs={12} lg={12} ><Profile /></Grid>
          {/* <Grid xs={6} lg={12} ><QuickEntry /></Grid> */}
        </Grid.Container>
      </Grid>
     {showWebsiteDashboard && 
      <><Grid xs={6} sm={6} md={3} lg={3}>
        <DataCard
            title="PERFORMANCE"
            subText="vs last day"
            trendText="+4"
            content={performaceData} />
         
        </Grid><Grid xs={6} sm={6} md={3} lg={3}>
            <DataCard
              status="error"
              title="ACCESSIBILITY"
              subText="vs last day"
              trendText="-1,012"
              content={accessibilityData} />
          </Grid><Grid xs={6} sm={6} md={3} lg={3}>
            <DataCard
              title="SEO"
              subText="vs last day"
              trendText="+4%"
              content={seoData} />
          </Grid><Grid xs={6} sm={6} md={3} lg={3}>
            <DataCard
              title="SECURITY"
              subText="vs last day"
              trendText="+300"
              content={securityData} />
          </Grid>
          <Grid xs={4} lg={6}>
            <CardTransactions customerData={customerData}/>
          </Grid>
          <Grid xs={6} lg={6}>
            <PieCharts content={pieData} key={undefined} />
          </Grid>
          
          <Grid xs={6} lg={6}>
            <FillLineCharts content={monthlyData} />
          </Grid><Grid xs={4} lg={6}>
            <DataTableCard customerData={customerData} competitorData={competitorData}/>
          </Grid>
          {/* <Grid xs={4} lg={4}>
            <CardTransactions customerData={customerData}/>
          </Grid> */}
          <Grid xs={12} lg={12}>
            <LineCharts />
          </Grid>
          {/* <Grid xs={12} lg={8}>
            <CardTransactions />
          </Grid> */}
          {/* CardTransactions */}
      {/* <Grid xs={6} lg={3} >
        <PolarAreaCharts />
      </Grid> */}
      {/* <Grid xs={6} lg={3}>
        <FillLineCharts />
      </Grid> */}

      {/* <Grid xs={6} lg={3}>
        <RadarCharts />
      </Grid>
      <Grid xs={12} sm={12} md={6} lg={6}>
        <VerticalBarCharts />
      </Grid>*/}
      {/* <Grid xs={12} sm={12} md={6} lg={6}>
        <GroupLineCharts />
      </Grid> */}
      </>
    }
    </Grid.Container>
  );
};
