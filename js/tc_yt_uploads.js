var TCActive = true;

var actorName = "";
var actorEmail = "";

var ACT_ID = "act:yt_uploads"
var videoId = "";

conf = ADL.XAPIWrapper.lrs;

// Get context of the video upload activity
function tc_getContext(videoId){
    return {
        "contextActivities":{
            "grouping":{"id":ACT_ID}
        },
        "registration":videoId
    };
}

// Send activity statement containing context
function tc_sendStatementWithContext(stmt){
    stmt["context"] = tc_getContext(videoId);
    ADL.XAPIWrapper.sendStatement(stmt);
}


// Send activity statement for YouTube uploaded video
function tc_sendStatement_YouTubeUpload(videoSnippet){
    var videoTitle = videoSnippet.title;
    var videoId = videoSnippet.resourceId.videoId;
    var videoDate = videoSnippet.publishedAt;

    if (TCActive){
//        videoId = ADL.ruuid();
        var tcVideoObj = {
            'id':ACT_ID,
            "definition":{
                "type":"type:media",
                "name":{"en-US":"YouTube Video Upload"},
                "description":{"en-US": "\"" + videoTitle + "\"" + " uploaded on YouTube."}
            }
        };
        var stmt = {
//            "actor":tc_actor(conf.actor),
            "verb":{"id":"http://adlnet.gov/expapi/verbs/shared",
                "display":{"en-US":"uploaded"}},
            "object":tcVideoObj
        };

        return tcVideoObj;
       // tc_sendStatementWithContext(stmt);
    }
}