
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
const urls = [   

  "https://www.catch.com.au/product/natures-miracle-hypoallergenic-odour-control-dog-shampoo-473ml-7286861/?sid=Natures%20Miracle%20Unscented%20Hypoallergenic%20Shampoo%20and%20Conditioner%20for%20Dog%2C%20Itch%20Relief%2C%20Sensitive%20Skin%20Care%2C%20Wet%20Dog%20Smell%20Removal%2C%20473%20ml%20(15.9%20fl%20oz)&st=32&srtrev=sj-n6h0vm24s71tz9vfnmt5lo.click&pid=7286861&sp=1&oid=38995018",
  "https://www.catch.com.au/event/dog-grooming-163963/product/dermcare-malaseb-medicated-pet-shampoo-250ml-5521627/?e=pets&st=1&sid=163963&sp=4&asp=&aqi=",
  "https://www.catch.com.au/product/f10-germicidal-dogs-cats-treatment-shampoo-250ml-11976426/?pid=11976426&sid=Product%20page%20Recommendation&st=51&sp=3&oid=90531303",
  "https://www.catch.com.au/product/arm-hammer-fresh-breath-dental-spray-for-dogs-mint-118ml-23593081/?sid=Pets%20%3E%20Pet%20Medicine%20%3E%20Pet%20Medicine&st=15&srtrev=sj-oypzd0hmggegj6ibkpkimj.click&pid=23593081&sp=11&oid=81445311",
  "https://www.catch.com.au/product/kiwi-kitchens-raw-freeze-dried-cat-treats-salmon-recipe-30g-25308308/?sid=Kiwi%20Kitchens%20Raw%20Freeze%20Dried%20Cat%20Treats%20Tuna%20Recipe%2030g&st=32&srtrev=sj-j5nztvbthwy0bjea4vf5q8.click&pid=25308308&sp=2&oid=90790459",
  "https://www.catch.com.au/product/ostevit-d-one-a-day-vitamin-d3-250-tabs-26174042/?sid=Grocery%20%26%20Liquor%20%3E%20Health%20%26%20Wellbeing%20%3E%20Vitamins&st=15&srtrev=sj-32jmfaklbejowe1epxavf2.click&pid=26174042&sp=26&oid=97836753",
  "https://www.catch.com.au/product/beepower-manuka-honey-500-mgo-lozenges-lemon-40pk-6119470/?sid=Bee%20Power%20Manuka%20Honey%20Lemon%20Lozenges%20190%20g&st=32&srtrev=sj-dz00y66djmu4900pcp04ht.click&pid=6119470&sp=1&oid=30391320",
  "https://www.catch.com.au/product/natures-way-restore-probiotic-daily-health-28-caps-7728490/?sid=Grocery%20%26%20Liquor%20%3E%20Health%20%26%20Wellbeing%20%3E%20Vitamins&st=15&srtrev=sj-6ak5i7pvzaylbfqzjqwaud.click&pid=7728490&sp=15&oid=39164780",
  "https://www.catch.com.au/product/morlife-organic-barley-grass-powder-700g-350-serves-417089/?sid=Grocery%20%26%20Liquor%20%3E%20Health%20%26%20Wellbeing%20%3E%20Diet%20%26%20Slimming&st=15&srtrev=sj-czn49tg62b20v2utysy9ki.click&pid=417089&sp=4&oid=462533",
  "https://www.catch.com.au/product/10-x-amazonia-raw-protein-bars-triple-choc-brownie-40g-7730920/?sid=Grocery%20%26%20Liquor%20%3E%20Health%20%26%20Wellbeing%20%3E%20Diet%20%26%20Slimming&st=15&srtrev=sj-d789l8mhvrmo6j3ogjafly.click&pid=7730920&sp=14&oid=39174231",
  "https://www.catch.com.au/product/piksters-interdental-brushes-40pk-size-1-6451946/?sid=Beauty%20%3E%20Dental%20%26%20Oral%20Care%20%3E%20Dental%20Floss%20%26%20Picks&st=15&srtrev=sj-c20sj0wcx4c5wub79fwjeg.click&pid=6451946&sp=7&oid=32153160"
 , "https://www.catch.com.au/product/joseph-joseph-4-piece-nested-glass-storage-container-set-1911952/?sid=Home%20%26%20Kitchen%20%3E%20Kitchen%20%3E%20Food%20Storage&st=15&srtrev=sj-pqadxjaq4zlnovpbblxvyi.click&pid=1911952&sp=16&oid=11989745"
,
  "https://www.catch.com.au/product/kitchenaid-soft-touch-can-opener-5027792/?sid=Home%20%26%20Kitchen%20%3E%20Kitchen&st=15&srtrev=sj-h1anpw2bj8z4ficsigz3kl.click&pid=5027792&sp=23&oid=30079340",
  "https://www.catch.com.au/event/dog-grooming-163963/product/dermcare-malaseb-medicated-pet-shampoo-250ml-5521627/?e=pets&st=1&sid=163963&sp=4&asp=&aqi=",
  // Add more URLs as needed
];

