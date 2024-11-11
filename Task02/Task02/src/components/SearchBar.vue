<template>
    <div class="search-bar">
      <input v-model="query" placeholder="Search for a post" @keyup.enter="search" />
      <div v-if="results.length" class="results">
        <div v-for="result in results" :key="result.objectID" class="result">
          <h2>{{ result.title }}</h2>
          <button @click="viewDetails(result.objectID)">View Details</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        query: '',
        results: []
      };
    },
    methods: {
      search() {
        axios.get(`https://hn.algolia.com/api/v1/search?query=${this.query}`)
          .then(response => {
            this.results = response.data.hits;
          })
          .catch(error => {
            console.error('Error searching posts:', error);
          });
      },
      viewDetails(id) {
        this.$router.push(`/post/${id}`);
      }
    }
  };
  </script>
  
  <style>
  .search-bar {
    width: 100%;
    max-width: 900px;  
    margin: auto;
    padding: 20px;
  }
  
  .search-bar input {
    width: 100%;  
    padding: 15px;  
    font-size: 1.2em;  
    border: 1px solid #bbbbbb;
    border-radius: 24px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .results {
    margin-top: 20px;
  }
  
  .result {
    border: 1px solid #ddd;
    padding: 10px;
    margin: 10px 0;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .result h2 {
    font-size: 1.5em;
    margin-bottom: 10px;
  }
  
  .result button {
    background-color: #ffffff;
    color: rgb(94, 94, 94);
    border: none;
    border-radius: 4px;
    text-decoration: underline;
    cursor: pointer;
  }
  
  </style>
  