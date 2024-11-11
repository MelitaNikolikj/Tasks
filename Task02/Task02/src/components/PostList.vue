<template>
  <div class="post-list">
    <div v-for="post in posts" :key="post.id" class="post">
      <div class="post-left">
        <h2 @click="openLink(post.url)" class="clickable-title">{{ post.title }}</h2>
        <div class="post-info">
          <span class="info-item">
            <i class="fas fa-user"></i> {{ post.by || 'Unknown Author' }}
          </span>
          <span class="info-item">
            <i class="fas fa-clock"></i> {{ post.time ? new Date(post.time * 1000).toLocaleString() : 'Unknown Time' }}
          </span>
        </div>
      </div>
      <div class="post-right">
        <span @click="viewComments(post.id)" class="icon">
          <i class="fas fa-comments"></i>
        </span>
        <span @click="openLink(post.url)" class="icon">
          <i class="fas fa-link"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      posts: []
    };
  },
  methods: {
    openLink(url) {
      window.open(url, '_blank');
    },
    viewComments(id) {
      this.$router.push(`/post/${id}/comments`);
    },
  },
  mounted() {
    axios.get('https://hacker-news.firebaseio.com/v0/topstories.json')
      .then(response => {
        const topStoryIds = response.data.slice(0, 10); 
        return Promise.all(topStoryIds.map(id => 
          axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        ));
      })
      .then(posts => {
        this.posts = posts.map(post => post.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }
};
</script>

<style>
.post-list {
  padding: 20px;
}

.post {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
  margin: 10px 0;
}

.post-left {
  flex-grow: 1;
}

h2.clickable-title {
  font-size: 1.2em;
  margin: 0;
  cursor: pointer;
  color: #757575;
  text-decoration: underline;
}

h2.clickable-title:hover {
  color: #555555;
}

.post-info {
  font-size: 0.9em;
  color: #666;
  gap: 10px; 
}

.info-item {
  display: flex;
  align-items: center;
}

.info-item i {
  margin-right: 5px;
}

.post-right {
  display: flex;
  align-items: center;
}

.icon {
  cursor: pointer;
  margin-left: 10px;
}

.icon i {
  font-size: 1.5em;
  color: #818181;
}

.icon:hover i {
  color: #555555;
}
</style>
