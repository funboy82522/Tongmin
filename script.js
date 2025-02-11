import { db, auth } from "./firebase-config.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Add a new post
async function addPost() {
    let postText = document.getElementById("post-text").value;
    if (!postText) return alert("Post cannot be empty!");

    try {
        await addDoc(collection(db, "posts"), {
            text: postText,
            timestamp: Date.now(),
            user: auth.currentUser?.email || "Anonymous"
        });
        alert("Post added!");
        document.getElementById("post-text").value = "";
        loadPosts();
    } catch (error) {
        alert("Error posting: " + error.message);
    }
}

// Load posts
async function loadPosts() {
    let feed = document.getElementById("feed");
    feed.innerHTML = "";

    let querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
        let post = doc.data();
        let postElement = document.createElement("div");
        postElement.innerHTML = `<p><strong>${post.user}:</strong> ${post.text}</p>`;
        feed.appendChild(postElement);
    });
}

// Load posts when page loads
window.onload = loadPosts;
