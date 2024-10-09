import { Grid } from "@nextui-org/react";
import { DataCard } from "@/views/dashboard/data-card";
import { Swipe } from "@/views/dashboard/swiper";
import { FillLineCharts } from "@/views/dashboard/charts/fill-line";
import { DataTableCard } from '@/views/dashboard/data-table'
import { PieCharts } from '@/views/dashboard/charts/pie'
import React, { useEffect, useState } from "react";
import { CardTransactions } from "./card-transactions";
type FormElement = HTMLInputElement | HTMLTextAreaElement;

export const DashboardPage = () => {

  const [value, setValue] = useState<string>('');
  const [data, setData] = useState(null)
  const [performaceData, setPerformanceData] = useState(0);
  const [pAuditResults, setpAuditResults] = useState([]);
  const [accAuditResults, setAccAuditResults] = useState([]);
  const [seoAuditResults, setSeoAuditResults] = useState([]);
  const [bestPracticesAuditResults, setBestPracticesAuditResults] = useState([]);
  const [accessibilityData, setAccessibilityData] = useState(0);
  const [securityData, setSecurityData] = useState(0);
  const [seoData, setSEOData] = useState(0);
  const [pieData, setPieData] = useState(0);
  const [isLoading, setLoading] = useState(true)
  const [showWebsiteDashboard, setShowWebsiteDashboard] = useState(false)
  const [search, setSearch] = useState(false);
  const [monthlyData, setMonthlyData] = useState<any>({});
  const [customerData, setCustomerData] = useState<any>({});
  const [competitorData, setCompetitorData] = useState<any>({});

  // Event handler that matches the expected type

  const handleClickEvent = (data: any) => {
    // click event object, 'Hello from child'
    console.log(data);
    setValue(data);
    setSearch(true);
  }

  const removeHyperlinks = (text:string) => {
    // Regex to find all URLs
    const regex = /(https?:\/\/[^\s]+)/g;
    return text.replace(regex, '');
  };

  const auditResults = (data: any,type:string) => {
    // click event object, 'Hello from child'
   
    const improvements = Object.entries(data).map(([key,value])=>{
       let ckey:any = key;
      return {value}
    })
    console.log(improvements)
    const improvementList = improvements.filter((data:any)=>{
      if(!data.value?.score){
        return data.value;
      }
    }) as []
  console.log(improvementList)
  if(type==='performance'){
    setpAuditResults(improvementList);
  }else if(type == 'accessibility'){
  setAccAuditResults(improvementList);
  }else if(type == 'seo'){
    setSeoAuditResults(improvementList);
  }else if (type == 'best-practices'){
    setBestPracticesAuditResults(improvementList);
  }
}
  const debounce = (callback: { (): void; (): void; }, delay: number | undefined) => {
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
    const finalUrl = 'performance&strategy=desktop&url=';
    const finalAccUrl = 'accessibility&strategy=desktop&url=';
    const finalSeoUrl = 'seo&strategy=desktop&url=';
    const finalSecUrl = 'best-practices&strategy=desktop&url=';
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
        // this.setState({ errorMessage: error.toString() });category=accessibility&category=best-practices&
        console.error('There was an error!', error);
      });
    
    console.log(finalUrl)
   
      fetch('/api/customerData?category='+finalUrl+currentUrl)
      .then((res) => res.json())
      .then((data:any) => {
        // console.log(data);
        setShowWebsiteDashboard(true);
        let pScore = data?.lighthouseResult ? Math.round(data?.lighthouseResult?.categories?.performance?.score * 100):0;
        if(data?.lighthouseResult?.audits)auditResults(data?.lighthouseResult?.audits,'performance');

       
        setPerformanceData(pScore)
        
      }).catch(error => {
        // this.setState({ errorMessage: error.toString() });category=accessibility&category=best-practices&
        console.error('There was an error!', error);
        setPerformanceData(0);
      });
     
      fetch('/api/accessibilityData?category=accessibility&strategy=desktop&url=' + currentUrl)
      .then((res) => res.json())
      .then((data:any) => {
       
        let accScore = data?.lighthouseResult ? Math.round(data?.lighthouseResult?.categories?.accessibility?.score * 100):0;
        
        // auditResults(data?.lighthouseResult?.audits,'accessibility');
        if(data?.lighthouseResult?.audits)auditResults(data?.lighthouseResult?.audits,'accessibility');
        
        setAccessibilityData(accScore)
       
      }).catch(error => {
        // this.setState({ errorMessage: error.toString() });category=accessibility&category=best-practices&
        console.error('There was an error!', error);
        setAccessibilityData(0);
      });
      // fetch('https://www.googleapis.com/pagespeedonline/v5/runPagespeed?category=best-practices&category=seo&strategy=desktop&url=' + currentUrl + '&alt=json')
      // fetch('/api/customerData?domain='+currentUrl)
      fetch('/api/seoData?category='+finalSeoUrl+currentUrl)
      .then((res) => res.json())
      .then((data:any) => {
       
        let seoScore = data?.lighthouseResult ? Math.round(data?.lighthouseResult?.categories?.seo?.score * 100):0;
        if(data?.lighthouseResult?.audits)auditResults(data?.lighthouseResult?.audits,'seo');
        // auditResults(data?.lighthouseResult?.audits,'seo');
        setSEOData(seoScore)
        // setData(data);
        // setLoading(false);
      }).catch(error => {
        // this.setState({ errorMessage: error.toString() });category=accessibility&category=best-practices&
        console.error('There was an error!', error);
        setSEOData(0)
      });
      fetch('/api/secData?category='+finalSecUrl+currentUrl)
      .then((res) => res.json())
      .then((data:any) => {
        // console.log(data);
        // setShowWebsiteDashboard(true);
        // let pScore = Math.round(data?.lighthouseResult?.categories?.performance?.score * 100);
        // let accScore = Math.round(data?.lighthouseResult?.categories?.accessibility?.score * 100);
        let secScore = data?.lighthouseResult ? Math.round(data?.lighthouseResult?.categories["best-practices"]?.score * 100):0;
        if(data?.lighthouseResult?.audits)auditResults(data?.lighthouseResult?.audits,'best-practices');
        
        // let seoScore = Math.round(data?.lighthouseResult?.categories?.seo?.score * 100);
        // auditResults(data?.lighthouseResult?.audits);
        // setPerformanceData(pScore)
        // setAccessibilityData(accScore)
        setSecurityData(secScore)
        // setSEOData(seoScore)
        // setData(data);
        // setLoading(false);
      }).catch(error => {
        // this.setState({ errorMessage: error.toString() });category=accessibility&category=best-practices&
        console.error('There was an error!', error);
        setSecurityData(0)
      });
   

  }, 0);

 

  const validateURl = (value: string) => {
    return value.match(/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/);
  };

  const validUrls = (url: string) => {
   
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

  
    return url;
  }



  useEffect(() => {
    if (search && validateURl(value)) {

      // setShowWebsiteDashboard(true);
      const currentUrl = validUrls(value);
     
      debouncedFunction();
      fetch('/api/competitorData?domain=' + currentUrl)
        .then(res => res.json())
        .then((data: any) => {
          
          setCompetitorData(data);
          
        })
      fetch('https://api.allorigins.win/get?url=http://data.similarweb.com/api/v1/data?domain=' + currentUrl)
        .then((res) => res.json())
        .then((data) => {
          
          setCustomerData(JSON.parse(data.contents));
          setMonthlyData(JSON.parse(data.contents).EstimatedMonthlyVisits);
          // setCountryImage("https://flagsapi.com/"+data.CountryRank.CountryCode+"/shiny/64.png")
        })
  
      setSearch(false);
    } else {
     
    }

   
  }, [search, value])


  return (

    <>
      {!showWebsiteDashboard && <Grid xs={12} lg={12}>
        <Swipe emitClickEvent={handleClickEvent} />
        {/* <VideoPlayer /> */}
      </Grid>}

      {showWebsiteDashboard &&
        <><Grid.Container gap={2} justify="flex-start">
           <Grid xs={12} sm={12} md={12} lg={12}>
           <Swipe emitClickEvent={handleClickEvent} showImage/>
            </Grid>
          <Grid xs={6} sm={6} md={3} lg={3}>
         
          <DataCard
            title="PERFORMANCE"
            subText="Performance could not be measured at the moment"
            trendText="+4"
            content={performaceData}
            auditResult={pAuditResults as []} />

        </Grid><Grid xs={6} sm={6} md={3} lg={3}>
            <DataCard
              status="error"
              title="ACCESSIBILITY"
              subText="Accessibility could not be measured at the moment"
              trendText="-1,012"
              content={accessibilityData}
              auditResult={accAuditResults as []} 
               />
          </Grid><Grid xs={6} sm={6} md={3} lg={3}>
            <DataCard
              title="SEO"
              subText="SEO could not be measured at the moment"
              trendText="+4%"
              content={seoData}
              auditResult={seoAuditResults as []}  />
          </Grid><Grid xs={6} sm={6} md={3} lg={3}>
            <DataCard
              title="SECURITY"
              subText="Security could not be measured at the moment"
              trendText="+300"
              content={securityData} 
              auditResult={bestPracticesAuditResults as []} />
          </Grid>
          <Grid xs={12} lg={6}>
            <CardTransactions customerData={customerData} />
          </Grid>
          <Grid xs={12} lg={6}>
            <PieCharts content={pieData} key={undefined} />
          </Grid>

          <Grid xs={12} lg={6}>
            <FillLineCharts content={monthlyData} />
          </Grid><Grid xs={12} lg={6}>
            <DataTableCard customerData={customerData} competitorData={competitorData} />
          </Grid>
          
        </Grid.Container>
        </>}
    </>
  );
};
