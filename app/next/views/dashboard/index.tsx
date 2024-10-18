import { Grid } from "@nextui-org/react";
import { DataCard } from "@/views/dashboard/data-card";
import { Swipe } from "@/views/dashboard/swiper";
import { FillLineCharts } from "@/views/dashboard/charts/fill-line";
import { DataTableCard } from '@/views/dashboard/data-table'
import { PieCharts } from '@/views/dashboard/charts/pie'
import React, { useEffect, useState, useRef } from "react";
import { CardTransactions } from "./card-transactions";
import html2pdf from "html2pdf.js";
type FormElement = HTMLInputElement | HTMLTextAreaElement;

type APiState<T> = {status: 'initial' | 'loading' | 'success' | 'error', data: T}

const apiInitialState = { status: "initial", data: 0, audit: []as [] };
const apiLoadingState = {status: "loading", data: 0, audit: [] as []}
const apiErrorState = {status: "error", data: 0, audit: [] as []}

const initialData = {
  perfomance: apiInitialState,
  accessibility: apiInitialState,
  security: apiInitialState,
  seo: apiInitialState,
};

const loadingState = {
  perfomance: apiLoadingState,
  accessibility: apiLoadingState,
  security: apiLoadingState,
  seo: apiLoadingState,
}

export const DashboardPage = () => {

  const [apiData, setAPIData] = useState(initialData);

  const [value, setValue] = useState<string>('');
  const [data, setData] = useState(null)
  const [pieData, setPieData] = useState(0);
  const [isLoading, setLoading] = useState(true)
  const [showWebsiteDashboard, setShowWebsiteDashboard] = useState(false)
  const [search, setSearch] = useState(false);
  const [monthlyData, setMonthlyData] = useState<any>({});
  const [customerData, setCustomerData] = useState<any>({});
  const [competitorData, setCompetitorData] = useState<any>({});
  const pdfRef = useRef(null);

  // Event handler that matches the expected type

  const handleClickEvent = (data: any) => {
    // click event object, 'Hello from child'
    setShowWebsiteDashboard(true);
    console.log(data);
    setValue(data);
    setSearch(true);
    setAPIData(loadingState);
  }

  const downloadPDF = async () => {
    console.log('Downloading pdf')
    var opt = {
      margin:       0,
      filename:     'myfile.pdf',
      html2canvas:  { scale: 1 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    const html2pdf2 = (await import("html2pdf.js")).default
    if(pdfRef.current) html2pdf2(pdfRef.current, opt);
  }

  const getAuditResult = (data: any) => {
    const audits = data?.lighthouseResult?.audits;
    if (!audits) return [] as [];
    const improvements = Object.entries(audits).map(([key, value]) => {
      let ckey: any = key;
      return { value };
    });
    return improvements.filter((data: any) => {
      if (!data.value?.score) {
        return data.value;
      }
    }) as [];
  };


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
        let pScore = data?.lighthouseResult
          ? Math.round(
              data?.lighthouseResult?.categories?.performance?.score * 100
            )
          : 0;
        const audit = getAuditResult(data);

        setAPIData((state) => ({
          ...state,
          perfomance: { status: "success", data: pScore, audit },
        }));
        
      }).catch(error => {
        // this.setState({ errorMessage: error.toString() });category=accessibility&category=best-practices&
        console.error('There was an error!', error);
        setAPIData(state => ({...state, perfomance: apiErrorState}));
      });
     
      fetch('/api/accessibilityData?category=accessibility&strategy=desktop&url=' + currentUrl)
      .then((res) => res.json())
      .then((data:any) => {
       
        let accScore = data?.lighthouseResult ? Math.round(data?.lighthouseResult?.categories?.accessibility?.score * 100):0;
        
        const audit = getAuditResult(data);

        setAPIData((state) => ({
          ...state,
          accessibility: { status: "success", data: accScore, audit },
        }));
        
       
      }).catch(error => {
        // this.setState({ errorMessage: error.toString() });category=accessibility&category=best-practices&
        console.error('There was an error!', error);
        setAPIData((state) => ({
          ...state,
          accessibility:apiErrorState,
        }));
      });
      // fetch('https://www.googleapis.com/pagespeedonline/v5/runPagespeed?category=best-practices&category=seo&strategy=desktop&url=' + currentUrl + '&alt=json')
      // fetch('/api/customerData?domain='+currentUrl)
      fetch('/api/seoData?category='+finalSeoUrl+currentUrl)
      .then((res) => res.json())
      .then((data:any) => {
       
        let seoScore = data?.lighthouseResult ? Math.round(data?.lighthouseResult?.categories?.seo?.score * 100):0;
      
        const audit = getAuditResult(data);

        setAPIData((state) => ({
          ...state,
          seo: { status: "success", data: seoScore, audit },
        }));
      }).catch(error => {
        console.error('There was an error!', error);
        setAPIData((state) => ({
          ...state,
          seo:apiErrorState,
        }));
      });
      fetch('/api/secData?category='+finalSecUrl+currentUrl)
      .then((res) => res.json())
      .then((data:any) => {
        let secScore = data?.lighthouseResult ? Math.round(data?.lighthouseResult?.categories["best-practices"]?.score * 100):0;
        const audit = getAuditResult(data);
        setAPIData((state) => ({
          ...state,
          security: { status: "success", data: secScore, audit },
        }));
      }).catch(error => {
        // this.setState({ errorMessage: error.toString() });category=accessibility&category=best-practices&
        console.error('There was an error!', error);
        setAPIData((state) => ({
          ...state,
          security:apiErrorState,
        }));
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

    <div ref={pdfRef}>
      {!showWebsiteDashboard && <Grid data-html2canvas-ignore="true" xs={12} lg={12}>
        <Swipe  emitClickEvent={handleClickEvent} downloadPDF={downloadPDF} />
      </Grid>}

      {showWebsiteDashboard &&
        <><Grid.Container gap={2} justify="flex-start">
           <Grid data-html2canvas-ignore="true" xs={12} sm={12} md={12} lg={12}>
           <Swipe  emitClickEvent={handleClickEvent} downloadPDF={downloadPDF} showImage/>
            </Grid>
          <Grid xs={6} sm={6} md={3} lg={3}>
         
          <DataCard
            title="PERFORMANCE"
            subText="Performance could not be measured at the moment"
            content={apiData['perfomance'].data}
            loading={apiData['perfomance'].status == "loading"}
            auditResult={apiData['perfomance'].audit}
            />

        </Grid><Grid xs={6} sm={6} md={3} lg={3}>
            <DataCard
              title="ACCESSIBILITY"
              subText="Accessibility could not be measured at the moment"
              content={apiData['accessibility'].data}
              auditResult={apiData['accessibility'].audit} 
              loading={apiData['accessibility'].status === 'loading'}
               />
          </Grid><Grid xs={6} sm={6} md={3} lg={3}>
            <DataCard
              title="SEO"
              subText="SEO could not be measured at the moment"
              content={apiData["seo"].data}
              auditResult={apiData["seo"].audit}
              loading={apiData["seo"].status === 'loading'}
              />
          </Grid><Grid xs={6} sm={6} md={3} lg={3}>
            <DataCard
              title="SECURITY"
              subText="Security could not be measured at the moment"
              content={apiData["security"].data} 
              auditResult={apiData["security"].audit}
              loading={apiData["security"].status === 'loading'}
              />
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
    </div>
  );
};
