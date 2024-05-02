const postInput = document.getElementById("post-number");
const subButton = document.getElementById("req-sub");
const commentContainer = document.getElementById("content-wrapper");

subButton.addEventListener("click", getPost);

async function getPost() {
    try {
        const postNumber = postInput.value;
        const response = await axios.get(
            `https://jsonplaceholder.typicode.com/posts/${postNumber}`
        );
        const postTitle = document.querySelector("#postTitle");
        const postBody = document.querySelector("#postBody");

        postTitle.textContent = response.data.title;
        postBody.textContent = response.data.body;

        getComments(postNumber);

        return response.data;
    } catch (error) {
        console.error(error);
    }
}
async function getComments(postnum) {
    try {
        const response = await axios.get(
            `https://jsonplaceholder.typicode.com/comments?postId=${postnum}`
        );

        createComments(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

function createComments(comments) {
    let allComment = document.querySelector(".commentSection");

    console.log(allComment);
    for (let comment of comments) {
        let commentEmail = document.createElement("p");

        let commentBody = document.createElement("p");

        let userEmail = comment.email;
        let commentText = comment.body;

        commentEmail.textContent = userEmail;
        commentBody.textContent = commentText;
        allComment.appendChild(commentEmail);
        allComment.appendChild(commentBody);
    }
}
