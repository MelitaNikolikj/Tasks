<template>
  <div class="post-details">
    <h1>{{ post.title }}</h1>
    <p v-html="post.text"></p>
    <div class="post-info">
      <span class="info-item">
        <i class="fas fa-user"></i> {{ post.by || 'Unknown Author' }}
      </span>
      <span class="info-item">
        <i class="fas fa-clock"></i> {{ post.time ? new Date(post.time * 1000).toLocaleString() : 'Unknown Time' }}
      </span>
      <a :href="post.url" target="_blank">{{ post.url }}</a>
    </div>
    <button @click="viewComments(post.id)" class="comments-button">View Comments</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      post: {}
    };
  },
  methods: {
    viewComments(id) {
      this.$router.push(`/post/${id}/comments`);
    }
  },
  mounted() {
    const postId = this.$route.params.id;
    axios.get(`https://hacker-news.firebaseio.com/v0/item/${postId}.json`)
      .then(response => {
        this.post = response.data;
      })
      .catch(error => {
        console.error('Error fetching post details:', error);
      });
  }
};
</script>

<style>
.post-details {
  padding: 20px;
  max-width: 800px;
  margin: auto;
  text-align: left;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.post-details h1 {
  font-size: 2em;
  margin-bottom: 20px;
}

.post-details p {
  font-size: 1.2em;
  line-height: 1.6;
}

.post-info {
  display: flex;
  font-size: 0.9em;
  color: #666;
  margin-bottom: 0px;
  margin-top:10px;
}

.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.info-item i {
  margin-right: 5px;
}

a {
  color: #242424;
  text-decoration: underline;
}

a:hover {
  text-decoration: underline;
}

.comments-button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
}

.comments-button:hover {
  background-color: #3a9f76;
}
</style>
