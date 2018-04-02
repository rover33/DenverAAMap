const request = require('request');
const cheerio = require('cheerio');





//   'http://www.daccaa.org/query.asp',{
//     options:{
//         headers:{'Content-Type':'application/x-www-form-urlencoded'},
//         form:{
//             'cboDay':'0', 'cboStartTime':'All','cboEndTime':'All','cboMeetingType':'All','cboMeetingFormat':'All','cboSpecialMeeting':'All','cboDistrict':'All','cmdFindMeetings':'Find+Meetings'}
//         }
// {body:{'cboDay':'0', 'cboStartTime':'All','cboEndTime':'All','cboMeetingType':'All','cboMeetingFormat':'All','cboSpecialMeeting':'All','cboDistrict':'All','cmdFindMeetings':'Find Meetings'}
let getMeetings = (req, res)=>{
    console.log('Are we Crazy?');
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
    console.log('It should get here though?');
    request.post(settings,(err,response,body)=>{
            if(err){
                console.log('Error grabbing Meeting Data:',err);
                res.send('HI!');
            }else{
                console.log('WTF IS HAPPENING?!!')
                console.log(' ');
                console.log(' ');
                console.log(' ');
                console.log(' ');
                console.log(' ');
                console.log(' ');
                console.log(' ');
                console.log(' ');
                console.log('SUCCESS!?:',response);
                res.send(body);
            }
        });

}


module.exports.getMeetings = getMeetings;