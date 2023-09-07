
const timeFormatter = (locale,departureTime)=>{
    if(locale==="eng"||locale==="orm"){
        return departureTime;
    }
    else if(locale==="amh"){
        if(departureTime.includes("4")){
            return "ከለሊቱ 10:00"
        }
        else{
            return "ከሰአት 6:00"
        }
    }
    else if(locale=="tgr"){
        if(departureTime.includes("4")){
            return "ሰዓት 10፡00 ለይቲ"
        }
        else{
            return "ሰዓት 6፡00 ድሕሪ ቀትሪ"
        }
    }
    else if(locale=="tgr"){
        if(departureTime.includes("4")){
            return "Halkan sa'aatii 10:00"
        }
        else{
            return "6:00 waaree booda"
        }
    }
}

export default timeFormatter;