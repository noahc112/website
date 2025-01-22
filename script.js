document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const blogPosts = document.querySelectorAll('.blog-post');
    const blogPostsContainer = document.querySelector('.blog-posts-container');
    const sortToggleBtn = document.getElementById('sortToggleBtn'); // Single toggle button for sorting

    // Set the "All" button as active on page load
    const allButton = document.querySelector('.filter-btn[data-filter="all"]');
    allButton.classList.add('active');


    // Register click event on each blog post to navigate to the post detail page
    blogPosts.forEach(post => {
        post.addEventListener('click', function() {
            const link = post.getAttribute('data-link');
            if (link) {
                window.location.href = link; // Ensure this points to an existing file
            }
        });
    });

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const category = this.getAttribute('data-filter');

            blogPosts.forEach(post => {
                post.style.display = (category === 'all' || post.getAttribute('data-category') === category) ? 'block' : 'none';
            });

            sortPosts(sortToggleBtn.getAttribute('data-sort')); // Sort with the current order after filtering
        });
    });

    // Sort toggle functionality
    sortToggleBtn.addEventListener('click', function () {
        // Toggle between "newest" and "oldest"
        const currentSort = sortToggleBtn.getAttribute('data-sort');
        const newSort = currentSort === 'newest' ? 'oldest' : 'newest';
        
        sortToggleBtn.setAttribute('data-sort', newSort);
        sortToggleBtn.textContent = `${newSort.charAt(0).toUpperCase() + newSort.slice(1)}`;

        sortPosts(newSort);
    });

    // Function to sort posts and add dividers
    function sortPosts(sortOrder) {
        const visiblePosts = Array.from(blogPosts).filter(post => post.style.display !== 'none');

        // Sort the posts based on date
        visiblePosts.sort((a, b) => {
            const dateA = new Date(a.getAttribute('data-date'));
            const dateB = new Date(b.getAttribute('data-date'));
            return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
        });

        // Clear the posts container (removes existing posts and any <hr> lines)
        const postsContainer = blogPostsContainer.querySelector('.posts'); // Assuming you wrap posts in a <div class="posts">
        if (postsContainer) {
            postsContainer.innerHTML = ''; // Clear posts only
        }

        // Append sorted posts back to the container with dividers
        visiblePosts.forEach((post, index) => {
            postsContainer.appendChild(post);

        });
    }

    // Initial sort to newest on page load
    sortPosts('newest');

    });

});
