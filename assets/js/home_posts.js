{

    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),   // this converts post form data in JSON
                success: function(data){
                   let newPost = newPostDom(data.data.post);
                   $('#posts-list-container > ul').prepend(newPost);
                   deletePost($(' .delete-post-button', newPost));
                }, error: function(error){
                    console.log(error.responseText);
                }
            })

        });
    }

    // method to create a post in DOM

    let newPostDom = function(post){
        return $(` <li id="post-${post._id}">
        <p>
            <small>
                <a class="delete-post-button" href="/posts/destroy/${ post.id}">Delete</a>
            </small>
            ${ post.content}
            <br>
            <small>
            ${ post.user.name}
            </small>
        </p>
        <div class="post-comments">
            
            <form action="/comments/create" method="POST">
                <input type="text" name="content" placeholder="Add Comment" required>
                <input type="hidden" name="post" value="${ post._id}">
                <input type="submit" value="Add Comment">
            </form>
          
                <div class="post-comments-list">
                    <ul id="post-comment-${ post._id}">
                    </ul>
                </div>
        </div>
    </li>`)
    }


    //method to delete a post from DOM
    let deletePost = function(deleteLink){          // we are passing delete link only for deleting instead of post
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'), // this is how we get the value of href
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        })

    }

    createPost();

}