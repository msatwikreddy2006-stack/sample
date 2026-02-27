const express=require("express");
const cors=require("cors");

const app=express();
app.use(cors());
app.use(express.json());

app.post("/analyze",(req,res)=>{

const {season,color,water,growth,land,lang}=req.body;

if(!season || !color || !water || !growth || !land || land<=0){
return res.json({error:"Please enter all valid inputs"});
}

let score=100;
if(color==="red") score-=15;
if(color==="sandy") score-=20;
if(water==="drain") score-=15;
if(growth==="poor") score-=20;

let crop={en:"",hi:"",te:""};
let revenuePerAcre=0;
let investmentPerAcre=25000;

if(season==="kharif"){
if(score>=85){crop={en:"Rice",hi:"धान",te:"బియ్యం"}; revenuePerAcre=65000;}
else if(score>=65){crop={en:"Cotton",hi:"कपास",te:"పత్తి"}; revenuePerAcre=60000;}
else{crop={en:"Maize",hi:"मक्का",te:"మొక్కజొన్న"}; revenuePerAcre=50000;}
}
else if(season==="rabi"){
if(score>=85){crop={en:"Wheat",hi:"गेहूं",te:"గోధుమ"}; revenuePerAcre=60000;}
else if(score>=65){crop={en:"Chickpea",hi:"चना",te:"సెనగ"}; revenuePerAcre=55000;}
else{crop={en:"Mustard",hi:"सरसों",te:"ఆవాలు"}; revenuePerAcre=50000;}
}
else{
if(score>=75){crop={en:"Watermelon",hi:"तरबूज",te:"పుచ్చకాయ"}; revenuePerAcre=75000;}
else{crop={en:"Sunflower",hi:"सूरजमुखी",te:"సూర్యకాంతి"}; revenuePerAcre=60000;}
}

let totalLand=parseFloat(land);
let totalRevenue=revenuePerAcre*totalLand;
let totalInvestment=investmentPerAcre*totalLand;
let minProfit=totalRevenue-totalInvestment-15000;
let maxProfit=totalRevenue-totalInvestment+15000;

let message={
en:`Soil Score: ${score}/100

Recommended Crop: ${crop.en}

Estimated Investment: ₹${totalInvestment}

Expected Profit Range: ₹${minProfit} - ₹${maxProfit}`,
hi:`मिट्टी स्कोर: ${score}/100

अनुशंसित फसल: ${crop.hi}

अनुमानित निवेश: ₹${totalInvestment}

अपेक्षित लाभ सीमा: ₹${minProfit} - ₹${maxProfit}`,
te:`నేల స్కోర్: ${score}/100

సిఫార్సు పంట: ${crop.te}

అంచనా పెట్టుబడి: ₹${totalInvestment}

అంచనా లాభ పరిధి: ₹${minProfit} - ₹${maxProfit}`
};

res.json({result:message[lang]});
});

app.listen(5000,()=>console.log("Server running on http://localhost:5000"));