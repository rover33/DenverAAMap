const request = require('request');
const cheerio = require('cheerio');
let db = require('../models/index');

let getMeetings = (req, res)=>{
    db.query('SELECT * FROM meeting WHERE day = "Sunday" AND time > "18:00:00"',(err,results)=>{
        if(err){
            console.log('there has been an error getting meetings:',err);
        }else{
            console.log('success!',results);
            res.json(results);
        }
    })
}


let updateMeetings = (req, res)=>{
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
                //could dry this out later.
                for(let i = 0; i<stringArr.length; ++i){
                    if(["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].indexOf(stringArr[i])>=0){
                        let timeArray = stringArr[i+1].split(" ");
                        let timeAt0 = timeArray[0];
                        timeArray[0]=timeArray[1]==="PM"&&timeAt0.slice(0,2)!="12"?(Number(timeAt0.slice(0,2))+12)+`:${timeAt0[3]}${timeAt0[4]}`:timeAt0;
                        console.log(timeArray);
                        meetingArray.push({day:stringArr[i],time:timeArray[0],groupName:stringArr[i+2],address:stringArr[i+3],city:stringArr[i+4],codes:stringArr[i+6]});
                        i=i+6;
                    }
                }
                console.log(...meetingArray);
                let mtgQueryStr=`INSERT INTO meeting(day, time, group_name, address, city) VALUES`;
                meetingArray.forEach((meeting)=>{
                    mtgQueryStr+=`("${meeting.day}","${meeting.time}","${meeting.groupName}","${meeting.address}","${meeting.city}"),`
                })
                mtgQueryStr=mtgQueryStr.slice(0,-1);
                db.query(mtgQueryStr,(err,results)=>{
                    if(err){
                        console.log("Error putting results into table",err);
                    }else{
                        console.log('SUCCESS!',results);
                        db.query(`DELETE FROM meeting WHERE id<${results.insertId}`,(err,results)=>{
                            if(err){
                                console.log("error removing duplicates:",err);
                            }else{
                                console.log("successfully deleted old results",results);
                                res.send(body);
                            }
                        })
                    }
                })
            }
        });

}


module.exports.getMeetings = getMeetings;
module.exports.updateMeetings = updateMeetings;