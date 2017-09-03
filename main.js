let posts = [], comments = [], postsCounter = 0, commentsCounter = 0;


var newPost = function (type) {
    let jqSelector;

    if (type === 'post') {
        jqSelector = '#post-name';
        if ($(jqSelector).val()) {
            let obj = {
                text: $(jqSelector).val(),
                id: postsCounter
            };
            postsCounter++;
            posts.push(obj);
            comments.push([]);
        } else {
            alert("No post input");
        }

    } else if (type === 'comment') {
        jqSelector = '.comment';
        if ($(jqSelector).val()) {
            let obj = {
                text: $(jqSelector).val(),
                id: commentsCounter
            };
            commentsCounter++;
            return obj;
        } else {
            alert('No comment input')
        }
    }

    // console.log(obj.text);
    // console.log(obj.id);
}

var addPosts = function () {
    let postsEl = $('.posts');
    postsEl.empty();
    for (let i = 0, l = posts.length; i < l; i++) {
        postsEl.append('<div class="post" data-id=' + posts[i].id + '> <p>' + posts[i].text + '</p>' +
            '<button type="button" class="remove">REMOVE</button>' + '<div class="comdiv"></div> <input type="text" class="comment form-control" placeholder="Post your comment here">' + '<button type="button" class="comment-btn">Comment</button></div>');
        // postsEl.attr('data-id', posts[i].id);
    }

    //////////////
    // postsDiv.append('<p class="post" data-id=' +posts[i].id + '>' + posts[i].text + '</p> <button type="button" class="remove">REMOVE</button>' + '<input type="text" id="comment" class="form-control" placeholder="Post your comment here">' + '<button type="button" class="remove">Comment</button>');
    //////////////

    // console.log($('.post').data().id);

    $('.remove').on('click', function () {
        let idToRemove = $('.post').data().id;
        for (let i = 0, l = posts.length; i < l; i++) {
            if (posts[i].id === idToRemove) {
                posts.splice(i, 1);
                break;
            }
        }
        $(this).closest('.post').remove();
        // console.log(idToRemove);
    });

    $('.comment-btn').on('click', function () {
        let currentDiv = $(this).closest('div');
        let currentDivId = currentDiv.data().id;
        console.log(currentDivId);
        //commentsCounter = 0;
        comments[currentDivId].push(newPost('comment'));
        for (let i = 0, l = comments[currentDivId]; i < l; i++) {
            $(this).prev('.comdiv').append(comments[currentDivId][i]);
        }
    })



}

$('.add-post').on('click', function () {
    newPost('post');
    addPosts();
})