async function run() {
  try {
      console.log("lenth of urls :" + urls.length)
    let setPrices = []
    let urlCount = 0
    for (const url of urls) {
      urlCount++;
      const browser = await puppeteer.launch({
        headless: true,
        
      });
      const page = await browser.newPage();
      
      await page.setDefaultNavigationTimeout(100*60 * 1000)
      const randomNumber = Math.floor(Math.random() * 5) + 3;
      await page.waitForTimeout(2500 * randomNumber)
      await page.goto(url);
      // const navigationPromise = await page.waitForNavigation({waitUntil: "domcontentloaded"});
      

      await page.waitForTimeout(2000 * randomNumber)
      await page.evaluate(() => {
        window.scrollTo(0, 600, {behavior: 'smooth'}); // Scroll to an offset of 500 pixels from the top with smooth animation
      });
      
      
      await page.waitForTimeout(2000 * randomNumber)
      await page.evaluate(() => {
        window.scrollTo(600, 700, {behavior: 'smooth'}); // Scroll to an offset of 500 pixels from the top with smooth animation
      });
      
      // await page.waitForSelector(".css-111drvy"  , {timeout: 24000})
      
      
      const Element = await page.$(".css-1nvyvo0");
      const chance2 = await page.$(".css-1yl6fbm");
      const SecElement = await page.$(".css-dpcpx8");
      
      
      if (Element) {
          await page.screenshot({path: `ss${url.length * Math.random()}.png`})
          const ariaLabel = await Element.evaluate(el => el.textContent);
    
          
          const title  = await page.title()
          console.log(`URL: ${title}  element: ${ariaLabel}`);
        }   
      else if (chance2) {
          await page.screenshot({path: `ss${url.length * Math.random()}.png`})
          const ariaLabel = await chance2.evaluate(el => el.textContent);
    

          const title  = await page.title()
          console.log(`URL: ${title}  chance2: ${ariaLabel}`);
        }   
        
        else if(SecElement){
          const Value1 = await page.$(".css-1qfcjyj");
          const Value2 = await page.$(".css-111drvy :nth-child(2)");

//           const innerElement = await page.$('.outer-class > .inner-class'); // Direct child only
// const innerElement = await page.$('.outer-class :nth-child(2)'); // Second child of any type


          await page.screenshot({path: `ss${url.length * Math.random()}.png`})
          const firstText = await Value1.evaluate(el => el.textContent);
          const SecText = await Value2.evaluate(el => el.textContent);
          
  
          const title  = await page.title()
          console.log(`URL: ${title}  seprated: ${firstText}. ${SecText}`);

        }
        
        else {
          
          // await page.goto(url);
      
          await page.screenshot({path: `ss${url.length * Math.random()}.png`})
          
          console.log(`URL: ${title}, Element with class 'css-111drvy' not found`);
        }
        // await page.close();
        
        new Promise(resolve => {
          setTimeout(resolve, 10000); // 3000 milliseconds (3 seconds)
        });
        await page.waitForTimeout(10000)
        await page.close()
        await browser.close();

       
        if (urlCount % 1 === 0) {
          console.log(`Waiting for 2 minutes after processing ${urlCount} URLs...`);
          await new Promise(resolve => setTimeout(resolve, 0.5 * 60 * 1000)); // Delay for 0.5 minutes
        }
        if (urlCount % 3 === 0) {
          console.log(`Waiting for 2 minutes after processing ${urlCount} URLs...`);
          await new Promise(resolve => setTimeout(resolve, 2 * 60 * 1000)); // Delay for 2 minutes
        }
    }

  } catch (err) {
    console.error("Error:", err.message);
    console.error(err.stack);
  }
}

run();

