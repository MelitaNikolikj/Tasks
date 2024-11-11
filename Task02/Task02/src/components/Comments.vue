<template>
  <div class="comments">
    <h1>Comments</h1>
    <div v-if="comments.length">
      <div v-for="comment in comments" :key="comment.id" class="comment">
        <div class="comment-header">
          <span class="comment-author">
            <i class="fas fa-user"></i> {{ comment.by || 'Unknown Author' }}
          </span>
          <span class="comment-time">
            <i class="fas fa-clock"></i> {{ comment.time ? new Date(comment.time * 1000).toLocaleString() : 'Unknown Time' }}
          </span>
        </div>
        <p v-html="comment.text"></p>
      </div>
    </div>
    <div v-else>
      <p>No comments available.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      comments: []
    };
  },
  mounted() {
    const postId = this.$route.params.id;
    axios.get(`https://hacker-news.firebaseio.com/v0/item/${postId}.json`)
      .then(response => {
        if (response.data.kids) {
          return Promise.all(response.data.kids.map(commentId => 
            axios.get(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json`)
          ));
        }
      })
      .then(comments => {
        this.comments = comments.map(comment => comment.data);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  }
};
</script>

<style>
.comments {
  padding: 20px;
  max-width: 800px;
  margin: auto;
  text-align: left;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.comments h1 {
  font-size: 2em;
  margin-bottom: 20px;
}

.comment {
  margin-bottom: 20px;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.9em;
  color: #666;
  margin-bottom: 10px;
}

.comment-author, .comment-time {
  display: flex;
  align-items: center;
}

.comment-author i, .comment-time i {
  margin-right: 5px;
}

.comment p {
  font-size: 1em;
  line-height: 1.5;
}
</style>
