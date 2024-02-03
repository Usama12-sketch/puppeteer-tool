
const puppeteer = require("puppeteer-extra");
const fs = require('fs');
const xlsx = require('xlsx');

const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())



// Load the Excel file
const workbook = xlsx.readFile('usama hunting.xlsx');

// Get the sheet name
const sheetName = workbook.SheetNames[0]; // Assuming you have only one sheet

// Get the worksheet
const worksheet = workbook.Sheets[sheetName];

// Define the range for columns G and I starting from row 2
const range = xlsx.utils.decode_range(worksheet['!ref']);
range.s.r = 1; // Start from row 2

// Extract the non-null values from columns G and I
const columnGData = [];
const columnKData = [];

for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
  const cellAddressG = xlsx.utils.encode_cell({ r: rowNum, c: 6 }); // 6 corresponds to column G
  const cellValueG = worksheet[cellAddressG] ? worksheet[cellAddressG].v : null;

  const cellAddressI = xlsx.utils.encode_cell({ r: rowNum, c: 10 }); // 8 corresponds to column I
  const cellValueI = worksheet[cellAddressI] ? worksheet[cellAddressI].v : null;

  if (cellValueG !== null && cellValueG !== undefined) {
    columnGData.push(cellValueG);
  }

  if (cellValueI !== null && cellValueI !== undefined) {
    columnKData.push(cellValueI);
  }
}

console.log('Column G Data:', columnGData);
console.log('Column I Data:', columnKData);

async function run() {
  try {
    console.log("lenth of urls :" + columnGData.length)
    const data = [
      // ... Add your extracted data here
    ];
    let dataObject
    
    let urlCount = 0
    for (const url of columnGData) {
      urlCount++;
      const browser = await puppeteer.launch({
        headless: "new",
        
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
      
      await page.waitForSelector(".css-111drvy"  , {timeout: 24000})
      
      
      const Element = await page.$(".css-1nvyvo0");
      const chance2 = await page.$(".css-1yl6fbm");
      const SecElement = await page.$(".css-dpcpx8");
      
      const title  = await page.title()
      
      if (Element) {
          await page.screenshot({path: `Saboot/ss${url.length * Math.random()}.png`})
          const ariaLabel = await Element.evaluate(el => el.textContent);
    
          
            dataObject = { text: title, price: ariaLabel, url: url }
            console.log(`URL: ${title}  element: ${ariaLabel}`);
          }   
          else if (chance2) {
            await page.screenshot({path: `Saboot/ss${url.length * Math.random()}.png`})
            const ariaLabel = await chance2.evaluate(el => el.textContent);
            
            
            const title  = await page.title()
            dataObject = { text: title, price: ariaLabel, url: url }
            
            console.log(`URL: ${title}  chance2: ${ariaLabel}`);
          }   
          
           if(SecElement){
            const Value1 = await page.$(".css-1qfcjyj");
          
          const Value2 = await page.$('body');
          
          await page.screenshot({path: `Saboot/ss${url.length * Math.random()}.png`})
          const firstText = await Value1.evaluate(el => el.textContent);
          const title  = await page.title()
          if(Value2){

            // document.body.innerHTML.substring(document.body.innerHTML.indexOf("price-part") +25 ,document.body.innerHTML.indexOf("price-part") + 40)           
            const SecText = await Value2.evaluate(async(el) => {
                  const firstIndex = await  el.innerHTML.indexOf("price-part") + 25
                 const lastIndex = await  el.innerHTML.indexOf('"', firstIndex)
              el.innerHTML.substring( firstIndex , firstIndex + 31)
             
            }
            
            );
            // const convertedNumber = parseInt(SecText, 10); // Using parseInt with base 10

            
            dataObject = { text: title, price: SecText , url: url  }
            // console.log(`URL: ${title}  SubString: ${SecText} innerHTML: ${SecText}` );
            console.log(SecText + "han bhai");
          }  else {
            
            console.log(`URL: ${title}  seprated: ${firstText}.Error`);
            
            dataObject = { text: title, price: firstText + ".Error" , url: url  }
            
          }
          
          
          
        }
        
        else {
          
          // await page.goto(url);
          
          await page.screenshot({path: `Saboot/ss${url.length * Math.random()}.png`})
          
          dataObject = { text: title, price: ".Error", url: url }
          console.log(`URL: ${title}, Element with class 'css-111drvy' not found`);
        }
        // await page.close();
        data.push(dataObject)
        new Promise(resolve => {
          setTimeout(resolve, 10000); // 3000 milliseconds (3 seconds)
        });
        await page.waitForTimeout(10000)
        await page.close();
        await browser.close();

       
        if (urlCount % 1 === 0) {
          console.log(`Waiting for 30 sec after processing ${urlCount} URLs...`);
          await new Promise(resolve => setTimeout(resolve, 0.5 * 60 * 1000)); // Delay for 0.5 minutes
        }
        if (urlCount % 3 === 0) {
          console.log(`Waiting for 2 minutes after processing ${urlCount} URLs...`);
          await new Promise(resolve => setTimeout(resolve, 2 * 60 * 1000)); // Delay for 2 minutes
        }
            
        data.forEach((item , index) => {
          item['Catch-price'] = columnKData[index];
        });
        // Create a workbook and add a worksheet
        const workbook = xlsx.utils.book_new();
        const worksheet = xlsx.utils.json_to_sheet(data);
      
        // Add headers to the worksheet
        xlsx.utils.sheet_add_aoa(worksheet, [['Text', 'Price' , 'Catch-URl' , 'Catch-old-price']], { origin: 'A1' });
      
        // Append the data to the worksheet
        xlsx.utils.sheet_add_json(worksheet, data, { skipHeader: true, origin: 'A2' });
      
        // Add the worksheet to the workbook
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      
        // Write the workbook to a file
        const excelFilename = 'output.xlsx';
        xlsx.writeFile(workbook, excelFilename);
      
        console.log(`Data exported to ${excelFilename}`);
        console.log(`Data exported in json to ${data}`);
      


    }

  } catch (err) {
    console.error("Error:", err.message);
    console.error(err.stack);
  }
}

run();

