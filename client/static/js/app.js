function getAllEntries() {
    fetch('localhost:3000/posts')
        .then(r => r.json())
        .then(appendEntries)
        .catch(console.warn)
};

function appendEntries(entries) {
    entries.forEach(appendEntry)
}

function appendEntry(entryData) {
    const newDiv = document.createElement('div')
    newDiv.className = 'card'

    const cardBody = document.createElement('div')
    cardBody.className = 'card-body'

    const title = document.createElement('h5')
    title.className = 'card-title'
    title.textContent = entryData.title

    const authorName = document.createElement('h6')
    authorName.className = "card-subtitle mb-2 text-muted"
    authorName.textContent = entryData.author

    const story = document.createElement('p')
    story.className = 'card-text'
    story.textContent = entryData.story
}

function submitEntry(e) {

    e.preventDefault();

    const postTitle = document.getElementById('post-title')
    const postAuthor = document.getElementById('post-author')
    const postStory = document.getElementById('post-story')

    if (!e.target.postTitle.value && !e.target.postAuthor.value && !e.target.postStory.value) {
        postStory.placeholder = "Write something before submitting!"
        postTitle.placeholder = "Enter a title"
        postAuthor.placeholder = "Enter your name"
    }
    else {
        const entryData = {
            title: e.target.postTitle.value,
            author: e.target.postAuthor.value,
            story: e.target.postStory.value
        };

        const options = {
            method: 'POST',
            body: JSON.stringify(entryData),
            headers: {
                "Content-Type": "application/json"
            }
        };

        fetch('localhost:3000/posts', options)
            .then(r => r.json())
            .then(redirect)
            .catch(console.warn)
    }

};
