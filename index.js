
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



const workbook2 = xlsx.readFile('output.xlsx');
const sheetName2 = workbook2.SheetNames[0]; // Assuming you have only one sheet
const worksheet2 = workbook2.Sheets[sheetName2];

const range2 = xlsx.utils.decode_range(worksheet2['!ref']);
range2.s.r = 1; // Start from row 2
// const data = xlsx.utils.sheet_to_json(worksheet2, { header: 1 , range: 1});
// console.log("main data hoon" , data)

const columnAData = [];
const columnBData = [];
const columnCData = [];
const columnDData = [];

for (let rowNum = range2.s.r; rowNum <= range2.e.r; rowNum++) {
  const cellAddressA = xlsx.utils.encode_cell({ r: rowNum, c: 0 }); // 6  to column G
  const cellValueA = worksheet2[cellAddressA] ? worksheet2[cellAddressA].v : null;
  
 
  const cellAddressB = xlsx.utils.encode_cell({ r: rowNum, c: 1 }); // 6  to column G
  const cellValueB = worksheet2[cellAddressB] ? worksheet2[cellAddressB].v : null;
 
 
  const cellAddressC = xlsx.utils.encode_cell({ r: rowNum, c: 2 }); // 6  to column G
  const cellValueC = worksheet2[cellAddressC] ? worksheet2[cellAddressC].v : null;
  
  const cellAddressD = xlsx.utils.encode_cell({ r: rowNum, c: 3 }); // 6  to column G
  const cellValueD = worksheet2[cellAddressD] ? worksheet2[cellAddressD].v : null;

    columnAData.push(cellValueA);
    columnBData.push(cellValueB);
    columnCData.push(cellValueC);
    columnDData.push(cellValueD);
  

}

// console.log('Column D Data:', columnDData , columnDData.length);

async function run() {
  try {
    console.log("lenth of urls :" + columnGData.length)
    const data = [
      // ... Add your extracted data here
    ];
       

    for (let i = 0; i < columnCData.length; i++) {
      const dataObject = {
        text: columnAData[i],
        price: columnBData[i],
        URL: columnCData[i],
         oldprice: columnDData[i]
      };
      data.push(dataObject);
    }


 console.log("data hon bhai dekh lo" , data)
    let dataObject
    
    let urlCount = 0
    for (i= columnDData.length; i < columnGData.length; i++) {

      let url = columnGData[i]
      console.log("url runnning ... " , url)
      urlCount++;
      const browser = await puppeteer.launch({
        headless: "new",
        
      });
      const page = await browser.newPage();
      
      await page.setDefaultNavigationTimeout(100*60 * 1000)
      const randomNumber = Math.floor(Math.random() * 5) + 3;
      await page.waitForTimeout(2500 * randomNumber)
      if (url.includes("https")) {
        await page.goto(url);
        
      } else {
        
        await page.goto(`https://${url}`);
      }
      // const navigationPromise = await page.waitForNavigation({waitUntil: "domcontentloaded"});
      
      
      await page.waitForTimeout(2000 * randomNumber)
      await page.evaluate(() => {
        window.scrollTo(0, 600, {behavior: 'smooth'}); // Scroll to an offset of 500 pixels from the top with smooth animation
      });
      
      
      await page.waitForTimeout(2000 * randomNumber)
      await page.evaluate(() => {
        window.scrollTo(600, 700, {behavior: 'smooth'}); // Scroll to an offset of 500 pixels from the top with smooth animation
      });
      
      
      
      const Element = await page.$(".css-1nvyvo0");
      const chance2 = await page.$(".css-1yl6fbm");
      
      const title  = await page.title()


      const htmlContent = await page.evaluate(() => document.getElementsByTagName("section")[2].innerHTML);

           if (Element) {
          await page.screenshot({path: `Saboot/ss${url.length * Math.random()}.png`})
          const ariaLabel = await Element.evaluate(el => el.textContent);
    
          
            dataObject = { text: title, price: ariaLabel, URL: url , oldprice: columnKData[i]}
            console.log(`URL: ${title}  element: ${ariaLabel}`);
          }   
          else if (chance2) {
            await page.screenshot({path: `Saboot/ss${url.length * Math.random()}.png`})
            const ariaLabel = await chance2.evaluate(el => el.textContent);
            
            
            const title  = await page.title()
            dataObject = { text: title, price: ariaLabel, URL: url,  oldprice: columnKData[i] }
            
            console.log(`URL: ${title}  chance2: ${ariaLabel}`);
          }   
          
         else if (htmlContent){

        // Apply the code snippet to the HTML content
        const firstIndex = htmlContent.indexOf("$");
        let lastIndex = htmlContent.indexOf('"', firstIndex);
        
        
        if (lastIndex - firstIndex > 7) {
           lastIndex = htmlContent.indexOf('<', firstIndex);
        }
    
        const extractedSubstring = htmlContent.substring(firstIndex, lastIndex);
          dataObject = { text: title, price: extractedSubstring, URL: url,  oldprice: columnKData[i] }
    
          console.log(`title: ${title}  han bhai mn hoon sab ka baap: ${extractedSubstring}`);
      }

         else  if(Value1){
            const Value1 = await page.$(".css-1qfcjyj");
          
          
          await page.screenshot({path: `Saboot/ss${url.length * Math.random()}.png`})
          const firstText = await Value1.evaluate(el => el.textContent);
          const title  = await page.title()
        
            
            console.log(`URL: ${title}  seprated: ${firstText}.Error`);
            
            dataObject = { text: title, price: firstText + ".Error" , URL: url,  oldprice: columnKData[i]  }
            
          }
          
      
        else {
          
          // await page.goto(url);
          
          await page.screenshot({path: `Saboot/ss${url.length * Math.random()}.png`})
          
          dataObject = { text: title, price: ".Error", URL: url ,  oldprice: columnKData[i]}
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
            
        // data.forEach((item , index) => {
        //   item['Catch-price'] = columnKData[index];
        // });

          



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
    run()
  }
}

run();

