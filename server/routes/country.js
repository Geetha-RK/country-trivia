import express from "express";
import fs from 'fs';
const router = express.Router();

let highScores = [];

// Re-usable function to read our data file
const getCountryDetails = () => {
    const data = JSON.parse(fs.readFileSync("./data/country.json"));
    // console.log(data);
    return (data);
}

router.get("/",(req,res)=>{
    const data = getCountryDetails();
    res.json(data);
})

router.get("/random-flags",(req,res)=>{
    const countryData = getCountryDetails();
    // const count = parseInt(req.query.count) || 5;
    const count = 5;
    const shuffled = countryData.sort(() => 0.5 - Math.random());
    const selectedFlags = shuffled.slice(0, count);
    res.json(selectedFlags);
});

router.get("/:country",(req,res)=>{
    const countryData = getCountryDetails();
    const findCountry = countryData.find(country => country.country === req.params.country);
    if(findCountry){
        res.json(findCountry);
    }else {
        res.status(404).json({message:"Country Not found"});
    }

});



export default router;