const request = require('request');
const cheerio = require('cheerio');

let getMeetings = (req, res)=>{
    var settings = {
        url: "http://www.daccaa.org/query.asp",
        form: {
            "cboDay": "0",
            "cboStartTime": "All",
            "cboEndTime": "All",
            "cboMeetingType": "All",
            "cboFormatType": "All",
            "cboSpecialMeeting": "All",
            "cboDistrict": "All",
            "cmdFindMeetings": "Find Meetings"
        }
    }
    request.post(settings,(err,response,body)=>{
            if(err){
                console.log('Error grabbing Meeting Data:',err);
                res.send('HI!');
            }else{
                let $ = cheerio.load(body);
                let stringArr=[];
                $('font').each((index,element)=>{
                    if(element.children && element.children[0] && element.children[0].data){
                        stringArr.push(element.children[0].data.trim());
                    }
                });
                let meetingArray = [];
                for(let i = 0; i<stringArr.length; ++i){
                    if(["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].indexOf(stringArr[i])>=0){
                        meetingArray.push({day:stringArr[i],time:stringArr[i+1],groupName:stringArr[i+2],address:stringArr[i+3],city:stringArr[i+4],codes:stringArr[i+6]});
                        i=i+6;
                    }
                }
                console.log(...meetingArray);
                res.send(body);
            }
        });

}


module.exports.getMeetings = getMeetings;