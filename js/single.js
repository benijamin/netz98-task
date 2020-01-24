$(document).ready(function() {

    $("#headerTitle").hide(300).show(1500);
    // Calling showNewsFeed() function
    showNewsFeed();

    // In case of fetch data from the file, we can call fetchData() function instead of showFoodMenu()
    // fetchData();

    // This function calls showNewsFeed() 3s to get new changes made on .xml
    function fetchData() {
        setTimeout(function() {
        showNewsFeed();
        // recursive call
        fetchData();
        }, 3000);
    }     

    // Read data from .xml using jQuery / Ajax
    function showNewsFeed() {

        $.ajax({
            type: "GET",
            url: "./xml/dev98.xml",
            //url: "php/dev98.php",
            dataType: "xml",

            error: function(e) {
                alert("An error occurred while processing XML file!");
                console.log("XML reading failed: ", e);
            },

            success: function(response) {

                // Main informations (logo, title, link)
                $(response).find("image").each(function() {

                    var imgUrl = $(this).find("url").text();
                    var img = "<img src = " + imgUrl + ">";
                    var mainTitle = $(this).find("title").text();
                    var mainLink = $(this).find("link").text();

                    // Add main informations to the html
                    $(".img").html(img);
                    $(".title").append(mainTitle);
                    $(".link").append(mainLink);

                });

                // Developer blog posts
                $(response).find("item").each(function() {

                    var postTitle = $(this).find("title").text();
                    var postComments = $(this).find("comments").text();
                    var postPubDate = $(this).find("pubDate").text();
                    var postDT = postPubDate;
                    var postDate = postDT.substring(0, postDT.length-15);
                    var postTime = postDT.substring(postDate.length+1, postDT.length-5);                    
                    var postCreator = $(this).find("dc\\:creator").text();
                    var postContent = $(this).find("content\\:encoded").text();
                    var postId = $(this).find("post-id").text();

                    // Add post informations to the html
                    $(".post-info").append('<h2 id="' + postId + '" class="title-single">' + postTitle + '</h2>');
                    $(".post-info").append('<p class="date-time-author"><i class="far fa-calendar-alt" style="font-size:18px"></i>&nbsp; ' + postDate + '&nbsp;&nbsp; <i class="far fa-clock" style="font-size:18px"></i>&nbsp;' + postTime + '&nbsp;&nbsp; <i class="far fa-user" style="font-size:18px"></i>&nbsp; ' + postCreator + '&nbsp;&nbsp; <i class="far fa-comment" style="font-size:18px"></i>&nbsp; <a href="' + postComments + '">Comments</a>&nbsp; <i class="fa fa-hashtag" style="font-size:18px"></i>&nbsp;' + postId + '</p>');
                    $(".post-info").append(postContent);
                    
                });
            }
        });
    }
});