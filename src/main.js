
let blogData = null;


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


function updateBlogPosts(posts) {
    
    if (posts[0]) {
        const box1 = document.getElementById('box1');
        const img1 = box1.querySelector('img');
        const heading1 = box1.querySelector('.image-card-heading');
        const date1 = box1.querySelector('.date');
        const description1 = box1.querySelector('.description');
        const button1 = box1.querySelector('button');
        
        img1.src = posts[0].image;
        heading1.textContent = posts[0].title;
        date1.textContent = ' ' + posts[0].date;
        description1.textContent = posts[0].description;
        button1.onclick = () => window.location.href = `detail.html?id=${posts[0].id}`;
    }

    if (posts[1]) {
        const box2 = document.getElementById('box2');
        const img2 = box2.querySelector('img');
        const heading2 = box2.querySelector('.image-card-heading');
        const date2 = box2.querySelector('.date');
        const description2 = box2.querySelector('.description');
        const button2 = box2.querySelector('button');
        
        img2.src = posts[1].image;
        heading2.textContent = posts[1].title;
        date2.textContent = ' ' + posts[1].date;
        description2.textContent = posts[1].description;
        button2.onclick = () => window.location.href = `detail.html?id=${posts[1].id}`;
    }
}

function updateRecentPosts(posts) {
    const recentPostsSection = document.getElementById('box4');
    const recentPostItems = recentPostsSection.querySelectorAll('.Recent-post-item');
    
    posts.forEach((post, index) => {
        if (index < recentPostItems.length) {
            const item = recentPostItems[index];
            const heading = item.querySelector('.recent-posts-heading');
            const description = item.querySelector('p:last-child');
            
            heading.innerHTML = `<a href="detail.html?id=${post.id}" class="recent-post-link">${post.title}</a>`;
            description.textContent = post.description.substring(0, 60) + '...';
        }
    });
}


async function initMainPage() {
    blogData = await loadBlogData();
    
    if (blogData && blogData.posts) {
        updateBlogPosts(blogData.posts);
        updateRecentPosts(blogData.posts);
    }
}

document.addEventListener('DOMContentLoaded', initMainPage);