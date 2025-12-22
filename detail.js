
let blogData = null;
let currentPostId = null;


async function loadBlogData() {
    try {
        const response = await fetch('data_blog.json');
        blogData = await response.json();
        return blogData;
    } catch (error) {
        console.error('Error loading blog data:', error);
        return null;
    }
}


function getPostIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id')) || 1;
}


function displayPost(post) {
    const postDetail = document.getElementById('postDetail');
    
    postDetail.innerHTML = `
        <div class="post-header">
            <h1 class="post-title">${post.title}</h1>
            <p class="post-date">${post.date}</p>
        </div>
        <div class="post-image">
            <img src="${post.image}" alt="${post.title}" width="100%">
        </div>
        <div class="post-content">
            <p class="post-description">${post.description}</p>
            <div class="post-full-content">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem ipsum, ullamcorper nec sodales imperdiet, vestibulum et nulla. Nulla facilisi. Etiam id aliquam arcu. Etiam mollis elit at sem ullamcorper aliquet. Donec a orci blandit, lacinia quam vitae, tincidunt arcu. Fusce elementum turpis ut elit volutpat pretium. Vestibulum at dignissim mi, et dictum erat.</p>
                
                <p>Mauris neque quam, fermentum ut nisl vitae, convallis maximus nisl. Sed mattis nunc id lorem euismod placerat. Vivamus porttitor magna enim, ac accumsan tortor cursus at. Phasellus sed ultricies mi non congue ullam corper. Praesent tincidunt sed tellus ut rutrum. Sed vitae justo condimentum, porta lectus vitae, ultricies congue gravida diam non fringilla.</p>
                
                <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris viverra veniam sit amet lacus cursus blandit. Proin dignissim condimentum enim, ut finibus ante tempor eu. Aenean at mi ac arcu cursus tempor. Morbi rutrum congue lorem, eu cursus ipsum sollicitudin vel. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
                
                <p>Aliquam erat volutpat. Nullam imperdiet, nunc quis venenatis dignissim, lorem magna tempor elit, in tempus nulla nunc vitae nunc. Cras euismod, nunc eu cursus blandit, nunc nunc ultricies nunc, eu cursus nunc nunc eu nunc. Sed vitae nunc nunc, eu cursus nunc nunc eu nunc.</p>
            </div>
        </div>
    `;
}

function displayRecentPosts(posts, currentId) {
    const recentPostsContainer = document.getElementById('recentPosts');
    const recentPosts = posts.filter(post => post.id !== currentId).slice(0, 3);
    
    recentPostsContainer.innerHTML = recentPosts.map(post => `
        <div class="Recent-post-item">
            <p class="recent-posts-heading">
                <a href="detail.html?id=${post.id}" class="recent-post-link">${post.title}</a>
            </p>
            <p class="recent-post-desc">${post.description.substring(0, 80)}...</p>
            <p class="recent-post-date">${post.date}</p>
        </div>
        <hr>
    `).join('');
}

function setupNavigation(posts, currentId) {
    const prevButton = document.getElementById('prevPost');
    const nextButton = document.getElementById('nextPost');
    
    const currentIndex = posts.findIndex(post => post.id === currentId);
    const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
    const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
    
    if (prevPost) {
        prevButton.onclick = () => window.location.href = `detail.html?id=${prevPost.id}`;
        prevButton.style.display = 'inline-block';
    } else {
        prevButton.style.display = 'none';
    }
    
    if (nextPost) {
        nextButton.onclick = () => window.location.href = `detail.html?id=${nextPost.id}`;
        nextButton.style.display = 'inline-block';
    } else {
        nextButton.style.display = 'none';
    }
}

function goBack() {
    window.location.href = 'index.html';
}


async function initDetailPage() {
    currentPostId = getPostIdFromURL();
    blogData = await loadBlogData();
    
    if (!blogData) {
        document.getElementById('postDetail').innerHTML = '<p class="error">Error loading blog data.</p>';
        return;
    }
    
    const currentPost = blogData.posts.find(post => post.id === currentPostId);
    
    if (!currentPost) {
        document.getElementById('postDetail').innerHTML = '<p class="error">Post not found.</p>';
        return;
    }
    
    displayPost(currentPost);
    displayRecentPosts(blogData.posts, currentPostId);
    setupNavigation(blogData.posts, currentPostId);
    
    document.title = `${currentPost.title} - MY BLOG`;
}


document.addEventListener('DOMContentLoaded', initDetailPage);